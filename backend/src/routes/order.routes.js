import { Router } from 'express'
import { validate } from '../middleware/validate.middleware.js'
import { protect, authorize } from '../middleware/auth.middleware.js'
import { createOrderSchema, updateOrderStatusSchema } from '../validators/order.validator.js'
import { verifyPaymentSchema } from '../validators/order.validator.js'
import {
  postOrder,
  getMyOrders,
  getMyOrder,
  getAllOrders,
  putOrderStatus,
  postInitiatePayment,
  postConfirmPayment,
  getSuggestedSerials,
  putOrderItemSerials,
  postDispatchOrder,
} from '../controllers/order.controller.js'

const router = Router()

router.use(protect) // every order route requires login

// Regular users — their own orders only
router.post('/', validate(createOrderSchema), postOrder)
router.get('/my', getMyOrders)
router.get('/my/:id', getMyOrder)
router.post('/:id/pay', postInitiatePayment)
router.post('/verify-payment', validate(verifyPaymentSchema), postConfirmPayment)

// Admin-only see and manage all orders
router.get('/', authorize('ADMIN', 'SUPER_ADMIN'), getAllOrders)
router.put('/:id/status', authorize('ADMIN', 'SUPER_ADMIN'), validate(updateOrderStatusSchema), putOrderStatus)
router.get('/serials/suggest', authorize('ADMIN', 'SUPER_ADMIN'), getSuggestedSerials)
router.put('/items/:itemId/serials', authorize('ADMIN', 'SUPER_ADMIN'), putOrderItemSerials)
router.post('/:id/dispatch', authorize('ADMIN', 'SUPER_ADMIN'), postDispatchOrder)

export default router
