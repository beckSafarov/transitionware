import asyncHandler from 'express-async-handler'
import User from '../models/userModel_t6.js'
/**
 * @desc Get all users
 * @route GET /t6/users
 */
export const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await User.find({})
  res.status(200).json({
    success: true,
    data: allUsers
  })
})