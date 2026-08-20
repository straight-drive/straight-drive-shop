import { ApiError } from '../utils/ApiError.js'
import { fail } from '../utils/apiResponse.js'
import { env } from '../config/env.js'

export function notFoundHandler(req, res) {
  return fail(res, 404, `Route not found: ${req.method} ${req.originalUrl}`)
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return fail(res, err.status, err.message, err.errors)
  }

  // Prisma known errors (e.g. unique constraint violations)
  if (err.code === 'P2002') {
    const field = err.meta?.target?.[0] || 'field'
    return fail(res, 409, `A record with this ${field} already exists`)
  }

  console.error('Unhandled error:', err)

  return fail(
    res,
    500,
    env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  )
}
