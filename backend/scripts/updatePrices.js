import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const prices = [
  { slug: 'paceattack-pro', price: 145000 },
  { slug: 'cricket-balls-box-of-6', price: 2100 },
  { slug: 'cricket-balls-box-of-12', price: 4200 },
]

async function main() {
  for (const p of prices) {
    const updated = await prisma.product.update({
      where: { slug: p.slug },
      data: { price: p.price },
    })
    console.log(`✔ ${updated.name} → ₹${Number(updated.price).toLocaleString('en-IN')}`)
  }
}

main().catch(console.error).finally(() => prisma.$disconnect())