import mongoose from 'mongoose'

const userSchema_t6 = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    }
  }
)

const User_t6 = mongoose.model('User_t6', userSchema_t6)
export default User_t6