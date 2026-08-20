import { z } from 'zod'

const addressSchema = z.object({
  fullName: z.string().min(2),
  line1: z.string().min(2),
  line2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string().min(1),
  phone: z.string().optional(),
})

export const createAttemptSchema = z.object({
  body: z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    customerGstin: z.string().optional(),
    customerCompany: z.string().optional(),
    shippingAddress: addressSchema,
    billingAddress: addressSchema.optional(),
  }),
})

export const verifyAttemptPaymentSchema = z.object({
  body: z.object({
    attemptId: z.string().min(1),
    razorpayOrderId: z.string().min(1),
    razorpayPaymentId: z.string().min(1),
    razorpaySignature: z.string().min(1),
  }),
})