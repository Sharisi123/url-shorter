import mongoose from 'mongoose'
import generateId from '../utils/generateId'

const shortUrlSchema = new mongoose.Schema(
  {
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

export default mongoose.model('UrlShorter', shortUrlSchema)
