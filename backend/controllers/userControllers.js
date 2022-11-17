import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import { sendToken } from '../utils/sendToken.js'
import jwt from 'jsonwebtoken'

/**
 * @desc Get all users
 * @route GET /api/users
 */
export const getAllUsers = asyncHandler(async (req, res, next) => {
  const allUsers = await User.find({})
  res.status(200).json({
    success: true, 
    data: allUsers
  })
})