import { z } from 'zod'

const productBody = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens only'),
  sku: z.string().optional(),
  shortDescription: z.string().optional(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().positive('Price must be greater than 0'),
  compareAtPrice: z.number().positive().optional().nullable(),
  currency: z.string().default('INR'),
  stock: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
 categoryId: z.string().min(1, 'Category is required'),
  tier: z.enum(['Entry', 'Swing & Spin', 'Interactive', 'Professional & Flagship']).optional().nullable(),
  heroImageUrl: z.string().url().optional().or(z.literal('')),
  features: z.array(z.string()).optional().default([]),
  applications: z.array(z.string()).optional().default([]),
  tags: z.array(z.string()).optional().default([]),
  images: z
    .array(
      z.object({
        url: z.string(),
        filename: z.string().optional(),
      })
    )
    .optional()
    .default([]),
  videos: z
    .array(
      z.object({
        url: z.string(),
        title: z.string().optional(),
        filename: z.string().optional(),
      })
    )
    .optional()
    .default([]),
  documents: z
    .array(
      z.object({
        url: z.string(),
        title: z.string().min(1, 'Document title is required'),
      })
    )
    .optional()
    .default([]),
  specifications: z
    .array(z.object({ label: z.string().min(1), value: z.string().min(1) }))
    .optional()
    .default([]),
})

export const createProductSchema = z.object({
  body: productBody,
})

export const updateProductSchema = z.object({
  body: productBody.partial(),
})