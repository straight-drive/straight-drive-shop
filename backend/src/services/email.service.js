import nodemailer from 'nodemailer'
import { env } from '../config/env.js'

let transporter = null

function getTransporter() {
  if (transporter) return transporter

  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
    return null
  }

  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
  })
  return transporter
}

/**
 * Sends an email if SMTP is configured; otherwise logs the content to
 * the console so auth flows are still testable in local development
 * without a real mail provider.
 */
export async function sendMail({ to, subject, html, text }) {
  const t = getTransporter()

  if (!t) {
    console.log('\n📧 [DEV EMAIL - no SMTP configured] ------------------')
    console.log('To:', to)
    console.log('Subject:', subject)
    console.log(text || html)
    console.log('-------------------------------------------------------\n')
    return { simulated: true }
  }

  return t.sendMail({ from: env.EMAIL_FROM, to, subject, html, text })
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
