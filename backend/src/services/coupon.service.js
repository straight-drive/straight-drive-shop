import { prisma } from '../config/db.js'
import { ApiError } from '../utils/ApiError.js'

/**
 * Admin: create a coupon. Codes are stored uppercase so lookups are
 * case-insensitive from the customer's point of view.
 */
export async function createCoupon({ code, name, discountPercent, productIds }) {
  const normalised = String(code).trim().toUpperCase()

  if (!normalised) throw new ApiError(400, 'Coupon code is required')
  if (discountPercent < 1 || discountPercent > 100) {
    throw new ApiError(400, 'Discount must be between 1 and 100 percent')
  }

  const existing = await prisma.coupon.findUnique({ where: { code: normalised } })
  if (existing) throw new ApiError(409, 'A coupon with this code already exists')

  return prisma.coupon.create({
    data: {
      code: normalised,
      name,
      discountPercent,
      productIds: productIds || [],
    },
  })
}

export async function listCoupons() {
  const coupons = await prisma.coupon.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { redemptions: true } } },
  })

  return coupons.map((c) => ({
    ...c,
    timesRedeemed: c._count.redemptions,
    _count: undefined,
  }))
}

export async function toggleCouponActive(id) {
  const coupon = await prisma.coupon.findUnique({ where: { id } })
  if (!coupon) throw new ApiError(404, 'Coupon not found')

  return prisma.coupon.update({
    where: { id },
    data: { isActive: !coupon.isActive },
  })
}

/**
 * Checks whether a customer may use a coupon on the given cart items,
 * and works out the discount. Does not record anything — that happens
 * only once payment succeeds.
 */
export async function validateCoupon({ code, userId, items }) {
  const normalised = String(code || '').trim().toUpperCase()
  if (!normalised) throw new ApiError(400, 'Please enter a coupon code')

  const coupon = await prisma.coupon.findUnique({ where: { code: normalised } })
  if (!coupon) throw new ApiError(404, 'That coupon code is not valid')
  if (!coupon.isActive) throw new ApiError(400, 'That coupon is no longer active')

  const alreadyUsed = await prisma.couponRedemption.findUnique({
    where: { couponId_userId: { couponId: coupon.id, userId } },
  })
  if (alreadyUsed) throw new ApiError(400, 'You have already used this coupon')

  // An empty productIds list means the coupon applies to everything.
  const restricted = coupon.productIds.length > 0
  const eligible = restricted
    ? items.filter((i) => coupon.productIds.includes(i.productId))
    : items

  if (eligible.length === 0) {
    throw new ApiError(400, 'This coupon does not apply to the items in your cart')
  }

  const eligibleSubtotal = eligible.reduce(
    (sum, i) => sum + Number(i.unitPrice) * i.quantity,
    0
  )

  const discountAmount = Math.round((eligibleSubtotal * coupon.discountPercent) / 100)

   return {
    couponId: coupon.id,
    code: coupon.code,
    name: coupon.name,
    discountPercent: coupon.discountPercent,
    discountAmount,
    productIds: coupon.productIds,
  }
}

/**
 * Records that a customer has used a coupon. The unique constraint on
 * (couponId, userId) means a duplicate cannot slip through even if this
 * is somehow called twice.
 */
export async function recordRedemption({ couponId, userId, orderId }) {
  return prisma.couponRedemption.create({
    data: { couponId, userId, orderId },
  })
}