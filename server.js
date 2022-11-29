import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes_t4.js'
import authRoutes_t6 from './routes/authRoutes_t6.js'
import messageRoutes_t6 from './routes/messageRoutes_t6.js'
import userRoutes from './routes/userRoutes_t4.js'
import jwt from 'jsonwebtoken'
console.log(jwt)
import cors from 'cors'
const nodeEnv = process.env.NODE_ENV
const app = express()
app.use(cors())
dotenv.config()
app.use(express.json())
app.use(cookieParser())
connectDB()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.use('/t4/auth', authRoutes)
app.use('/t4/users', userRoutes)
app.use('/t6/auth', authRoutes_t6)
app.use('/t6/messages', messageRoutes_t6)
app.use('/t6/users', authRoutes_t6)

app.use('/', (req, res)=>{
  res.send('<h1>API is running</h1>')
})

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(
    `Server running in ${nodeEnv} mode on port ${PORT}`
  )
)