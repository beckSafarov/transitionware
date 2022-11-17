import path from 'path'
import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
const app = express()
dotenv.config()
connectDB()
// const nodeEnv = process.env.NODE_ENV
app.get('/', (req, res) => {
  //this sends content for displaying, however, you would want a file here
  res.send('<h1>Hello World</h1>')
})

const PORT = process.env.PORT || 5000
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${'development'} mode on port ${PORT}`
  )
)