// src/services/reviewService.js
import { api } from './apiClient'

export const reviewService = {
  listForProduct(productId) {
    return api.get(`/reviews?productId=${productId}`, { auth: false })
  },
  submit(data) {
    return api.post('/reviews', data)
  },
}