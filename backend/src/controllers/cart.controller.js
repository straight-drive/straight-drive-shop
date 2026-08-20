import { asyncHandler } from '../utils/asyncHandler.js'
import { ok } from '../utils/apiResponse.js'
import * as cartService from '../services/cart.service.js'

export const getMyCart = asyncHandler(async (req, res) => {
  const cart = await cartService.getCart(req.user.id)
  ok(res, cart)
})

export const postCartItem = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body
  const cart = await cartService.addItem(req.user.id, productId, quantity)
  ok(res, cart, 200, 'Item added to cart')
})

export const putCartItem = asyncHandler(async (req, res) => {
  const cart = await cartService.updateItemQuantity(req.user.id, req.params.itemId, req.body.quantity)
  ok(res, cart, 200, 'Cart updated')
})

export const removeCartItem = asyncHandler(async (req, res) => {
  const cart = await cartService.removeItem(req.user.id, req.params.itemId)
  ok(res, cart, 200, 'Item removed from cart')
})

export const clearMyCart = asyncHandler(async (req, res) => {
  const cart = await cartService.clearCart(req.user.id)
  ok(res, cart, 200, 'Cart cleared')
})