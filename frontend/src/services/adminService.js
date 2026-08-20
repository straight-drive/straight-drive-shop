// src/services/adminService.js
import { api } from './apiClient'
import { API_BASE_URL, STORAGE_KEYS } from '../constants'
export const adminService = {
  // Products
  createProduct(data) {
    return api.post('/products', data)
  },
  updateProduct(id, data) {
    return api.put(`/products/${id}`, data)
  },
  deleteProduct(id) {
    return api.delete(`/products/${id}`)
  },

  // Categories
  listCategories() {
    return api.get('/categories')
  },

// Contact messages
  listContactMessages() {
    return api.get('/contact')
  },
  markMessageHandled(id) {
    return api.put(`/contact/${id}/handled`, {})
  },

  // Image upload (multipart, not JSON - needs its own fetch call)
  async uploadImage(file) {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
    const formData = new FormData()
    formData.append('image', file)

    const res = await fetch(`${API_BASE_URL}/uploads/image`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
    const data = await res.json().catch(() => null)
    if (!res.ok) {
      throw { data, message: data?.message || 'Upload failed' }
    }
    return data
  },

  // Orders
  listAllOrders() {
    return api.get('/orders')
  },
 updateOrderStatus(orderId, status) {
    return api.put(`/orders/${orderId}/status`, { status })
  },
  // Dashboard stats
  getStats() {
    return api.get('/admin/stats')
  },
  getRecentMessages() {
    return api.get('/admin/recent-messages')
  },
  getRecentAlerts() {
    return api.get('/admin/recent-alerts')
  },
}