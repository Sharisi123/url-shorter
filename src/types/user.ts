import { Types } from 'mongoose'

export interface IUser {
  email: string
  _id: Types.ObjectId
  isActivated: boolean
}
