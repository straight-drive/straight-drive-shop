import { ApiError } from '../utils/ApiError.js'

/**
 * Runs a zod schema against { body, query, params } and replaces req.body
 * with the parsed (and coerced/trimmed) result on success.
 */
export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse({ body: req.body, query: req.query, params: req.params })

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return next(new ApiError(422, 'Validation failed', errors))
  }

  req.body = result.data.body ?? req.body
  next()
}
