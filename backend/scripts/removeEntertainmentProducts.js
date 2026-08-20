import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const slugs = ['cricket-simulator', 'pixel-play', 'subgoal-soccer']

async function main() {
  for (const slug of slugs) {
    const product = await prisma.product.findUnique({ where: { slug } })
    if (!product) {
      console.log(`- ${slug} not found, skipping`)
      continue
    }
    await prisma.cartItem.deleteMany({ where: { productId: product.id } })
    await prisma.orderItem.deleteMany({ where: { productId: product.id } })
    await prisma.review.deleteMany({ where: { productId: product.id } })
    await prisma.product.delete({ where: { id: product.id } })
    console.log(`✔ Deleted ${product.name}`)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })