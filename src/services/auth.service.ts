import ApiError from '../exceptions/api-error'
import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import userModel from '../models/user.model'
import bcrypt from 'bcrypt'
import generateId from '../utils/generateId'
import tokenService from './token.service'
import mailService from './mail.service'
import { IUser } from '../types/user'

class UserService {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req) as any

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error, something were wrong', errors.array()))
      }

      const { email, password } = req.body

      const candidate = await userModel.findOne({ email })
      if (candidate) {
        throw ApiError.BadRequest(
          `User with email address ${email} already exists`
        )
      }
      const hashPassword = await bcrypt.hash(password, 7)
      const activationLink = generateId()

      const user = await userModel.create({
        email,
        password: hashPassword,
        activationLink
      })

      console.log('created user', user)

      await mailService.sendActivationMail(
        email,
        `${process.env.API_URL}/api/auth/activate/${activationLink}`
      )

      const tokens = tokenService.generateTokens({ ...user })

      console.log('tokens', tokens)

      await tokenService.saveToken(user._id, tokens.refreshToken)

      res.cookie('refreshToken', tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })
      return res.json({ ...tokens, user })
    } catch (e) {
      next(e)
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
      const user = await userModel.findOne({ email })
      if (!user) {
        throw ApiError.BadRequest('User with this email was not found, please try again')
      }
      const isPassEquals = await bcrypt.compare(password, user.password)
      if (!isPassEquals) {
        throw ApiError.BadRequest('Invalid password, please try again')
      }
      const tokens = tokenService.generateTokens({ ...user })

      await tokenService.saveToken(user._id, tokens.refreshToken)
      res.cookie('refreshToken', tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })
      return res.json({ ...tokens, user: user })
    } catch (e) {
      next(e)
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies
      const token = await tokenService.removeToken(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(token)
    } catch (e) {
      next(e)
    }
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const activationLink = req.params.link
      const user = await userModel.findOne({ activationLink })
      if (!user) {
        throw ApiError.BadRequest('Incorrect activation link')
      }
      user.isActivated = true
      await user.save()
      return process.env.CLIENT_URL && res.redirect(process.env.CLIENT_URL)
    } catch (e) {
      next(e)
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    console.log('here')

    try {
      const { refreshToken } = req.cookies

      if (!refreshToken) {
        throw ApiError.UnauthorizedError()
      }
      const userData = tokenService.validateRefreshToken(refreshToken) as IUser
      console.log('userData', userData)

      const tokenFromDb = await tokenService.findToken(refreshToken)
      if (!userData || !tokenFromDb) {
        throw ApiError.UnauthorizedError()
      }
      console.log('tokenFromDb', tokenFromDb)

      const user = await userModel.findById(userData._id)
      console.log('user', user)

      if (user) {
        const tokens = tokenService.generateTokens({ ...user })
        console.log('tokens', tokens)

        await tokenService.saveToken(user._id, tokens.refreshToken)

        res.cookie('refreshToken', tokens.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true
        })
        return res.json(userData)
      } else {
        return res.status(404).send()
      }
    } catch (e) {
      next(e)
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userModel.find()
      return res.json(users)
    } catch (e) {
      next(e)
    }
  }
}

export default new UserService()
