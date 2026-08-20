import { prisma } from '../config/db.js'
import { ApiError } from '../utils/ApiError.js'

export async function listCategories() {
  return prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: { children: true },
  })
}

export async function getCategoryById(id) {
  const category = await prisma.category.findUnique({
    where: { id },
    include: { children: true, products: true },
  })
  if (!category) throw new ApiError(404, 'Category not found')
  return category
}

export async function createCategory(data) {
  const existing = await prisma.category.findUnique({ where: { slug: data.slug } })
  if (existing) throw new ApiError(409, 'A category with this slug already exists')
  return prisma.category.create({ data })
}

export async function updateCategory(id, data) {
  const existing = await prisma.category.findUnique({ where: { id } })
  if (!existing) throw new ApiError(404, 'Category not found')
  return prisma.category.update({ where: { id }, data })
}

export async function deleteCategory(id) {
  const existing = await prisma.category.findUnique({ where: { id } })
  if (!existing) throw new ApiError(404, 'Category not found')
  await prisma.category.delete({ where: { id } })
}