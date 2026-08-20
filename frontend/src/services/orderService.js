// src/services/orderService.js
import { api } from './apiClient'

export const orderService = {
  create(orderData) {
    return api.post('/orders', orderData)
  },

  listMine() {
    return api.get('/orders/my')
  },

  getById(id) {
    return api.get(`/orders/my/${id}`)
  },

  initiatePayment(orderId) {
    return api.post(`/orders/${orderId}/pay`, {})
  },

  confirmPayment(paymentData) {
    return api.post('/orders/verify-payment', paymentData)
  },
  listAll() {
    return api.get('/orders')
  },
  suggestSerials(productId, count, orderItemId) {
    return api.get(`/orders/serials/suggest?productId=${productId}&count=${count}&orderItemId=${orderItemId}`)
  },
  saveSerials(itemId, serials) {
    return api.put(`/orders/items/${itemId}/serials`, { serials })
  },
  dispatch(orderId) {
    return api.post(`/orders/${orderId}/dispatch`, {})
  },
}