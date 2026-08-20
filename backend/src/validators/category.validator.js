import { z } from 'zod'

const categoryBody = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens only'),
  description: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
  parentId: z.string().optional().nullable(),
})

export const createCategorySchema = z.object({
  body: categoryBody,
})

export const updateCategorySchema = z.object({
  body: categoryBody.partial(),
})