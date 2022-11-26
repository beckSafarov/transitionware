import mongoose from 'mongoose'
// import bcrypt from 'bcryptjs'

const UserSchema_t4 = mongoose.Schema(
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

UserSchema_t4.methods.toggleBlock = async function () {
  this.isBlocked = !this.isBlocked
};

const User_t4 = mongoose.model('User_t4', UserSchema_t4)
export default User_t4