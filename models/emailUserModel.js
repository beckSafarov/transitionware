import mongoose from 'mongoose'

const emailUserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    }
  }
)

userSchema.methods.toggleBlock = async function () {
  this.isBlocked = !this.isBlocked
};

const EmailUser = mongoose.model('EmailUser', emailUserSchema)
export default EmailUser