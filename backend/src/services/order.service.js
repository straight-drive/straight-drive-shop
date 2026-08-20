import { prisma } from '../config/db.js'
import { ApiError } from '../utils/ApiError.js'
import { createRazorpayOrder, verifyPaymentSignature } from './payment.service.js'
import { findOrCreateContact, createInvoiceForOrder } from './zoho.service.js'
import { sendOrderDispatched, sendOrderDelivered } from './notification.service.js'

function generateOrderNumber() {
  const date = new Date()
  const y = date.getFullYear().toString().slice(-2)
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `SD-${y}${m}${d}-${rand}`
}

export async function createOrderFromCart(userId, { shippingAddress, billingAddress }) {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } },
  })
  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, 'Your cart is empty')
  }

  // Made to order — no stock check, only availability
  for (const item of cart.items) {
    if (!item.product.isActive) {
      throw new ApiError(400, `"${item.product.name}" is no longer available`)
    }
  }

  const subtotal = cart.items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  )

  // GST calculated per product using each product's own rate
  const tax = cart.items.reduce((sum, item) => {
    const lineTotal = Number(item.product.price) * item.quantity
    const rate = item.product.gstRate ?? 0
    return sum + (lineTotal * rate) / 100
  }, 0)

  const total = subtotal + tax

  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId,
        status: 'PENDING',
        subtotal,
        tax,
        total,
        shippingAddress,
        billingAddress: billingAddress ?? shippingAddress,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.product.price,
          })),
        },
      },
      include: { items: { include: { product: true } } },
    })

    return newOrder
  })

  return order
}

export async function listMyOrders(userId) {
  return prisma.order.findMany({
    where: { userId },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getMyOrderById(userId, orderId) {
  const order = await prisma.order.findFirst({
    where: { id: orderId, userId },
    include: { items: { include: { product: true } } },
  })
  if (!order) throw new ApiError(404, 'Order not found')
  return order
}

export async function listAllOrders() {
  return prisma.order.findMany({
    include: {
      items: { include: { product: true, serialNumbers: true } },
      user: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: 'desc' },
  })
}

export async function updateOrderStatus(orderId, status) {
  const order = await prisma.order.findUnique({ where: { id: orderId } })
  if (!order) throw new ApiError(404, 'Order not found')

  // Already in this state — do nothing rather than re-firing notifications.
  if (order.status === status) {
    return order
  }

  const updated = await prisma.order.update({ where: { id: orderId }, data: { status } })

  if (status === 'DELIVERED') {
    try {
      const full = await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: { include: { product: true } }, user: true },
      })
      await sendOrderDelivered(full)
    } catch (mailErr) {
      console.error('Delivered email failed for', order.orderNumber, mailErr)
    }
  }

  return updated
}

export async function initiatePayment(userId, orderId) {
  const order = await prisma.order.findFirst({ where: { id: orderId, userId } })
  if (!order) throw new ApiError(404, 'Order not found')
  if (order.status !== 'PENDING') throw new ApiError(400, 'This order cannot be paid for')

  const razorpayOrder = await createRazorpayOrder({
    amount: Number(order.total),
    receipt: order.orderNumber,
  })

  return {
    razorpayOrderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
  }
}

export async function confirmPayment(userId, { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature }) {
  const order = await prisma.order.findFirst({
    where: { id: orderId, userId },
    include: { items: { include: { product: true } }, user: true },
  })
  if (!order) throw new ApiError(404, 'Order not found')

  const isValid = verifyPaymentSignature({
    orderId: razorpayOrderId,
    paymentId: razorpayPaymentId,
    signature: razorpaySignature,
  })
  if (!isValid) {
    throw new ApiError(400, 'Payment verification failed — this payment could not be confirmed as genuine')
  }

  const updatedOrder = await prisma.$transaction(async (tx) => {
    const confirmedOrder = await tx.order.update({
      where: { id: orderId },
      data: { status: 'PROCESSING' },
    })

    const cart = await tx.cart.findUnique({ where: { userId } })
    if (cart) {
      await tx.cartItem.deleteMany({ where: { cartId: cart.id } })
    }

    return confirmedOrder
  })

  return updatedOrder
}

export async function dispatchOrder(orderId) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: { include: { product: true, serialNumbers: true } },
      user: true,
    },
  })
  if (!order) throw new ApiError(404, 'Order not found')
  if (order.dispatchedAt) throw new ApiError(400, 'This order has already been dispatched')

  // Every unit must have a serial number before dispatch
  for (const item of order.items) {
    if (item.serialNumbers.length !== item.quantity) {
      throw new ApiError(
        400,
        `"${item.product.name}" needs ${item.quantity} serial number(s) — ${item.serialNumbers.length} entered`
      )
    }
  }

  const updated = await prisma.order.update({
    where: { id: orderId },
    data: { status: 'SHIPPED', dispatchedAt: new Date() },
  })

  // Zoho invoice fires here, on dispatch — not at payment time.
  // Kept outside any transaction so a Zoho outage can't roll back the dispatch.
  try {
    const contact = await findOrCreateContact({
      name: order.user.name,
      email: order.user.email,
      phone: order.shippingAddress?.phone,
      billingAddress: order.billingAddress || order.shippingAddress,
      shippingAddress: order.shippingAddress,
      gstin: order.customerGstin,
      companyName: order.customerCompany,
    })
    const invoice = await createInvoiceForOrder({ contactId: contact.contact_id, order })
    await prisma.order.update({
      where: { id: orderId },
      data: { zohoInvoiceId: invoice.invoice_id },
    })
    console.log('Zoho invoice created on dispatch for', order.orderNumber, '- Invoice ID:', invoice.invoice_id)
  } catch (invoiceErr) {
    console.error('Zoho invoice creation failed on dispatch for', order.orderNumber, invoiceErr)
  }

  try {
    await sendOrderDispatched(order)
  } catch (mailErr) {
    console.error('Dispatch email failed for', order.orderNumber, mailErr)
  }

  return updated
}