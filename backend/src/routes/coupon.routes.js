import { Router } from 'express'
import { protect, authorize } from '../middleware/auth.middleware.js'
import * as controller from '../controllers/coupon.controller.js'

const router = Router()

// Customer
router.post('/validate', protect, controller.postValidateCoupon)

// Admin
router.get('/', protect, authorize('ADMIN', 'SUPER_ADMIN'), controller.getCoupons)
router.post('/', protect, authorize('ADMIN', 'SUPER_ADMIN'), controller.postCoupon)
router.patch(
  '/:id/active',
  protect,
  authorize('ADMIN', 'SUPER_ADMIN'),
  controller.patchCouponActive
)

export default router