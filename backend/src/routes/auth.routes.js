import { Router } from 'express'
import * as authController from '../controllers/auth.controller.js'
import { validate } from '../middleware/validate.middleware.js'
import { protect } from '../middleware/auth.middleware.js'
import { authLimiter } from '../middleware/rateLimiter.middleware.js'
import {
  signupSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  verifyEmailSchema,
  resendVerificationSchema,
 refreshTokenSchema,
  googleAuthSchema,
} from '../validators/auth.validator.js'

const router = Router()

router.post('/signup', authLimiter, validate(signupSchema), authController.signup)
router.post('/login', authLimiter, validate(loginSchema), authController.login)
router.post('/google', authLimiter, validate(googleAuthSchema), authController.googleAuth)
router.post('/refresh-token', validate(refreshTokenSchema), authController.refreshToken)
router.post('/logout', authController.logout)

router.get('/me', protect, authController.me)

router.post(
  '/forgot-password',
  authLimiter,
  validate(forgotPasswordSchema),
  authController.forgotPassword
)
router.post('/reset-password', validate(resetPasswordSchema), authController.resetPassword)
router.post(
  '/change-password',
  protect,
  validate(changePasswordSchema),
  authController.changePassword
)

router.post('/verify-email', validate(verifyEmailSchema), authController.verifyEmail)
router.post(
  '/resend-verification',
  authLimiter,
  validate(resendVerificationSchema),
  authController.resendVerification
)

export default router
