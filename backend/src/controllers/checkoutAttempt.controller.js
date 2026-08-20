import { asyncHandler } from '../utils/asyncHandler.js'
import { ok, created } from '../utils/apiResponse.js'
import * as attemptService from '../services/checkoutAttempt.service.js'

export const postAttempt = asyncHandler(async (req, res) => {
  const attempt = await attemptService.createAttempt(req.user.id, req.body)
  created(res, attempt, 'Checkout attempt created')
})

export const postAttemptPay = asyncHandler(async (req, res) => {
  const paymentData = await attemptService.initiatePayment(req.user.id, req.params.id)
  ok(res, paymentData)
})

export const postAttemptConfirm = asyncHandler(async (req, res) => {
  const order = await attemptService.confirmPayment(req.user.id, req.body)
  ok(res, order, 200, 'Payment confirmed successfully')
})

// Admin-only
export const getAbandonedAttempts = asyncHandler(async (req, res) => {
  const attempts = await attemptService.listAbandoned()
  ok(res, attempts)
})

export const putAttemptHandled = asyncHandler(async (req, res) => {
  const attempt = await attemptService.toggleHandled(req.params.id)
  ok(res, attempt, 200, 'Updated')
})