import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const products = await prisma.product.updateMany({
    where: { currency: 'USD' },
    data: { currency: 'INR' },
  })
  const orders = await prisma.order.updateMany({
    where: { currency: 'USD' },
    data: { currency: 'INR' },
  })
  console.log(`✔ Updated ${products.count} products and ${orders.count} orders to INR`)
}

main().catch(console.error).finally(() => prisma.$disconnect())