import { asyncHandler } from '../utils/asyncHandler.js'
import { ok, created } from '../utils/apiResponse.js'
import * as orderService from '../services/order.service.js'
import * as serialService from '../services/serial.service.js'

export const postOrder = asyncHandler(async (req, res) => {
  const order = await orderService.createOrderFromCart(req.user.id, req.body)
  created(res, order, 'Order placed successfully')
})

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.listMyOrders(req.user.id)
  ok(res, orders)
})

export const getMyOrder = asyncHandler(async (req, res) => {
  const order = await orderService.getMyOrderById(req.user.id, req.params.id)
  ok(res, order)
})

// Admin-only
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.listAllOrders()
  ok(res, orders)
})

export const putOrderStatus = asyncHandler(async (req, res) => {
  const order = await orderService.updateOrderStatus(req.params.id, req.body.status)
  ok(res, order, 200, 'Order status updated')
})

export const postInitiatePayment = asyncHandler(async (req, res) => {
  const paymentData = await orderService.initiatePayment(req.user.id, req.params.id)
  ok(res, paymentData)
})

export const postConfirmPayment = asyncHandler(async (req, res) => {
  const order = await orderService.confirmPayment(req.user.id, req.body)
  ok(res, order, 200, 'Payment confirmed successfully')
})
// Admin-only
export const getSuggestedSerials = asyncHandler(async (req, res) => {
  const { productId, count, orderItemId } = req.query
  const serials = await serialService.suggestSerials(productId, Number(count), orderItemId)
  ok(res, serials)
})

export const putOrderItemSerials = asyncHandler(async (req, res) => {
  const serials = await serialService.assignSerials(req.params.itemId, req.body.serials)
  ok(res, serials, 200, 'Serial numbers saved')
})

export const postDispatchOrder = asyncHandler(async (req, res) => {
  const order = await orderService.dispatchOrder(req.params.id)
  ok(res, order, 200, 'Order dispatched and invoice generated')
})