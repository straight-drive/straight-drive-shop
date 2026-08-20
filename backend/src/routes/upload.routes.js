import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
import { protect, authorize } from '../middleware/auth.middleware.js'
import { ApiError } from '../utils/ApiError.js'
import { ok } from '../utils/apiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { env } from '../config/env.js'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueName = crypto.randomBytes(16).toString('hex') + path.extname(file.originalname)
    cb(null, uniqueName)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 40 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (allowed.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new ApiError(400, 'Only JPEG, PNG, WEBP, or GIF images are allowed'))
    }
  },
})

const router = Router()

router.post(
  '/image',
  protect,
  authorize('ADMIN', 'SUPER_ADMIN'),
  upload.single('image'),
  asyncHandler(async (req, res) => {
    if (!req.file) throw new ApiError(400, 'No file uploaded')
    const url = `${env.CLIENT_URL.includes('localhost') ? 'http://localhost:' + env.PORT : ''}/uploads/${req.file.filename}`
    ok(res, { url, filename: req.file.originalname }, 200, 'Image uploaded successfully')
  })
)

const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueName = crypto.randomBytes(16).toString('hex') + path.extname(file.originalname)
    cb(null, uniqueName)
  },
})

const uploadVideo = multer({
  storage: videoStorage,
  limits: { fileSize: 300 * 1024 * 1024 }, // 200MB max
  fileFilter: (req, file, cb) => {
const allowed = ['video/mp4', 'video/webm']
    if (allowed.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new ApiError(400, 'Only MP4, WEBM, or MOV videos are allowed'))
    }
  },
})

router.post(
  '/video',
  protect,
  authorize('ADMIN', 'SUPER_ADMIN'),
  uploadVideo.single('video'),
  asyncHandler(async (req, res) => {
    if (!req.file) throw new ApiError(400, 'No file uploaded')
    const url = `${env.CLIENT_URL.includes('localhost') ? 'http://localhost:' + env.PORT : ''}/uploads/${req.file.filename}`
    ok(res, { url, filename: req.file.originalname }, 200, 'Video uploaded successfully')
  })
)
const documentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueName = crypto.randomBytes(16).toString('hex') + path.extname(file.originalname)
    cb(null, uniqueName)
  },
})
const uploadDocument = multer({
  storage: documentStorage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true)
    } else {
      cb(new ApiError(400, 'Only PDF files are allowed'))
    }
  },
})
router.post(
  '/document',
  protect,
  authorize('ADMIN', 'SUPER_ADMIN'),
  uploadDocument.single('document'),
  asyncHandler(async (req, res) => {
    if (!req.file) throw new ApiError(400, 'No file uploaded')
    const url = `${env.CLIENT_URL.includes('localhost') ? 'http://localhost:' + env.PORT : ''}/uploads/${req.file.filename}`
    ok(res, { url, filename: req.file.originalname }, 200, 'Document uploaded successfully')
  })
)

export default router
