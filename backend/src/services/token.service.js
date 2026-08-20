import { prisma } from '../config/db.js'
import { signAccessToken, signRefreshToken, verifyRefreshToken, expiresInToDate } from '../utils/jwt.js'
import { env } from '../config/env.js'
import { ApiError } from '../utils/ApiError.js'

function userPayload(user) {
  return { sub: user.id, role: user.role }
}

/**
 * Issues a fresh access + refresh token pair and persists the refresh
 * token so it can be revoked (logout, password change, etc).
 */
export async function issueTokenPair(user) {
  const accessToken = signAccessToken(userPayload(user))
  const refreshToken = signRefreshToken(userPayload(user))

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: expiresInToDate(env.JWT_REFRESH_EXPIRES_IN),
    },
  })

  return { accessToken, refreshToken }
}

/**
 * Validates a refresh token against the DB (so revoked/rotated tokens are
 * rejected even if the JWT signature is still technically valid) and
 * rotates it: the old one is revoked and a new pair is issued.
 */
const ROTATION_GRACE_MS = 30_000 // 30 seconds

export async function rotateRefreshToken(rawRefreshToken) {
  let payload
  try {
    payload = verifyRefreshToken(rawRefreshToken)
  } catch {
    throw new ApiError(401, 'Invalid or expired refresh token')
  }

  const stored = await prisma.refreshToken.findUnique({ where: { token: rawRefreshToken } })
  if (!stored || stored.expiresAt < new Date()) {
    throw new ApiError(401, 'Invalid or expired refresh token')
  }

  // Grace window: concurrent requests can arrive with a token that was rotated
  // moments ago. Hand back the same replacement pair instead of logging them out.
  if (stored.revoked) {
    const rotatedRecently =
      stored.revokedAt && Date.now() - new Date(stored.revokedAt).getTime() < ROTATION_GRACE_MS

    if (rotatedRecently && stored.replacedByPair) {
      return stored.replacedByPair
    }
    throw new ApiError(401, 'Invalid or expired refresh token')
  }

  const user = await prisma.user.findUnique({ where: { id: payload.sub } })
  if (!user) throw new ApiError(401, 'User no longer exists')

  const pair = await issueTokenPair(user)

  await prisma.refreshToken.update({
    where: { id: stored.id },
    data: {
      revoked: true,
      revokedAt: new Date(),
      replacedByPair: pair,
    },
  })

  return pair
}

export async function revokeRefreshToken(rawRefreshToken) {
  await prisma.refreshToken.updateMany({
    where: { token: rawRefreshToken },
    data: { revoked: true },
  })
}

export async function revokeAllUserTokens(userId) {
  await prisma.refreshToken.updateMany({ where: { userId }, data: { revoked: true } })
}
