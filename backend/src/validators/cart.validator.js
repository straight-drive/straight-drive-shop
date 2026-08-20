import { z } from 'zod'

const addItemBody = z.object({
  productId: z.string().min(1, 'Product is required'),
  quantity: z.number().int().positive('Quantity must be at least 1').default(1),
})

const updateItemBody = z.object({
  quantity: z.number().int().min(0, 'Quantity cannot be negative'),
})

export const addItemSchema = z.object({
  body: addItemBody,
})

export const updateItemSchema = z.object({
  body: updateItemBody,
})