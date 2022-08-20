import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import urlRoutes from './controllers/url.controller'
import authRoutes from './controllers/auth.controller'
import connectDB from './utils/connectDB'
import cookieParser from 'cookie-parser'
import errorMiddleware from './middleware/error.middleware'
import bodyParser from 'body-parser'

dotenv.config()
const PORT = process.env.PORT || 5000

const app = express()
connectDB()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cookieParser())
app.use(errorMiddleware)

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL
  })
)
app.use(express.urlencoded({ extended: false }))

app.use('/api/url', urlRoutes)
app.use('/api/auth', authRoutes)
app.listen(PORT, () => {
  console.log('App runs on port', PORT)
})
