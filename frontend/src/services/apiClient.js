// src/services/apiClient.js
//
// Single place responsible for talking to the backend.
// Every other service (authService, productService, ...) goes through this.

import { API_BASE_URL, API_TIMEOUT, STORAGE_KEYS } from '../constants'

class ApiError extends Error {
  constructor(message, status, data) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

const isBrowser = typeof window !== 'undefined'

function getAccessToken() {
  if (!isBrowser) return null
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
}

function getRefreshToken() {
  if (!isBrowser) return null
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
}
export function setSession({ accessToken, refreshToken, user } = {}) {
  if (!isBrowser) return
  if (accessToken) localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken)
  if (refreshToken) localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken)
  if (user) localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
}

export function clearSession() {
  if (!isBrowser) return
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
  localStorage.removeItem(STORAGE_KEYS.USER)
}

export function getStoredUser() {
  if (!isBrowser) return null
  const raw = localStorage.getItem(STORAGE_KEYS.USER)
  try {
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

let refreshPromise = null

async function refreshAccessToken() {
  const refreshToken = getRefreshToken()
  if (!refreshToken) throw new ApiError('No refresh token', 401)

  // De-dupe concurrent refresh attempts
  if (!refreshPromise) {
    refreshPromise = fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })
      .then(async (res) => {
        if (!res.ok) throw new ApiError('Refresh failed', res.status)
        return res.json()
      })
      .finally(() => {
        refreshPromise = null
      })
  }

 const data = await refreshPromise
  setSession({
    accessToken: data.data?.accessToken,
    refreshToken: data.data?.refreshToken,
  })
  return data.data?.accessToken
}

/**
 * Core request helper.
 * @param {string} endpoint - e.g. '/auth/login'
 * @param {RequestInit & { auth?: boolean, retry?: boolean }} options
 */
export async function apiRequest(endpoint, options = {}) {
  const { auth = true, retry = true, headers: customHeaders, ...rest } = options

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)

  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders,
  }

  if (auth) {
    const token = getAccessToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...rest,
      headers,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    // Access token expired - try one silent refresh, then retry once
    if (response.status === 401 && auth && retry && getRefreshToken()) {
      try {
        await refreshAccessToken()
        return apiRequest(endpoint, { ...options, retry: false })
      } catch {
        clearSession()
        if (typeof window !== 'undefined') window.location.href = '/login'
        throw new ApiError('Session expired', 401)
      }
    }

    let body = null
    const contentType = response.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      body = await response.json().catch(() => null)
    }

    if (!response.ok) {
      throw new ApiError(body?.message || 'Request failed', response.status, body)
    }

    return body
  } catch (err) {
    clearTimeout(timeoutId)
    if (err.name === 'AbortError') {
      throw new ApiError('Request timed out', 408)
    }
    throw err
  }
}

export const api = {
  get: (endpoint, options) => apiRequest(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options) =>
    apiRequest(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body, options) =>
    apiRequest(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  patch: (endpoint, body, options) =>
    apiRequest(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body) }),
  delete: (endpoint, options) => apiRequest(endpoint, { ...options, method: 'DELETE' }),
}

export { ApiError }
