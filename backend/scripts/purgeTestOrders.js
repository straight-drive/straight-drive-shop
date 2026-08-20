import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Orders to keep — everything else gets deleted
const KEEP = ['SD-260814-1885', 'SD-260814-2304']

async function main() {
  const toDelete = await prisma.order.findMany({
    where: { orderNumber: { notIn: KEEP } },
    select: { id: true, orderNumber: true },
  })

  if (toDelete.length === 0) {
    console.log('Nothing to delete.')
    return
  }

  const ids = toDelete.map((o) => o.id)

  const items = await prisma.orderItem.findMany({
    where: { orderId: { in: ids } },
    select: { id: true },
  })
  const itemIds = items.map((i) => i.id)

  const serials = await prisma.serialNumber.deleteMany({
    where: { orderItemId: { in: itemIds } },
  })
  const deletedItems = await prisma.orderItem.deleteMany({
    where: { orderId: { in: ids } },
  })
  const deletedOrders = await prisma.order.deleteMany({
    where: { id: { in: ids } },
  })

  console.log(`Deleted ${deletedOrders.count} orders, ${deletedItems.count} order items, ${serials.count} serial numbers.`)
  console.log(`Kept: ${KEEP.join(', ')}`)
}

main().catch(console.error).finally(() => prisma.$disconnect())