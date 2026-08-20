import { prisma } from '../config/db.js'

export async function createContactMessage(data, userId) {
  return prisma.contactMessage.create({ data: { ...data, userId: userId ?? null } })
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