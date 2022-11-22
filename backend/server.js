import path from 'path'
import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
const app = express()
dotenv.config()
app.use(express.json())
app.use(cookieParser())
connectDB()
const nodeEnv = process.env.NODE_ENV

if (nodeEnv === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
}

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)



const PORT = process.env.PORT || 5000
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${'development'} mode on port ${PORT}`
  )
)