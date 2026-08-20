import { asyncHandler } from '../utils/asyncHandler.js'
import { ok, created } from '../utils/apiResponse.js'
import * as productService from '../services/product.service.js'

export const getProducts = asyncHandler(async (req, res) => {
  const result = await productService.listProducts(req.query)
  ok(res, result)
})

export const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await productService.getProductBySlug(req.params.slug)
  ok(res, product)
})

export const postProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(req.body)
  created(res, product, 'Product created successfully')
})

export const putProduct = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(req.params.id, req.body)
  ok(res, product, 200, 'Product updated successfully')
})

export const removeProduct = asyncHandler(async (req, res) => {
  await productService.deleteProduct(req.params.id)
  ok(res, null, 200, 'Product deleted successfully')
})