import { Schema, model, models } from 'mongoose'

const MessageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      requred: true,
    },
    recepient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      requred: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    phone: String,
    body: String,
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timeStamps: true },
)

const Message = models?.Message || model('Message', MessageSchema)

export default Message
