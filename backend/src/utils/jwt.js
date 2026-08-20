import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

export function signAccessToken(payload) {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: env.JWT_ACCESS_EXPIRES_IN })
}

export function signRefreshToken(payload) {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: env.JWT_REFRESH_EXPIRES_IN })
}

export function verifyAccessToken(token) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET)
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET)
}

/**
 * Converts a JWT expiresIn string like "30d" / "15m" into a JS Date,
 * used when persisting refresh tokens to the database.
 */
export function expiresInToDate(expiresIn) {
  const match = /^(\d+)([smhd])$/.exec(expiresIn)
  if (!match) return new Date(Date.now() + 15 * 60 * 1000) // fallback: 15 min

  const [, amountStr, unit] = match
  const amount = Number(amountStr)
  const unitMs = { s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 }[unit]
  return new Date(Date.now() + amount * unitMs)
}
