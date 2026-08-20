import { api } from './apiClient'

export const checkoutAttemptService = {
  create(data) {
    return api.post('/checkout-attempts', data)
  },
  initiatePayment(attemptId) {
    return api.post(`/checkout-attempts/${attemptId}/pay`, {})
  },
  confirmPayment(paymentData) {
    return api.post('/checkout-attempts/verify-payment', paymentData)
  },
  listAbandoned() {
    return api.get('/checkout-attempts/abandoned')
  },
  toggleHandled(id) {
    return api.put(`/checkout-attempts/${id}/handled`, {})
  },
}