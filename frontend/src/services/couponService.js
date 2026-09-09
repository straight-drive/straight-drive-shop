import { api } from './apiClient'

export const couponService = {
  list() {
    return api.get('/coupons')
  },
  create(data) {
    return api.post('/coupons', data)
  },
  toggleActive(id) {
    return api.patch(`/coupons/${id}/active`, {})
  },
  validate(code) {
    return api.post('/coupons/validate', { code })
  },
}