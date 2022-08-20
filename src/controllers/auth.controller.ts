import express from 'express'
import { body } from 'express-validator'
import authMiddleware from '../middleware/auth.middleware'
import userService from '../services/auth.service'

const router = express.Router()

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  userService.registration
)
router.post('/login', userService.login)
router.post('/logout', userService.logout)
router.get('/activate/:link', userService.activate)
router.get('/refresh', userService.refresh)
router.get('/users', authMiddleware, userService.getUsers)

export default router
