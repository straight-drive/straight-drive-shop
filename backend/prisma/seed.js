import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminEmail = 'admin@straightdrive.com'
  const adminPassword = 'admin123' // change immediately after first login

  const passwordHash = await bcrypt.hash(adminPassword, 12)

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash, role: 'SUPER_ADMIN' },
    create: {
      name: 'Straight Drive Admin',
      email: adminEmail,
      passwordHash,
      role: 'SUPER_ADMIN',
      isEmailVerified: true,
    },
  })
  console.log(`✔ Admin user ready: ${admin.email} (password: ${adminPassword})`)

  const category = await prisma.category.upsert({
    where: { slug: 'training' },
    update: {},
    create: {
      name: 'Training',
      slug: 'training',
      description: 'Training systems and equipment',
    },
  })
  console.log(`✔ Sample category ready: ${category.name}`)

  await prisma.product.upsert({
    where: { slug: 'elite-training-system' },
    update: {},
    create: {
      name: 'Elite Training System',
      slug: 'elite-training-system',
      description: 'Sample seeded product so /api/products has something to return once built.',
      price: 99.99,
      categoryId: category.id,
      isFeatured: true,
    },
  })
  console.log('✔ Sample product ready')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
