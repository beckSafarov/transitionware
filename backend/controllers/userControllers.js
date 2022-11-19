import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import { sendToken } from '../utils/sendToken.js'
import jwt from 'jsonwebtoken'

/**
 * @desc Get all users
 * @route GET /api/users
 */
export const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await User.find({})
  res.status(200).json({
    success: true, 
    data: allUsers
  })
})
/**
 * @desc Toggle block status of users
 * @route PUT /api/users
 * @content Array [id1, id2, ...]
 */
export const toggleBlockUsers = asyncHandler(async (req, res) => {
  const { users: ids } = req.body
  const resData = []
  for (let id of ids) {
    const user = await User.findById(id);
    user.toggleBlock()
    resData.push(user)
    await user.save()
  }
  res.status(200).json({
    success: true,
    data: resData,
  });
})
/**
 * @desc delete users
 * @route DELETE /api/users
 * @content Array [id1, id2, ...]
 */
export const deleteUsers = asyncHandler(async (req, res) => {
  const { users: ids } = req.body
  for (let id of ids) {
    await User.findByIdAndDelete(id);
  }
  res.status(200).json({
    success: true,
    data: null
  });
})

