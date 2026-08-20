// src/services/authService.js
import { api, setSession, clearSession, getStoredUser } from './apiClient'

export const authService = {
  async signup({ name, company, email, password }) {
    const res = await api.post('/auth/signup', { name, company, email, password }, { auth: false })
    if (res?.data?.accessToken) {
      setSession({
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
        user: res.data.user,
      })
    }
    return res
  },

  async login({ email, password, rememberMe }) {
    const res = await api.post('/auth/login', { email, password, rememberMe }, { auth: false })
    if (res?.data?.accessToken) {
      setSession({
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
        user: res.data.user,
      })
    }
    return res
  },
async googleAuth(idToken) {
    const res = await api.post('/auth/google', { idToken }, { auth: false })
    if (res?.data?.accessToken) {
      setSession({
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
        user: res.data.user,
      })
    }
    return res
  },
  async logout() {
    try {
      await api.post('/auth/logout', {})
    } finally {
      clearSession()
    }
  },

  forgotPassword(email) {
    return api.post('/auth/forgot-password', { email }, { auth: false })
  },

 resetPassword({ email, otp, password }) {
    return api.post('/auth/reset-password', { email, otp, password }, { auth: false })
  },
  changePassword({ currentPassword, newPassword }) {
    return api.post('/auth/change-password', { currentPassword, newPassword })
  },

  verifyEmail(token) {
    return api.post('/auth/verify-email', { token }, { auth: false })
  },

  resendVerification(email) {
    return api.post('/auth/resend-verification', { email }, { auth: false })
  },

  me() {
    return api.get('/auth/me')
  },

  getStoredUser,
}
