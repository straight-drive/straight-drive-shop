import { Resend } from 'resend'
import { env } from '../config/env.js'

let client = null

function getClient() {
  if (client) return client
  if (!env.RESEND_API_KEY) return null
  client = new Resend(env.RESEND_API_KEY)
  return client
}

/**
 * Sends an email via Resend's HTTP API. Falls back to console logging
 * when no API key is configured, so auth flows stay testable locally.
 */
export async function sendMail({ to, subject, html, text }) {
  const resend = getClient()

  if (!resend) {
    console.log('\n📧 [DEV EMAIL - no provider configured] ---------------')
    console.log('To:', to)
    console.log('Subject:', subject)
    console.log(text || html)
    console.log('-------------------------------------------------------\n')
    return { simulated: true }
  }

  const { data, error } = await resend.emails.send({
    from: env.EMAIL_FROM,
    to,
    subject,
    html: html || undefined,
    text: text || undefined,
  })

  if (error) {
    throw new Error(`Resend error: ${error.message || JSON.stringify(error)}`)
  }

  return data
}

export const emailService = {
  sendVerificationEmail(to, rawToken) {
    const link = `${env.CLIENT_URL}/verify-email?token=${rawToken}`
    return sendMail({
      to,
      subject: 'Verify your Straight Drive account',
      text: `Welcome to Straight Drive! Verify your email: ${link}\nThis link expires in 24 hours.`,
    })
  },

  sendPasswordResetEmail(to, rawToken) {
    const link = `${env.CLIENT_URL}/reset-password?token=${rawToken}`
    return sendMail({
      to,
      subject: 'Reset your Straight Drive password',
      text: `Reset your password: ${link}\nThis link expires in 1 hour. If you didn't request this, you can ignore this email.`,
    })
  },

  sendWelcomeEmail(to, name) {
    return sendMail({
      to,
      subject: 'Welcome to Straight Drive',
      text: `Hi ${name}, welcome aboard!`,
    })
  },
}