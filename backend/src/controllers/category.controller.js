import { asyncHandler } from '../utils/asyncHandler.js'
import { ok, created } from '../utils/apiResponse.js'
import * as categoryService from '../services/category.service.js'

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.listCategories()
  ok(res, categories)
})

export const getCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.id)
  ok(res, category)
})

export const postCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.createCategory(req.body)
  created(res, category, 'Category created successfully')
})

export const putCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.updateCategory(req.params.id, req.body)
  ok(res, category, 200, 'Category updated successfully')
})

export const removeCategory = asyncHandler(async (req, res) => {
  await categoryService.deleteCategory(req.params.id)
  ok(res, null, 200, 'Category deleted successfully')
})