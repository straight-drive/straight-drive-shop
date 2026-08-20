import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import readline from 'node:readline/promises'
import { stdin, stdout } from 'node:process'

const prisma = new PrismaClient()

const EMAIL = 'shop@straightdrivesport.com'
const NAME = 'Straight Drive'

async function main() {
  const rl = readline.createInterface({ input: stdin, output: stdout })
  const password = await rl.question('Set a password for the admin account: ')
  rl.close()

  if (!password || password.length < 8) {
    console.error('Password must be at least 8 characters.')
    return
  }

  const passwordHash = await bcrypt.hash(password, 12)

  const user = await prisma.user.upsert({
    where: { email: EMAIL },
    update: { role: 'SUPER_ADMIN', passwordHash, isEmailVerified: true },
    create: {
      email: EMAIL,
      name: NAME,
      passwordHash,
      role: 'SUPER_ADMIN',
      isEmailVerified: true,
    },
  })

  console.log(`✔ ${user.email} is now SUPER_ADMIN`)
}

main().catch(console.error).finally(() => prisma.$disconnect())