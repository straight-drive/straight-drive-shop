import { Router } from 'express'
import { validate } from '../middleware/validate.middleware.js'
import { protect } from '../middleware/auth.middleware.js'
import { createReviewSchema } from '../validators/review.validator.js'
import { postReview, getProductReviews } from '../controllers/review.controller.js'

const router = Router()

router.get('/', getProductReviews)
router.post('/', protect, validate(createReviewSchema), postReview)

export default router