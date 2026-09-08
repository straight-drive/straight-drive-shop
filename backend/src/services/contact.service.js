import { prisma } from '../config/db.js'
import { sendContactMessageAlert } from './notification.service.js'

export async function createContactMessage(data, userId) {
  const message = await prisma.contactMessage.create({
    data: { ...data, userId: userId ?? null },
  })

  // Email the admin, but never let a mail failure lose the enquiry —
  // it's already saved and visible in the admin panel either way.
  try {
    await sendContactMessageAlert(message)
  } catch (err) {
    console.error('Could not send contact alert email:', err?.message)
  }

  return message
}

export async function listMyMessages(userId) {
  return prisma.contactMessage.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })
}
export async function listContactMessages() {
  return prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export async function toggleHandled(id) {
  const message = await prisma.contactMessage.findUnique({ where: { id } })
  return prisma.contactMessage.update({
    where: { id },
    data: { isHandled: !message.isHandled },
  })
}