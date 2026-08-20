import { api } from './apiClient'

export const contactService = {
  submit(data) {
    return api.post('/contact', data)
  },
  myMessages() {
    return api.get('/contact/my')
  },
  listAll() {
    return api.get('/contact')
  },
  toggleHandled(id) {
    return api.put(`/contact/${id}/handled`, {})
  },
}