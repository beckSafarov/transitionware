import asyncHandler from 'express-async-handler'
import User from '../models/userModel_t6.js'
import { sendToken } from '../utils/sendToken.js'
import jwt from 'jsonwebtoken'

/**
 * @desc Sign up
 * @route POST /t6/auth
 */
export const signUser = asyncHandler(async (req, res) => {
  const { name } = req.body
  if (!name) throw new Error('Insufficient details')

  if (await User.findOne({ name })) {
    res.status(400)
    throw new Error('User with such name already exists. Please log in')
  }

  const newUser = await User.create(req.body)
  sendToken(newUser.id, res, newUser)
})

/**
 * @desc Log in
 * @route POST /t6/auth/login
 */
export const authUser = asyncHandler(async (req, res) => {
  const { name } = req.body
  if (!name) throw new Error(`Insufficient credentials`)
  const user = await User.findOne({ name })
  if (!user) {
    res.status(401)
    throw new Error(`Such user does not exist. Please sign up first`)
  }
  sendToken(user.id, res, user)
})

/**
 * @desc currently logged in user
 * @route GET /t6/auth/me
 */
export const me = asyncHandler(async (req, res, next) => {
  if (!req.cookies.token) return res.status(200).json({ success: false, message: 'Not logged' })
  try {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    res.status(200).json({ success: true, data: user })
  } catch (err) {
    err.success = false
    res.status(404).json(err)
  }
})

/**
 * @desc user logs out
 * @route PUT /t6/auth/logout
 */
export const logout = asyncHandler(async (_, res) => {
  res.clearCookie('token')
  res.status(200).json({
    success: true,
    message: 'Your are successfully logged out',
  })
})