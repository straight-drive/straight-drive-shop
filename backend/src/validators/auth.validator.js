import { z } from 'zod'

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(72, 'Password must be at most 72 characters')

export const signupSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, 'Name is required'),
    company: z.string().trim().optional().or(z.literal('')),
    email: z.string().trim().toLowerCase().email('Invalid email address'),
    password: passwordSchema,
  }),
})

export const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().toLowerCase().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
    rememberMe: z.boolean().optional().default(false),
  }),
})

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().trim().toLowerCase().email('Invalid email address'),
  }),
})

export const resetPasswordSchema = z.object({
  body: z.object({
    email: z.string().email('A valid email is required'),
    otp: z.string().length(6, 'Enter the 6-digit code'),
    password: passwordSchema,
  }),
})

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: passwordSchema,
  }),
})

export const verifyEmailSchema = z.object({
  body: z.object({
    token: z.string().min(1, 'Token is required'),
  }),
})

export const resendVerificationSchema = z.object({
  body: z.object({
    email: z.string().trim().toLowerCase().email('Invalid email address'),
  }),
})

export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1, 'Refresh token is required'),
  }),
})
export const googleAuthSchema = z.object({
  body: z.object({
    idToken: z.string().min(1, 'Google token is required'),
  }),
})
