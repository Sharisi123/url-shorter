import express from 'express'
import authMiddleware from '../middleware/auth.middleware'
import {
  getShortUrl,
  createShortUrl,
  getUserShortUrls
} from '../services/url.service'

const router = express.Router()

router.get('/', authMiddleware, getUserShortUrls)
router.get('/:shortUrl', authMiddleware, getShortUrl)
router.post('/create', authMiddleware, createShortUrl)

export default router
