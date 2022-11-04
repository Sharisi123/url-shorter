import mongoose from 'mongoose'

const connectDB = async () => {
  const dbString = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.9btshiw.mongodb.net/?retryWrites=true&w=majority`

  mongoose.connect(dbString, (err: any) => {
    if (err) return console.error('DB connect error', err)
      
    console.log('DB connected')
  })
}
export default connectDB
