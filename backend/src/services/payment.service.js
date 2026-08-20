import Razorpay from 'razorpay'
import crypto from 'crypto'
import { env } from '../config/env.js'
import { ApiError } from '../utils/ApiError.js'

function getRazorpayClient() {
  if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
    throw new ApiError(500, 'Payment gateway is not configured yet')
  }
  return new Razorpay({
    key_id: env.RAZORPAY_KEY_ID,
    key_secret: env.RAZORPAY_KEY_SECRET,
  })
}

/**
 * Creates a Razorpay order for a given amount (in the smallest currency unit,
 * e.g. paise for INR — so ₹100 must be passed as 10000).
 */
export async function createRazorpayOrder({ amount, currency = 'INR', receipt }) {
  const razorpay = getRazorpayClient()
  const order = await razorpay.orders.create({
    amount: Math.round(amount * 100), // convert rupees to paise
    currency,
    receipt,
  })
  return order
}

/**
 * Verifies that a payment callback genuinely came from Razorpay and wasn't
 * forged by tampering with the frontend. This is the single most important
 * security check in the whole payment flow.
 */
export function verifyPaymentSignature({ orderId, paymentId, signature }) {
  if (!env.RAZORPAY_KEY_SECRET) {
    throw new ApiError(500, 'Payment gateway is not configured yet')
  }
  const expectedSignature = crypto
    .createHmac('sha256', env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest('hex')

  return expectedSignature === signature
}
/**
 * Fetches full payment details from Razorpay after a successful payment.
 * Gives us the method (card / upi / netbanking / wallet), bank, and fees —
 * none of which come back in the browser checkout callback.
 */
export async function fetchPaymentDetails(paymentId) {
  const razorpay = getRazorpayClient()
  const payment = await razorpay.payments.fetch(paymentId)
  return {
    method: payment.method || null,
    bank: payment.bank || null,
    wallet: payment.wallet || null,
    vpa: payment.vpa || null,
    fee: payment.fee != null ? payment.fee / 100 : null,
    status: payment.status || null,
  }
}