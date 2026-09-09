import { asyncHandler } from '../utils/asyncHandler.js'
import { ok, created } from '../utils/apiResponse.js'
import * as couponService from '../services/coupon.service.js'
import { prisma } from '../config/db.js'

export const postCoupon = asyncHandler(async (req, res) => {
  const coupon = await couponService.createCoupon(req.body)
  created(res, coupon, 'Coupon created')
})

export const getCoupons = asyncHandler(async (req, res) => {
  const coupons = await couponService.listCoupons()
  ok(res, coupons)
})

export const patchCouponActive = asyncHandler(async (req, res) => {
  const coupon = await couponService.toggleCouponActive(req.params.id)
  ok(res, coupon, 200, coupon.isActive ? 'Coupon activated' : 'Coupon deactivated')
})

/**
 * Customer-facing: checks a code against the signed-in user's cart and
 * returns the discount without recording anything.
 */
export const postValidateCoupon = asyncHandler(async (req, res) => {
  const cart = await prisma.cart.findUnique({
    where: { userId: req.user.id },
    include: { items: { include: { product: true } } },
  })

  const items = (cart?.items || []).map((i) => ({
    productId: i.productId,
    unitPrice: i.product.price,
    quantity: i.quantity,
  }))

  const result = await couponService.validateCoupon({
    code: req.body.code,
    userId: req.user.id,
    items,
  })

   ok(res, result, 200, 'Coupon applied')
})