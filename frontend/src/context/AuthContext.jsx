// src/context/AuthContext.jsx
"use client";
import React, { createContext, useEffect, useState, useCallback } from 'react'
import { authService } from '../services/authService'
import { getStoredUser, clearSession } from '../services/apiClient'
import { STORAGE_KEYS } from '../constants'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser())
  const [isLoading, setIsLoading] = useState(true)

  // On mount, verify the stored token is still valid and refresh user data.
  useEffect(() => {
    let cancelled = false

    async function bootstrap() {
      const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
      if (!token) {
        setIsLoading(false)
        return
      }
      try {
        const res = await authService.me()
        if (!cancelled) setUser(res?.data ?? null)
      } catch {
        if (!cancelled) {
          clearSession()
          setUser(null)
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    bootstrap()
    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(async (credentials) => {
    const res = await authService.login(credentials)
    setUser(res?.data?.user ?? null)
    return res
  }, [])

  const signup = useCallback(async (payload) => {
    const res = await authService.signup(payload)
    setUser(res?.data?.user ?? null)
    return res
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()
    setUser(null)
  }, [])

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    signup,
    logout,
    setUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
