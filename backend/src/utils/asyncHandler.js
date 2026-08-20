/**
 * Wraps an async Express route handler so rejected promises are
 * forwarded to next(err) and handled by the central error middleware,
 * instead of crashing the process or requiring try/catch everywhere.
 */
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)
