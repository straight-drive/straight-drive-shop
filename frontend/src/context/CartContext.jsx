// src/context/CartContext.jsx
"use client";
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { cartService } from '../services/cartService'
import { useAuth } from '../hooks/useAuth'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0)
  const { isAuthenticated } = useAuth()

  const refreshCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCartCount(0)
      return
    }
    try {
      const res = await cartService.getCart()
      const count = (res?.data?.items || []).reduce((sum, item) => sum + item.quantity, 0)
      setCartCount(count)
    } catch {
      // Silently ignore
    }
  }, [isAuthenticated])

  useEffect(() => {
    refreshCart()
  }, [refreshCart])

  return (
    <CartContext.Provider value={{ cartCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used within a <CartProvider>')
  }
  return ctx
}