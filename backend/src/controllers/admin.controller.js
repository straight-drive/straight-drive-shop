import { asyncHandler } from '../utils/asyncHandler.js'
import { ok } from '../utils/apiResponse.js'
import * as adminService from '../services/admin.service.js'

export const getStats = asyncHandler(async (req, res) => {
  const stats = await adminService.getDashboardStats()
  ok(res, stats)
})

export const getRecentMessages = asyncHandler(async (req, res) => {
  const messages = await adminService.getRecentMessages()
  ok(res, messages)
})

export const getRecentAlerts = asyncHandler(async (req, res) => {
  const alerts = await adminService.getRecentAlerts()
  ok(res, alerts)
})