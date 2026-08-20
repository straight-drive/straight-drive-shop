import { Router } from 'express'
import { validate } from '../middleware/validate.middleware.js'
import { protect, authorize } from '../middleware/auth.middleware.js'
import { createProductSchema, updateProductSchema } from '../validators/product.validator.js'
import {
  getProducts,
  getProductBySlug,
  postProduct,
  putProduct,
  removeProduct,
} from '../controllers/product.controller.js'

const router = Router()

// Public — anyone can browse products
router.get('/', getProducts)
router.get('/:slug', getProductBySlug)

// Admin-only — create/update/delete
router.post('/', protect, authorize('ADMIN', 'SUPER_ADMIN'), validate(createProductSchema), postProduct)
router.put('/:id', protect, authorize('ADMIN', 'SUPER_ADMIN'), validate(updateProductSchema), putProduct)
router.delete('/:id', protect, authorize('ADMIN', 'SUPER_ADMIN'), removeProduct)

export default router