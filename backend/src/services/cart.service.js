import { prisma } from '../config/db.js'
import { ApiError } from '../utils/ApiError.js'

async function getOrCreateCart(userId) {
  let cart = await prisma.cart.findUnique({ where: { userId } })
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId } })
  }
  return cart
}

export async function getCart(userId) {
  const cart = await getOrCreateCart(userId)
  return prisma.cart.findUnique({
    where: { id: cart.id },
include: { items: { include: { product: { include: { category: true } } } } },
  })
}

export async function addItem(userId, productId, quantity) {
  const product = await prisma.product.findUnique({ where: { id: productId } })
  if (!product) throw new ApiError(404, 'Product not found')
  if (!product.isActive) throw new ApiError(400, 'This product is not currently available')

  const cart = await getOrCreateCart(userId)

  const existingItem = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId } },
  })

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    })
  } else {
    await prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity },
    })
  }

  return getCart(userId)
}

export async function updateItemQuantity(userId, itemId, quantity) {
  const cart = await getOrCreateCart(userId)
  const item = await prisma.cartItem.findFirst({ where: { id: itemId, cartId: cart.id } })
  if (!item) throw new ApiError(404, 'Cart item not found')

  if (quantity === 0) {
    await prisma.cartItem.delete({ where: { id: itemId } })
  } else {
    await prisma.cartItem.update({ where: { id: itemId }, data: { quantity } })
  }

  return getCart(userId)
}

export async function removeItem(userId, itemId) {
  const cart = await getOrCreateCart(userId)
  const item = await prisma.cartItem.findFirst({ where: { id: itemId, cartId: cart.id } })
  if (!item) throw new ApiError(404, 'Cart item not found')

  await prisma.cartItem.delete({ where: { id: itemId } })
  return getCart(userId)
}

export async function clearCart(userId) {
  const cart = await getOrCreateCart(userId)
  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } })
  return getCart(userId)
}