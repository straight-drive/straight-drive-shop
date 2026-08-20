import { prisma } from '../config/db.js'
import { ApiError } from '../utils/ApiError.js'

/**
 * Suggests the next sequential serial numbers for a product.
 * Format: {productCode}-{001, 002, ...}
 */
export async function suggestSerials(productId, count, orderItemId) {
  const product = await prisma.product.findUnique({ where: { id: productId } })
  if (!product) throw new ApiError(404, 'Product not found')
  if (!product.productCode) {
    throw new ApiError(400, `"${product.name}" has no product code set — add one before dispatching`)
  }

  if (orderItemId) {
    const alreadyAssigned = await prisma.serialNumber.findMany({
      where: { orderItemId },
      orderBy: { serial: 'asc' },
      select: { serial: true },
    })
    if (alreadyAssigned.length === count) {
      return alreadyAssigned.map((s) => s.serial)
    }
  }

  const existing = await prisma.serialNumber.findMany({
    where: {
      productId,
      ...(orderItemId ? { orderItemId: { not: orderItemId } } : {}),
    },
    select: { serial: true },
  })

  let highest = 0
  for (const row of existing) {
    const match = row.serial.match(/-(\d+)$/)
    if (match) {
      const num = parseInt(match[1], 10)
      if (num > highest) highest = num
    }
  }

  const suggestions = []
  for (let i = 1; i <= count; i++) {
    suggestions.push(`${product.productCode}-${String(highest + i).padStart(3, '0')}`)
  }
  return suggestions
}

/**
 * Saves serial numbers against an order item.
 * The DB unique constraint guarantees no duplicates.
 */
export async function assignSerials(orderItemId, serials) {
  const orderItem = await prisma.orderItem.findUnique({
    where: { id: orderItemId },
    include: { serialNumbers: true },
  })
  if (!orderItem) throw new ApiError(404, 'Order item not found')

  if (serials.length !== orderItem.quantity) {
    throw new ApiError(400, `Expected ${orderItem.quantity} serial number(s), received ${serials.length}`)
  }

  const trimmed = serials.map((s) => String(s).trim())
  if (trimmed.some((s) => !s)) {
    throw new ApiError(400, 'Every unit needs a serial number')
  }

  const unique = new Set(trimmed)
  if (unique.size !== trimmed.length) {
    throw new ApiError(400, 'Duplicate serial numbers in this order')
  }

  const clash = await prisma.serialNumber.findFirst({
    where: {
      serial: { in: trimmed },
      orderItemId: { not: orderItemId },
    },
  })
  if (clash) {
    throw new ApiError(409, `Serial "${clash.serial}" is already assigned to another order`)
  }

  await prisma.serialNumber.deleteMany({ where: { orderItemId } })

  await prisma.serialNumber.createMany({
    data: trimmed.map((serial) => ({
      serial,
      productId: orderItem.productId,
      orderItemId,
    })),
  })

  return prisma.serialNumber.findMany({ where: { orderItemId } })
}