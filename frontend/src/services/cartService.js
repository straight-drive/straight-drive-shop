// src/services/cartService.js
import { api } from './apiClient'

export const cartService = {
  getCart() {
    return api.get('/cart')
  },

  addItem(productId, quantity = 1) {
    return api.post('/cart/items', { productId, quantity })
  },

  updateItem(itemId, quantity) {
    return api.put(`/cart/items/${itemId}`, { quantity })
  },

  removeItem(itemId) {
    return api.delete(`/cart/items/${itemId}`)
  },

  clearCart() {
    return api.delete('/cart')
  },
}