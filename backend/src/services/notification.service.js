import { prisma } from '../config/db.js'
import { env } from '../config/env.js'
import { emailService, sendMail } from './email.service.js'
import { wrapEmail, orderItemsTable } from '../utils/emailTemplate.js'

const ADMIN_EMAIL = env.ADMIN_NOTIFICATION_EMAIL

async function logEmail({ orderId, userId, recipient, subject, type, status, error }) {
  try {
    await prisma.emailLog.create({
      data: { orderId, userId, recipient, subject, type, status, error },
    })
  } catch (err) {
    console.error('Failed to write email log:', err)
  }
}

async function deliver({ to, subject, html, type, orderId, userId }) {
  if (!to) return
  try {
    await sendMail({ to, subject, html })
    await logEmail({ orderId, userId, recipient: to, subject, type, status: 'SENT' })
  } catch (err) {
    console.error(`Email failed [${type}] to ${to}:`, err)
    await logEmail({
      orderId,
      userId,
      recipient: to,
      subject,
      type,
      status: 'FAILED',
      error: String(err?.message || err),
    })
  }
}

export async function sendOrderConfirmed(order) {
  const customerEmail = order.user?.email
  const name = order.user?.name || 'there'

  await deliver({
    to: customerEmail,
    userId: order.userId,
    orderId: order.id,
    type: 'ORDER_CONFIRMED_CUSTOMER',
    subject: `Order confirmed — ${order.orderNumber}`,
    html: wrapEmail({
      heading: 'Your order is confirmed.',
      intro: `Hi ${name}, thanks for your order. We have received your payment and your order is now in production.`,
      bodyHtml: `
        <p style="margin:0 0 6px;font-size:13px;color:#8FA1AE">Order number</p>
        <p style="margin:0 0 18px;font-size:18px;font-weight:bold;color:#00B5DF">${order.orderNumber}</p>
        ${orderItemsTable(order)}`,
      footerNote:
        'Every product is made to order. We will email you again the moment it is dispatched.',
    }),
  })

  await deliver({
    to: ADMIN_EMAIL,
    orderId: order.id,
    type: 'ORDER_CONFIRMED_ADMIN',
    subject: `New order received — ${order.orderNumber}`,
    html: wrapEmail({
      heading: 'New order received.',
      intro: `A new order has come in and needs processing.`,
      bodyHtml: `
        <p style="margin:0 0 6px;font-size:13px;color:#8FA1AE">Order number</p>
        <p style="margin:0 0 14px;font-size:18px;font-weight:bold;color:#00B5DF">${order.orderNumber}</p>
        <p style="margin:0 0 6px;font-size:13px;color:#8FA1AE">Customer</p>
        <p style="margin:0 0 18px;font-size:15px;color:#EAF2F7">${order.user?.name || '—'} · ${customerEmail || '—'}</p>
        ${orderItemsTable(order)}`,
      ctaLabel: 'Open admin panel',
      ctaUrl: `${env.CLIENT_URL}/admin/orders`,
    }),
  })
}

export async function sendOrderDispatched(order) {
  const customerEmail = order.user?.email
  const name = order.user?.name || 'there'

  await deliver({
    to: customerEmail,
    userId: order.userId,
    orderId: order.id,
    type: 'ORDER_DISPATCHED_CUSTOMER',
    subject: `Your order has been dispatched — ${order.orderNumber}`,
    html: wrapEmail({
      heading: 'Your order is on its way.',
      intro: `Hi ${name}, your order has been dispatched from our Hyderabad factory.`,
      bodyHtml: `
        <p style="margin:0 0 6px;font-size:13px;color:#8FA1AE">Order number</p>
        <p style="margin:0 0 18px;font-size:18px;font-weight:bold;color:#00B5DF">${order.orderNumber}</p>
        ${orderItemsTable(order)}`,
      footerNote: 'Your GST invoice has been generated and will follow separately.',
    }),
  })

  await deliver({
    to: ADMIN_EMAIL,
    orderId: order.id,
    type: 'ORDER_DISPATCHED_ADMIN',
    subject: `Order dispatched — ${order.orderNumber}`,
    html: wrapEmail({
      heading: 'Order dispatched.',
      intro: `${order.orderNumber} has been marked dispatched and the invoice generated.`,
      ctaLabel: 'Open admin panel',
      ctaUrl: `${env.CLIENT_URL}/admin/orders`,
    }),
  })
}

export async function sendOrderDelivered(order) {
  const customerEmail = order.user?.email
  const name = order.user?.name || 'there'

  await deliver({
    to: customerEmail,
    userId: order.userId,
    orderId: order.id,
    type: 'ORDER_DELIVERED_CUSTOMER',
    subject: `Your order has been delivered — ${order.orderNumber}`,
    html: wrapEmail({
      heading: 'Delivered.',
      intro: `Hi ${name}, your order has been marked delivered. We hope you enjoy it.`,
      bodyHtml: `
        <p style="margin:0 0 6px;font-size:13px;color:#8FA1AE">Order number</p>
        <p style="margin:0;font-size:18px;font-weight:bold;color:#00B5DF">${order.orderNumber}</p>`,
      footerNote:
        'Any questions about setup or service, reply to this email or call us — Mon to Sat, 9:30 to 18:30 IST.',
    }),
  })

  await deliver({
    to: ADMIN_EMAIL,
    orderId: order.id,
    type: 'ORDER_DELIVERED_ADMIN',
    subject: `Order delivered — ${order.orderNumber}`,
    html: wrapEmail({
      heading: 'Order delivered.',
      intro: `${order.orderNumber} has been marked delivered.`,
    }),
  })
}

export async function sendPasswordResetOtp(user, otp) {
  await deliver({
    to: user.email,
    userId: user.id,
    type: 'PASSWORD_RESET_OTP',
    subject: 'Your Straight Drive password reset code',
    html: wrapEmail({
      heading: 'Password reset code',
      intro: `Hi ${user.name || 'there'}, use the code below to reset your password. It expires in 10 minutes.`,
      bodyHtml: `
        <p style="margin:0;font-size:34px;font-weight:bold;letter-spacing:.24em;color:#00B5DF">${otp}</p>`,
      footerNote: 'If you did not request this, you can safely ignore this email.',
    }),
  })
}