// src/services/uploadService.js
import { API_BASE_URL, STORAGE_KEYS } from '../constants'
import { ApiError } from './apiClient'

function getAccessToken() {
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
}

async function uploadFile(endpoint, fieldName, file) {
  const formData = new FormData()
  formData.append(fieldName, file)

  const token = getAccessToken()

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData, // Don't set Content-Type manually — browser sets the multipart boundary itself
  })

  const body = await res.json().catch(() => null)

  if (!res.ok) {
    throw new ApiError(body?.message || 'Upload failed', res.status, body)
  }

  return body
}

export const uploadService = {
  uploadImage(file) {
    return uploadFile('/upload/image', 'image', file)
  },
  uploadVideo(file) {
    return uploadFile('/upload/video', 'video', file)
  },
  uploadDocument(file) {
    return uploadFile('/upload/document', 'document', file)
  },
}