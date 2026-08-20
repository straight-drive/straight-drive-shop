import { Router } from 'express'
import authRoutes from './auth.routes.js'
import { stubRouter } from './_stub.js'
import categoryRoutes from './category.routes.js'
import productRoutes from './product.routes.js'
import cartRoutes from './cart.routes.js'
import orderRoutes from './order.routes.js'
import checkoutAttemptRoutes from './checkoutAttempt.routes.js'
import adminRoutes from './admin.routes.js'
import contactRoutes from './contact.routes.js'
import reviewRoutes from './review.routes.js'

const router = Router()

// Live in this phase
router.use('/auth', authRoutes)

// Scaffolded, built in later phases (Step 5/6/9/10/11/14)
// Each of these already has a Prisma model (see prisma/schema.prisma).
// Wiring real controllers here is Phase D/E of the roadmap.
router.use('/products', productRoutes)
router.use('/categories', categoryRoutes)
router.use('/cart', cartRoutes)
router.use('/users', stubRouter('Users', ['/', '/:id']))
router.use('/orders', orderRoutes)
router.use('/checkout-attempts', checkoutAttemptRoutes)
router.use('/wishlist', stubRouter('Wishlist', ['/', '/:id']))
router.use('/reviews', reviewRoutes)
router.use('/contact', contactRoutes)
router.use('/newsletter', stubRouter('Newsletter', ['/subscribe']))
router.use('/support', stubRouter('Support', ['/', '/:id']))
router.use('/bookings', stubRouter('Book Demo', ['/']))
router.use('/blog', stubRouter('Blog', ['/', '/:slug']))
router.use('/chat', stubRouter('Chatbot', ['/message']))
router.use('/admin', adminRoutes)

export default router