import mongoose from 'mongoose'

const messageSchema_t6 = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: "User_t6",
      required: true
    },
    recipient: {
      type: mongoose.Schema.ObjectId,
      ref: "User_t6",
      required: true
    },
    title: {
      type: String, 
      required: true
    },
    body: {
      type: String, 
      required: true
    }
  }
)

const Message_t6 = mongoose.model('Message_t6', messageSchema_t6)
export default Message_t6