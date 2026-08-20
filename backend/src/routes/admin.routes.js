import { Router } from 'express'
import { protect, authorize } from '../middleware/auth.middleware.js'
import { getStats, getRecentMessages, getRecentAlerts } from '../controllers/admin.controller.js'

const router = Router()
router.use(protect, authorize('ADMIN', 'SUPER_ADMIN'))

router.get('/stats', getStats)
router.get('/recent-messages', getRecentMessages)
router.get('/recent-alerts', getRecentAlerts)

export default router