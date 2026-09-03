import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categories = [
  { slug: 'training', name: 'Training', description: 'Training systems and equipment' },
  { slug: 'entertainment', name: 'Entertainment', description: 'Venue entertainment systems' },
]

async function main() {
  for (const c of categories) {
    const cat = await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    })
    console.log(`✔ ${cat.name}`)
  }
}

main().catch(console.error).finally(() => prisma.$disconnect())