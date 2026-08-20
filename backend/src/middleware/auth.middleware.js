import { verifyAccessToken } from '../utils/jwt.js'
import { ApiError } from '../utils/ApiError.js'
import { prisma } from '../config/db.js'

/**
 * Requires a valid access token in the Authorization header.
 * Attaches the authenticated user (minus passwordHash) to req.user.
 */
export const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null

    if (!token) {
      throw new ApiError(401, 'Not authenticated')
    }

    const payload = verifyAccessToken(token)

    const user = await prisma.user.findUnique({ where: { id: payload.sub } })
    if (!user) {
      throw new ApiError(401, 'User no longer exists')
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
    }
    next()
  } catch (err) {
    if (err instanceof ApiError) return next(err)
    next(new ApiError(401, 'Invalid or expired token'))
  }
}

/**
 * Restricts a route to specific roles. Use after `protect`.
 * Example: router.get('/admin', protect, authorize('ADMIN', 'SUPER_ADMIN'), handler)
 */
export const authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new ApiError(403, 'You do not have permission to perform this action'))
  }
  next()
}

/**
 * Like `protect`, but doesn't fail if there's no token - useful for routes
 * that behave differently for logged-in vs anonymous users (e.g. chatbot).
 */
export const optionalAuth = async (req, res, next) => {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return next()

  try {
    const payload = verifyAccessToken(token)
    const user = await prisma.user.findUnique({ where: { id: payload.sub } })
    if (user) {
      req.user = { id: user.id, name: user.name, email: user.email, role: user.role }
    }
  } catch {
    // Ignore invalid tokens on optional routes
  }
  next()
}
