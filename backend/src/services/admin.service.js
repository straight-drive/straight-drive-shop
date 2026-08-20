import { prisma } from '../config/db.js'

export async function getDashboardStats() {
  const [
    totalProducts,
    totalOrders,
    pendingOrders,
    deliveredOrders,
    awaitingDispatch,
    totalClients,
    revenueResult,
    unhandledMessages,
    unhandledAlerts,
  ] = await Promise.all([
    prisma.product.count({ where: { isActive: true } }),
    prisma.order.count({ where: { status: { not: 'CANCELLED' } } }),
    prisma.order.count({ where: { status: { in: ['PROCESSING', 'SHIPPED'] } } }),
    prisma.order.count({ where: { status: 'DELIVERED' } }),
    prisma.order.count({ where: { status: 'PROCESSING' } }),
    prisma.user.count({ where: { role: 'USER' } }),
    prisma.order.aggregate({
      _sum: { total: true },
      where: { status: { in: ['PROCESSING', 'SHIPPED', 'DELIVERED'] } },
    }),
    prisma.contactMessage.count({ where: { isHandled: false } }),
    prisma.checkoutAttempt.count({ where: { isHandled: false, stage: { not: 'COMPLETED' } } }),
  ])

  

return {
    totalRevenue: Number(revenueResult._sum.total || 0),
    totalOrders,
    pendingOrders,
    deliveredOrders,
    awaitingDispatch,
    totalProducts,
    totalClients,
    unhandledMessages,
    unhandledAlerts,
  }
}

export async function getRecentMessages(limit = 3) {
  return prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
  })
}

export async function getRecentAlerts(limit = 3) {
  return prisma.checkoutAttempt.findMany({
    where: { stage: { not: 'COMPLETED' } },
    orderBy: { createdAt: 'desc' },
    take: limit,
  })
}