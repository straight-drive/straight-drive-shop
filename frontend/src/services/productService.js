// src/services/productService.js
import { api } from './apiClient'

export const productService = {
  list(params = {}) {
    const query = new URLSearchParams(params).toString()
    return api.get(`/products${query ? `?${query}` : ''}`, { auth: false })
  },

  getBySlug(slug) {
    return api.get(`/products/${slug}`, { auth: false })
  },

  listCategories() {
    return api.get('/categories', { auth: false })
  },
}