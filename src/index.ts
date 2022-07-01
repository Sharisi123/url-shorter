import * as dotenv from 'dotenv'
import express from 'express'
import path from 'path'

import renderRoutes from './routes'
import urlRoutes from './routes/url'
import connectDB from './utils/connectDB'

dotenv.config()
const PORT = process.env.PORT || 5000

const app = express()
connectDB()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.set('views', path.join(__filename, '../../src/views'))

app.use('/', renderRoutes)
app.use('/api/url', urlRoutes)

app.listen(PORT, () => {
  console.log('App runs on port', PORT)
})
