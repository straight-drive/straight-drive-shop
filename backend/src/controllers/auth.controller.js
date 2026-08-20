import { authService } from '../services/auth.service.js'
import { rotateRefreshToken, revokeRefreshToken } from '../services/token.service.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ok, created } from '../utils/apiResponse.js'

export const signup = asyncHandler(async (req, res) => {
  const result = await authService.signup(req.body)
  return created(res, result, 'Account created. Please check your email to verify your address.')
})

export const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body)
  return ok(res, result, 200, 'Logged in successfully')
})

export const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body
  if (refreshToken) await revokeRefreshToken(refreshToken)
  return ok(res, null, 200, 'Logged out')
})

export const refreshToken = asyncHandler(async (req, res) => {
  const tokens = await rotateRefreshToken(req.body.refreshToken)
  return ok(res, tokens, 200)
})

export const me = asyncHandler(async (req, res) => {
  const user = await authService.me(req.user.id)
  return ok(res, user)
})

export const forgotPassword = asyncHandler(async (req, res) => {
  await authService.forgotPassword(req.body.email)
  return ok(res, null, 200, 'If that email exists, a reset link has been sent.')
})

export const resetPassword = asyncHandler(async (req, res) => {
  await authService.resetPassword(req.body)
  return ok(res, null, 200, 'Password updated successfully')
})

export const changePassword = asyncHandler(async (req, res) => {
  await authService.changePassword({ userId: req.user.id, ...req.body })
  return ok(res, null, 200, 'Password changed successfully')
})

export const verifyEmail = asyncHandler(async (req, res) => {
  await authService.verifyEmail(req.body.token)
  return ok(res, null, 200, 'Email verified successfully')
})

export const resendVerification = asyncHandler(async (req, res) => {
  await authService.resendVerification(req.body.email)
  return ok(res, null, 200, 'If that email exists and is unverified, a new link has been sent.')
})
export const googleAuth = asyncHandler(async (req, res) => {
  const result = await authService.googleAuth(req.body.idToken)
  return ok(res, result, 200, 'Signed in with Google')
})
