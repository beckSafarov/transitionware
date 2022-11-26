import asyncHandler from 'express-async-handler'
import User from '../models/userModel_t4.js'

/**
 * @desc Get all users
 * @route GET /t4/users
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
 * @route PUT /t4/users
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
 * @route DELETE /t4/users
 * @content Array [{_id}, {_id}, ...]
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

