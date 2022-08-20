import generateId from '../utils/generateId'
import { model, Schema, Types } from 'mongoose'

const shortUrlSchema = new Schema(
  {
    user: { required: true, type: Types.ObjectId, ref: 'user' },
    fullUrl: {
      type: String,
      required: true
    },
    shortUrl: {
      type: String,
      required: true,
      default: generateId
    }
  },
  {
    timestamps: true
  }
)

export default model('url', shortUrlSchema)
