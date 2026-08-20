import { asyncHandler } from '../utils/asyncHandler.js'
import { ok, created } from '../utils/apiResponse.js'
import * as reviewService from '../services/review.service.js'

export const postReview = asyncHandler(async (req, res) => {
  const review = await reviewService.createReview(req.user.id, req.body)
  created(res, review, 'Review submitted successfully')
})

export const getProductReviews = asyncHandler(async (req, res) => {
  const reviews = await reviewService.listProductReviews(req.query.productId)
  ok(res, reviews)
})