import { prisma } from '../config/db.js'
import { ApiError } from '../utils/ApiError.js'

export async function createReview(userId, data) {
  const product = await prisma.product.findUnique({ where: { id: data.productId } })
  if (!product) throw new ApiError(404, 'Product not found')

  const existing = await prisma.review.findFirst({
    where: { productId: data.productId, userId },
  })
  if (existing) throw new ApiError(409, 'You have already reviewed this product')

  return prisma.review.create({
    data: {
      productId: data.productId,
      userId,
      rating: data.rating,
      title: data.title,
      comment: data.comment,
      isApproved: true,
    },
  })
}

export async function listProductReviews(productId) {
  return prisma.review.findMany({
    where: { productId, isApproved: true },
    include: { user: { select: { name: true } } },
    orderBy: { createdAt: 'desc' },
  })
}