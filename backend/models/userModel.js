import mongoose from 'mongoose'
// import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String, 
      required: true, 
    },
    email: {
      type: String,
      unique: true, 
      required: true 
    },
    password: {
      type: String, 
      required: [true, 'Please add a password'],
      minLength: 1, 
      select: false, 
    },
    isBlocked: {
      type: Boolean, 
      default: false, 
    },
  }
)

const User = mongoose.model('User', userSchema)
export default User