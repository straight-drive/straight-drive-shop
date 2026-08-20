// src/constants/index.js

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

export const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 15000

// localStorage keys - centralized so we never hardcode a string in two places
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'sd_access_token',
  REFRESH_TOKEN: 'sd_refresh_token',
  USER: 'sd_user',
}

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
  DASHBOARD: '/dashboard',
}

export const FEATURE_FLAGS = {
  CHATBOT: import.meta.env.VITE_ENABLE_CHATBOT === 'true',
  ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
}