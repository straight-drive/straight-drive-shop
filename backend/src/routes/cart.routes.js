import { Router } from 'express'
import { validate } from '../middleware/validate.middleware.js'
import { protect } from '../middleware/auth.middleware.js'
import { addItemSchema, updateItemSchema } from '../validators/cart.validator.js'
import {
  getMyCart,
  postCartItem,
  putCartItem,
  removeCartItem,
  clearMyCart,
} from '../controllers/cart.controller.js'

const router = Router()

router.use(protect)

router.get('/', getMyCart)
router.post('/items', validate(addItemSchema), postCartItem)
router.put('/items/:itemId', validate(updateItemSchema), putCartItem)
router.delete('/items/:itemId', removeCartItem)
router.delete('/', clearMyCart)

export default router