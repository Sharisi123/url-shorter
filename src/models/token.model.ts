import { model, Schema, Types } from 'mongoose'

const tokenSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'user' },
  refreshToken: { type: String, required: true }
})

export default model('token', tokenSchema)
