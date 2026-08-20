import { prisma } from '../config/db.js'
import { ApiError } from '../utils/ApiError.js'
export async function listProducts(query = {}) {
  
  const { category, featured, search, page = 1, limit = 20 } = query
  const where = { isActive: true }

  if (category) where.category = { slug: category }
  if (featured === 'true') where.isFeatured = true
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ]
  }

  const skip = (Number(page) - 1) * Number(limit)

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true, media: true, videos: true, documents: true, specifications: true },
      orderBy: { createdAt: 'desc' },
      skip,
      take: Number(limit),
    }),
    prisma.product.count({ where }),
  ])

  return {
    items,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  }
}
export async function getProductBySlug(slug) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true, media: true, videos: true, documents: true, specifications: true, reviews: true },
  })
  if (!product) throw new ApiError(404, 'Product not found')
  return product
}

export async function getProductById(id) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true, media: true, specifications: true },
  })
  if (!product) throw new ApiError(404, 'Product not found')
  return product
}
export async function createProduct(data) {
  const existing = await prisma.product.findUnique({ where: { slug: data.slug } })
  if (existing) throw new ApiError(409, 'A product with this slug already exists')

  const category = await prisma.category.findUnique({ where: { id: data.categoryId } })
  if (!category) throw new ApiError(400, 'Category not found')

  const { images, videos, documents, specifications, ...productData } = data

  return prisma.product.create({
    data: {
      ...productData,
     media: {
        create: (images || []).map((img, idx) => ({
          url: img.url,
          filename: img.filename || null,
          isHero: idx === 0,
          sortOrder: idx,
        })),
      },
      videos: {
        create: (videos || []).map((v, idx) => ({
          videoUrl: v.url,
          title: v.title || null,
          filename: v.filename || null,
          sortOrder: idx,
        })),
      },
      documents: {
        create: (documents || []).map((d) => ({
          fileUrl: d.url,
          title: d.title,
        })),
      },
      specifications: {
        create: (specifications || []).map((spec, idx) => ({
          label: spec.label,
          value: spec.value,
          sortOrder: idx,
        })),
      },
    },
    include: { category: true, media: true, videos: true, documents: true, specifications: true },
  })
}

export async function updateProduct(id, data) {
  const existing = await prisma.product.findUnique({ where: { id } })
  if (!existing) throw new ApiError(404, 'Product not found')

  if (data.categoryId) {
    const category = await prisma.category.findUnique({ where: { id: data.categoryId } })
    if (!category) throw new ApiError(400, 'Category not found')
  }

 const { images, videos, documents, specifications, ...productData } = data

  const updateData = { ...productData }

 if (images !== undefined) {
    updateData.media = {
      deleteMany: {},
      create: images.map((img, idx) => ({
        url: img.url,
        filename: img.filename || null,
        isHero: idx === 0,
        sortOrder: idx,
      })),
    }
  }
  if (videos !== undefined) {
    updateData.videos = {
      deleteMany: {},
      create: videos.map((v, idx) => ({
        videoUrl: v.url,
        title: v.title || null,
        filename: v.filename || null,
        sortOrder: idx,
      })),
    }
  }
  if (documents !== undefined) {
    updateData.documents = {
      deleteMany: {},
      create: documents.map((d) => ({
        fileUrl: d.url,
        title: d.title,
      })),
    }
  }

  if (specifications !== undefined) {
    updateData.specifications = {
      deleteMany: {},
      create: specifications.map((spec, idx) => ({
        label: spec.label,
        value: spec.value,
        sortOrder: idx,
      })),
    }
  }

 return prisma.product.update({
    where: { id },
    data: updateData,
    include: { category: true, media: true, videos: true, documents: true, specifications: true },
  })
}

export async function deleteProduct(id) {
  const existing = await prisma.product.findUnique({ where: { id } })
  if (!existing) throw new ApiError(404, 'Product not found')
  await prisma.product.delete({ where: { id } })
}