import mongoose from 'mongoose'

const connectDB = async () => {
  const dbString = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.9btshiw.mongodb.net/?retryWrites=true&w=majority`

  mongoose.connect(dbString, err => {
    if (err) {
      console.error('DB connect error', err)
      return
    }
    console.log('DB connected')
  })
}
export default connectDB
