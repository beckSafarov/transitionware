import asyncHandler from 'express-async-handler'
import Message from '../models/messageModel_t6.js'

/**
 * @desc Get all messages
 * @route GET /t6/messages/all?user1=<id>&user2=<id>
 */
export const getAllMessages = asyncHandler(async (req, res) => {
  const {user1, user2} = req.query
  const allMessages = await Message.find({
    sender: { $in: [user1, user2] },
    recipient: { $in: [user2, user1] },
  }).sort({date: 1})
  res.status(200).json({
    success: true,
    data: allMessages
  })
})

/**
 * @desc Send a message
 * @route POST /t6/messages
 * @content {sender, recipient, title, body}
 */
export const sendMessage = asyncHandler(async (req, res) => {
  const newMessage = await Message.create(req.body)
  res.status(200).json({
    success: true,
    data: newMessage,
  });
})
/**
 * @desc Check for received messages
 * @route GET /t6/messages/inbox?recipient=<id>
 */
export const checkInbox = asyncHandler(async (req, res) => {
  const inbox = await Message.find(req.query).sort({date: 1})
  res.status(200).json({
    success: true,
    data: inbox
  })
})
