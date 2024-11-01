'use server'
import connectDB from '@/config/database'
import Message from '@/src/models/Message'
import { getSessionUser } from '@/src/service/getSessionUser'

export const ddMessage = async (formData) => {
  await connectDB()

  const sessionUser = await getSessionUser()

  if (!sessionUser || !sessionUser.userId) throw new Error('User ID is required')

  const { userId } = sessionUser

  const recepient = formData.get('recepient')

  if (userId === recipient) {
    return { error: 'You can not send a message to yourself' }
  }

  const newMessage = new Message({
    sender: userId,
    recepient,
    property: formData.get('property'),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    body: formData.get('body'),
  })

  await newMessage.save()

  return { submited: true }
}
