import { NextFunction, Request, Response } from 'express'
import tokenService from '../services/token.service'
import { IUser } from '../types/user'
import ApiError from '../exceptions/api-error'
import { JwtPayload } from 'jsonwebtoken'

declare global {
  namespace Express {
    interface Request {
      user: IUser
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError())
    }

    const accessToken = authorizationHeader.split(' ')[1]
    if (!accessToken) {
      return next(ApiError.UnauthorizedError())
    }

    const userData = tokenService.validateAccessToken(accessToken)

    if (!userData) {
      return next(ApiError.UnauthorizedError())
    }
    req.user = (userData as JwtPayload)._doc as IUser
    next()
  } catch (e) {
    return next(ApiError.UnauthorizedError())
  }
}

export default authMiddleware
