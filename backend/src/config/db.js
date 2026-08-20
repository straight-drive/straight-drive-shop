import { PrismaClient } from '@prisma/client'
import { env } from './env.js'

// Prevent multiple PrismaClient instances in dev (hot reload) by
// stashing the instance on globalThis.
const globalForPrisma = globalThis

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  })

if (env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
