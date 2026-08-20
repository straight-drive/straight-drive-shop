import { Router } from 'express'
import { validate } from '../middleware/validate.middleware.js'
import { protect, authorize, optionalAuth } from '../middleware/auth.middleware.js'
import { createContactSchema } from '../validators/contact.validator.js'
import {
  postContact,
  getContactMessages,
  putContactHandled,
  getMyMessages,
} from '../controllers/contact.controller.js'

const router = Router()

// Public - anyone can submit a contact message; if logged in, it's linked to their account
router.post('/', optionalAuth, validate(createContactSchema), postContact)

// Logged-in user - their own submitted messages
router.get('/my', protect, getMyMessages)

// Admin-only - view and manage all submissions
router.get('/', protect, authorize('ADMIN', 'SUPER_ADMIN'), getContactMessages)
router.put('/:id/handled', protect, authorize('ADMIN', 'SUPER_ADMIN'), putContactHandled)

export default router