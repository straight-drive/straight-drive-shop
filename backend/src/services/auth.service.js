import { prisma } from '../config/db.js'
import { hashPassword, comparePassword } from '../utils/password.js'
import { generateRawToken, hashToken } from '../utils/token.js'
import { emailService } from './email.service.js'
import { env } from '../config/env.js'
import { sendPasswordResetOtp } from './notification.service.js'
import { issueTokenPair, revokeRefreshToken, revokeAllUserTokens } from './token.service.js'
import { ApiError } from '../utils/ApiError.js'
import { OAuth2Client } from 'google-auth-library'

const PASSWORD_RESET_TTL_MS = 60 * 60 * 1000 // 1 hour
const OTP_TTL_MS = 10 * 60 * 1000 // 10 minutes
const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID)

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000))
}
const EMAIL_VERIFICATION_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

function toPublicUser(user) {
  const { passwordHash, ...rest } = user
  return rest
}

export const authService = {
  async signup({ name, company, email, password }) {
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      throw new ApiError(409, 'An account with this email already exists')
    }

    const passwordHash = await hashPassword(password)
    const user = await prisma.user.create({
      data: { name, company: company || null, email, passwordHash },
    })

    // Fire off verification email (non-blocking for the response would be
    // nicer with a queue; kept awaited here for simplicity/reliability).
    const rawToken = generateRawToken()
    await prisma.emailVerificationToken.create({
      data: {
        token: hashToken(rawToken),
        userId: user.id,
        expiresAt: new Date(Date.now() + EMAIL_VERIFICATION_TTL_MS),
      },
    })
    await emailService.sendVerificationEmail(user.email, rawToken)

    const tokens = await issueTokenPair(user)
    return { user: toPublicUser(user), ...tokens }
  },

  async login({ email, password }) {
    const user = await prisma.user.findUnique({ where: { email } })

    // Google-only accounts have no password set.
    if (user && !user.passwordHash) {
      throw new ApiError(401, 'This account uses Google sign-in. Please continue with Google.')
    }

    // Same error for "no such user" and "wrong password" - don't leak which one.
    if (!user || !(await comparePassword(password, user.passwordHash))) {
      throw new ApiError(401, 'Invalid email or password')
    }

    const tokens = await issueTokenPair(user)
    return { user: toPublicUser(user), ...tokens }
  },

  async logout(refreshToken) {
    if (refreshToken) await revokeRefreshToken(refreshToken)
  },

  async me(userId) {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) throw new ApiError(404, 'User not found')
    return toPublicUser(user)
  },
async googleAuth(idToken) {
    if (!env.GOOGLE_CLIENT_ID) {
      throw new ApiError(500, 'Google sign-in is not configured')
    }

    let payload
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: env.GOOGLE_CLIENT_ID,
      })
      payload = ticket.getPayload()
    } catch {
      throw new ApiError(401, 'Could not verify your Google account')
    }

    if (!payload?.email) {
      throw new ApiError(401, 'Google did not return an email address')
    }

    let user = await prisma.user.findUnique({ where: { email: payload.email } })

    if (user) {
      // Link the Google account to the existing user if not already linked.
      if (!user.googleId) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { googleId: payload.sub, isEmailVerified: true },
        })
      }
    } else {
      user = await prisma.user.create({
        data: {
          email: payload.email,
          name: payload.name || payload.email.split('@')[0],
          googleId: payload.sub,
          isEmailVerified: true,
          avatarUrl: payload.picture || null,
        },
      })
    }

    const tokens = await issueTokenPair(user)
    return { user: toPublicUser(user), ...tokens }
  },
 async forgotPassword(email) {
    const user = await prisma.user.findUnique({ where: { email } })
    // Always resolve successfully - don't reveal whether the email exists.
    if (!user) return

    const otp = generateOtp()

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetOtpHash: hashToken(otp),
        resetOtpExpiresAt: new Date(Date.now() + OTP_TTL_MS),
      },
    })

    await sendPasswordResetOtp(user, otp)
  },

 async resetPassword({ email, otp, password }) {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user || !user.resetOtpHash || !user.resetOtpExpiresAt) {
      throw new ApiError(400, 'This code is invalid or has expired')
    }

    if (user.resetOtpExpiresAt < new Date()) {
      throw new ApiError(400, 'This code has expired. Please request a new one.')
    }

    if (user.resetOtpHash !== hashToken(String(otp))) {
      throw new ApiError(400, 'That code is not correct')
    }

    const passwordHash = await hashPassword(password)

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        resetOtpHash: null,
        resetOtpExpiresAt: null,
      },
    })

    // Log out of every device once the password changes.
    await revokeAllUserTokens(user.id)
  },

  async changePassword({ userId, currentPassword, newPassword }) {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) throw new ApiError(404, 'User not found')

    const matches = await comparePassword(currentPassword, user.passwordHash)
    if (!matches) throw new ApiError(401, 'Current password is incorrect')

    const passwordHash = await hashPassword(newPassword)
    await prisma.user.update({ where: { id: userId }, data: { passwordHash } })
    await revokeAllUserTokens(userId)
  },

  async verifyEmail(token) {
    const hashed = hashToken(token)
    const record = await prisma.emailVerificationToken.findUnique({ where: { token: hashed } })

    if (!record || record.expiresAt < new Date()) {
      throw new ApiError(400, 'This verification link is invalid or has expired')
    }

    await prisma.$transaction([
      prisma.user.update({ where: { id: record.userId }, data: { isEmailVerified: true } }),
      prisma.emailVerificationToken.delete({ where: { id: record.id } }),
    ])
  },

  async resendVerification(email) {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || user.isEmailVerified) return // don't leak account state

    const rawToken = generateRawToken()
    await prisma.emailVerificationToken.create({
      data: {
        token: hashToken(rawToken),
        userId: user.id,
        expiresAt: new Date(Date.now() + EMAIL_VERIFICATION_TTL_MS),
      },
    })
    await emailService.sendVerificationEmail(user.email, rawToken)
  },
}
