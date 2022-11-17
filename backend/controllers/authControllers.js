import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import { sendToken } from '../utils/sendToken.js'
import jwt from 'jsonwebtoken'
/**
 * @desc Sign up
 * @route POST /api/auth
 */
export const signUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) throw new Error('Insufficient details')

  if (await User.findOne({ email })) {
    res.status(400)
    throw new Error('User already exists')
  }

  const newUser = await User.create(req.body)
  sendToken(newUser.id, res, newUser)
})

/**
 * @desc Log in
 * @route POST /api/auth/login
 */
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) throw new Error(`Insufficient credentials`)

  const user = await User.findOne({ email }).select('+password')

  if (!user || password !== user.password) {
    res.status(401)
    throw new Error(`Invalid credentials`)
  }

  user.password = undefined
  sendToken(user.id, res, user)
})

/**
 * @desc currently logged in user
 * @route GET /api/auth/me
 */
export const me = asyncHandler(async (req, res, next) => {
  if (!req.cookies.token) return res.status(200).json({ success: false, message: 'Not logged' })
  try {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    res.status(200).json({ success: true, user })
  } catch (err) {
    err.success = false
    res.status(404).json(err)
  }
})

/**
 * @desc user logs out
 * @route PUT /api/auth/logout
 */
export const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie('token')
  res.status(200).json({
    success: true,
    message: 'Your are successfully logged out',
  })
})