import { Types } from 'mongoose'

export interface IUser {
  email: string
  _id: Types.ObjectId
  isActivated: boolean
}

export interface IUrl {
  name: string
  id: string | number
  expireDate: Date
}