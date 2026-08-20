/**
 * Consistent response envelope used by every endpoint so the frontend
 * API client (see src/services/apiClient.js) can rely on one shape:
 *   { success: boolean, data?: any, message?: string, errors?: any }
 */
export function ok(res, data, status = 200, message) {
  return res.status(status).json({ success: true, data, ...(message && { message }) })
}

export function created(res, data, message) {
  return ok(res, data, 201, message)
}

export function fail(res, status = 400, message = 'Something went wrong', errors) {
  return res.status(status).json({ success: false, message, ...(errors && { errors }) })
}
