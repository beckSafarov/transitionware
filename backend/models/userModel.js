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
    lastLoggedDate: {
      type: Date, 
      default: new Date()
    },
    regDate: {
      type: Date, 
      default: new Date()
    },
    isBlocked: {
      type: Boolean, 
      default: false, 
    },
  }
)

userSchema.methods.toggleBlock = async function () {
  this.isBlocked = !this.isBlocked
};

const User = mongoose.model('User', userSchema)
export default User