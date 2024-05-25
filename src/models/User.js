import { time } from 'console'
import { Schema, model, models } from 'mongoose'
import { type } from 'os'

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email already exists'],
      required: [true, 'Email is required'],
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Property',
      },
    ],
  },
  { timeStamps: true },
)

const User = models.User || model('User', UserSchema)

export default User
