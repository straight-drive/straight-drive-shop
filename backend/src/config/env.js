import 'dotenv/config'

function required(name, fallback) {
  const value = process.env[name] ?? fallback
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '4000', 10),

  DATABASE_URL: required('DATABASE_URL'),

  JWT_ACCESS_SECRET: required('JWT_ACCESS_SECRET'),
  JWT_REFRESH_SECRET: required('JWT_REFRESH_SECRET'),
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '30d',

 CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
 CLIENT_URLS: (process.env.CLIENT_URLS || 'http://localhost:5173,http://localhost:3000').split(','),

  COOKIE_SECRET: process.env.COOKIE_SECRET || 'dev_cookie_secret_change_me',

  // Email (Step 9 / password reset & verification emails)
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  EMAIL_FROM: process.env.EMAIL_FROM || 'no-reply@straightdrive.com',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,

  // Cloudinary (Step 16 — file uploads, ready but optional)
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

  // Shopify (Step 7 — ready but optional until connected)
  SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
  SHOPIFY_STOREFRONT_TOKEN: process.env.SHOPIFY_STOREFRONT_TOKEN,
  SHOPIFY_ADMIN_TOKEN: process.env.SHOPIFY_ADMIN_TOKEN,

// Razorpay (Step 6 — required for checkout, optional until keys are added)
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,

ZOHO_CLIENT_ID: process.env.ZOHO_CLIENT_ID,
ZOHO_CLIENT_SECRET: process.env.ZOHO_CLIENT_SECRET,
ZOHO_REFRESH_TOKEN: process.env.ZOHO_REFRESH_TOKEN,
ZOHO_ORGANIZATION_ID: process.env.ZOHO_ORGANIZATION_ID,
ZOHO_API_DOMAIN: process.env.ZOHO_API_DOMAIN || 'https://www.zohoapis.in',
ZOHO_ACCOUNTS_DOMAIN: process.env.ZOHO_ACCOUNTS_DOMAIN || 'https://accounts.zoho.in',
ZOHO_HOME_STATE: process.env.ZOHO_HOME_STATE || 'Telangana',

  // OpenAI (Step 8 — chatbot, optional until connected)
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
}
