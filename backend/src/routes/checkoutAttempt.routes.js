import { Router } from 'express'
import { validate } from '../middleware/validate.middleware.js'
import { protect, authorize } from '../middleware/auth.middleware.js'
import { createAttemptSchema, verifyAttemptPaymentSchema } from '../validators/checkoutAttempt.validator.js'
import {
  postAttempt,
  postAttemptPay,
  postAttemptConfirm,
  getAbandonedAttempts,
  putAttemptHandled,
} from '../controllers/checkoutAttempt.controller.js'

const router = Router()
router.use(protect)

router.post('/', validate(createAttemptSchema), postAttempt)
router.post('/:id/pay', postAttemptPay)
router.post('/verify-payment', validate(verifyAttemptPaymentSchema), postAttemptConfirm)

router.get('/abandoned', authorize('ADMIN', 'SUPER_ADMIN'), getAbandonedAttempts)
router.put('/:id/handled', authorize('ADMIN', 'SUPER_ADMIN'), putAttemptHandled)

export default router