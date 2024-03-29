import { model, Schema } from 'mongoose'

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, required: true, default: false },
  activationLink: { type: String }
})

export default model('user', userSchema)
