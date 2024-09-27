'use server'
import connectDB from '@/config/database'
import User from '@/src/models/User'
import { getSessionUser } from '@/src/service/getSessionUser'

export const checkBookmarkStatus = async (propertyId) => {
  await connectDB()

  const sessionUser = await getSessionUser()

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required')
  }

  const { userId } = sessionUser

  const user = await User.findById(userId)

  let isBookmarked = user.bookmarks.includes(propertyId)

  return { isBookmarked }
}
