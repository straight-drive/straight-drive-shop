// backend/scripts/seedCatalogProducts.js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const training = await prisma.category.findUnique({ where: { slug: 'training' } })
  const entertainment = await prisma.category.findUnique({ where: { slug: 'entertainment' } })

  if (!training || !entertainment) {
    throw new Error('Category "training" or "entertainment" not found — check your category slugs first.')
  }

  const products = [
    {
      name: 'PaceAttack Pro',
      slug: 'paceattack-pro',
      description: 'Professional pace training with full app control — every ball recorded, every session measured.',
      price: 249999,
      categoryId: training.id,
    },
    {
      name: 'Twister',
      slug: 'twister',
      description: 'Dedicated swing and spin machine — outswing, inswing, off-spin and leg-spin on demand.',
      price: 199999,
      categoryId: training.id,
    },
    {
      name: 'Cricket Balls — Box of 6',
      slug: 'cricket-balls-box-of-6',
      description: 'Standard machine ball, match weight. Built for our wheels — consistent seam, consistent bounce, long life. Box of 6.',
      price: 1499,
      categoryId: training.id,
    },
    {
      name: 'Cricket Balls — Box of 12',
      slug: 'cricket-balls-box-of-12',
      description: 'Standard machine ball, match weight. Built for our wheels — consistent seam, consistent bounce, long life. Box of 12.',
      price: 2799,
      categoryId: training.id,
    },
    {
      name: 'Cricket Simulator',
      slug: 'cricket-simulator',
      description: 'Full-lane cricket simulation — real bowling, autoscoring and big-screen gameplay that anchors an entire venue.',
      price: 999999,
      categoryId: entertainment.id,
    },
    {
      name: 'Pixel Play',
      slug: 'pixel-play',
      description: 'The compact cricket simulator — big-screen cricket in a smaller footprint.',
      price: 599999,
      categoryId: entertainment.id,
    },
    {
      name: 'SubGoal Soccer',
      slug: 'subgoal-soccer',
      description: 'Fast-paced tabletop football — social, competitive, endlessly replayable.',
      price: 149999,
      categoryId: entertainment.id,
    },
  ]

  for (const p of products) {
    const result = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        stock: 999,
        isActive: true,
        categoryId: p.categoryId,
      },
    })
    console.log(`✔ ${result.name} (${result.slug})`)
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