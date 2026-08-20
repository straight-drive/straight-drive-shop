import { Router } from 'express'
import { validate } from '../middleware/validate.middleware.js'
import { protect, authorize } from '../middleware/auth.middleware.js'
import { createCategorySchema, updateCategorySchema } from '../validators/category.validator.js'
import {
  getCategories,
  getCategory,
  postCategory,
  putCategory,
  removeCategory,
} from '../controllers/category.controller.js'

const router = Router()

// Public — anyone can browse categories
router.get('/', getCategories)
router.get('/:id', getCategory)

// Admin-only — create/update/delete
router.post('/', protect, authorize('ADMIN', 'SUPER_ADMIN'), validate(createCategorySchema), postCategory)
router.put('/:id', protect, authorize('ADMIN', 'SUPER_ADMIN'), validate(updateCategorySchema), putCategory)
router.delete('/:id', protect, authorize('ADMIN', 'SUPER_ADMIN'), removeCategory)

export default router