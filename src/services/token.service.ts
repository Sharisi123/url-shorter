import jwt, { JwtPayload } from 'jsonwebtoken'
import { Types } from 'mongoose'
import tokenModel from '../models/token.model'
import { IUser } from '../types/user'

class TokenService {
  generateTokens(payload: IUser) {
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET as string,
      {
        expiresIn: '60m'
      }
    )
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET as string,
      {
        expiresIn: '180m'
      }
    )
    return {
      accessToken,
      refreshToken
    }
  }

  validateAccessToken(token: string) {
    console.log('process.env.JWT_ACCESS_SECRET', process.env.JWT_ACCESS_SECRET)

    try {
      const userData = jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET as string
      )
      return userData
    } catch (e) {
      return null
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET as string
      )
      return (userData as JwtPayload)._doc
    } catch (e) {
      return null
    }
  }

  async saveToken(userId: Types.ObjectId, refreshToken: string) {
    const tokenData = await tokenModel.findOne({ user: userId })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    const token = await tokenModel.create({ user: userId, refreshToken })
    return token
  }

  async removeToken(refreshToken: string) {
    return await tokenModel.deleteOne({ refreshToken })
  }

  async findToken(refreshToken: string) {
    return await tokenModel.findOne({ refreshToken })
  }
}

export default new TokenService()
