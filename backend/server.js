import path from 'path'
import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'
import { signUser } from './controllers/authControllers.js'
import authRoutes from './routes/authRoutes.js'
const app = express()
dotenv.config()
app.use(express.json())
app.use(cookieParser())
connectDB()
// const nodeEnv = process.env.NODE_ENV
app.get('/', (req, res) => {
  //this sends content for displaying, however, you would want a file here
  res.send('<h1>Hello World</h1>')
})
app.use('/api/users', authRoutes)



const PORT = process.env.PORT || 5000
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${'development'} mode on port ${PORT}`
  )
)