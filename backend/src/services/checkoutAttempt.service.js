import { prisma } from '../config/db.js'
import { ApiError } from '../utils/ApiError.js'
import { createRazorpayOrder, verifyPaymentSignature, fetchPaymentDetails } from './payment.service.js'
import { sendOrderConfirmed } from './notification.service.js'

function generateOrderNumber() {
  const date = new Date()
  const y = date.getFullYear().toString().slice(-2)
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `SD-${y}${m}${d}-${rand}`
}
export async function createAttempt(userId, { fullName, email, phone, shippingAddress, billingAddress, customerGstin, customerCompany }) {  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } },
  })
  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, 'Your cart is empty')
  }

  for (const item of cart.items) {
    if (!item.product.isActive) {
      throw new ApiError(400, `"${item.product.name}" is no longer available`)
    }
  }

  const subtotal = cart.items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  )
  const tax = cart.items.reduce((sum, item) => {
    const lineTotal = Number(item.product.price) * item.quantity
    const rate = item.product.gstRate ?? 0
    return sum + (lineTotal * rate) / 100
  }, 0)
  const total = subtotal + tax

  const cartSnapshot = cart.items.map((item) => ({
    productId: item.productId,
    name: item.product.name,
    quantity: item.quantity,
    unitPrice: Number(item.product.price),
  }))

  const attempt = await prisma.checkoutAttempt.create({
    data: {
      userId,
      fullName,
      email,
      phone,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      customerGstin,
      customerCompany,
      cartSnapshot,
      subtotal,
      tax,
      total,
      stage: 'DETAILS_FILLED',
    },
  })

  return attempt
}

export async function initiatePayment(userId, attemptId) {
  const attempt = await prisma.checkoutAttempt.findFirst({ where: { id: attemptId, userId } })
  if (!attempt) throw new ApiError(404, 'Checkout attempt not found')
  if (attempt.stage === 'COMPLETED') throw new ApiError(400, 'This checkout is already complete')

  const razorpayOrder = await createRazorpayOrder({
    amount: Number(attempt.total),
    receipt: attempt.id,
  })

  await prisma.checkoutAttempt.update({
    where: { id: attemptId },
    data: { stage: 'PAYMENT_STARTED', razorpayOrderId: razorpayOrder.id },
  })

  return { razorpayOrderId: razorpayOrder.id, amount: razorpayOrder.amount, currency: razorpayOrder.currency }
}

export async function confirmPayment(userId, { attemptId, razorpayOrderId, razorpayPaymentId, razorpaySignature }) {
  const attempt = await prisma.checkoutAttempt.findFirst({ where: { id: attemptId, userId } })
  if (!attempt) throw new ApiError(404, 'Checkout attempt not found')

  const isValid = verifyPaymentSignature({
    orderId: razorpayOrderId,
    paymentId: razorpayPaymentId,
    signature: razorpaySignature,
  })
  if (!isValid) {
    throw new ApiError(400, 'Payment verification failed — this payment could not be confirmed as genuine')
  }

  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId,
        status: 'PROCESSING',
        subtotal: attempt.subtotal,
        tax: attempt.tax,
        total: attempt.total,
        shippingAddress: attempt.shippingAddress,
        billingAddress: attempt.billingAddress || attempt.shippingAddress,
        customerGstin: attempt.customerGstin,
        customerCompany: attempt.customerCompany,
        razorpayOrderId,
        razorpayPaymentId,
        paidAt: new Date(),
        items: {
          create: attempt.cartSnapshot.map((line) => ({
            productId: line.productId,
            quantity: line.quantity,
            unitPrice: line.unitPrice,
          })),
        },
      },
      include: { items: { include: { product: true } } },
    })

    const cart = await tx.cart.findUnique({ where: { userId } })
    if (cart) {
      await tx.cartItem.deleteMany({ where: { cartId: cart.id } })
    }

    await tx.checkoutAttempt.update({
      where: { id: attemptId },
      data: { stage: 'COMPLETED', convertedOrderId: newOrder.id, isHandled: true },
    })

   return newOrder
  })
  // Fetch payment method from Razorpay — not included in the browser callback.
  try {
    const details = await fetchPaymentDetails(razorpayPaymentId)
    if (details.method) {
      await prisma.order.update({
        where: { id: order.id },
        data: { paymentMethod: details.method },
      })
    }
  } catch (payErr) {
    console.error('Could not fetch payment details for', order.orderNumber, payErr)
  }
  // Notifications are best-effort — a mail failure must never break a paid order.
  try {
    const full = await prisma.order.findUnique({
      where: { id: order.id },
      include: { items: { include: { product: true } }, user: true },
    })
    await sendOrderConfirmed(full)
  } catch (mailErr) {
    console.error('Order confirmation email failed for', order.orderNumber, mailErr)
  }

  return order
}
export async function listAbandoned() {
  return prisma.checkoutAttempt.findMany({
    where: { stage: { not: 'COMPLETED' } },
    orderBy: { createdAt: 'desc' },
  })
}

export async function toggleHandled(id) {
  const attempt = await prisma.checkoutAttempt.findUnique({ where: { id } })
  if (!attempt) throw new ApiError(404, 'Checkout attempt not found')
  return prisma.checkoutAttempt.update({
    where: { id },
    data: { isHandled: !attempt.isHandled },
  })
}