import crypto from 'crypto'

/**
 * A URL-safe random token for one-time-use links (email verification,
 * password reset). We store its SHA-256 hash in the DB and only ever
 * email the raw value, so a DB leak alone can't be used to reset accounts.
 */
export function generateRawToken() {
  return crypto.randomBytes(32).toString('hex')
}

export function hashToken(rawToken) {
  return crypto.createHash('sha256').update(rawToken).digest('hex')
}
