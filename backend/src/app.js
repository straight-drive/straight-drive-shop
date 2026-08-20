import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { env } from './config/env.js'
import routes from './routes/index.js'
import uploadRoutes from './routes/upload.routes.js'
import { apiLimiter } from './middleware/rateLimiter.middleware.js'
import { notFoundHandler, errorHandler } from './middleware/error.middleware.js'

export function createApp() {
  const app = express()

  // Behind a reverse proxy (Railway/Render/Vercel) so req.ip / secure cookies work
  app.set('trust proxy', 1)

  app.use(helmet())
 app.use(
    cors({
      origin: env.CLIENT_URLS,
      credentials: true,
    })
  )
app.use(express.json({ limit: '2mb' }))
  app.use(express.urlencoded({ extended: true }))
  app.use(
  '/uploads',
  express.static('uploads', {
    setHeaders: (res) => {
      res.set('Cross-Origin-Resource-Policy', 'cross-origin')
    },
  })
)
  app.use(cookieParser(env.COOKIE_SECRET))
  app.use(morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined'))
  app.use(apiLimiter)

  app.get('/health', (req, res) => res.json({ success: true, status: 'ok', env: env.NODE_ENV }))

app.use('/api/upload', uploadRoutes)
  app.use('/api', routes)
  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
