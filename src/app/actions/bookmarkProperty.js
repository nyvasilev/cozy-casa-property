'use server'
import connectDB from '@/config/database'
import User from '@/src/models/User'
import { getSessionUser } from '@/src/service/getSessionUser'
import { revalidatePath } from 'next/cache'

export const bookmarkProperty = async (propertyId) => {
  await connectDB()

  const sessionUser = await getSessionUser()

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required')
  }

  const { userId } = sessionUser

  const user = await User.findById(userId)

  let isBookmarked = user.bookmarks.includes(propertyId)

  let message

  if (isBookmarked) {
    // if already LuBookMarked, then remove
    user.bookmarks.pull(propertyId)
    message = 'Bookmark Removed'
    isBookmarked = false
  } else {
    // if not bookmarked then add
    user.bookmarks.push(propertyId)
    message = 'Bookmark Added'
    isBookmarked = true
  }

  await user.save()
  revalidatePath('/properties/save', '/page')

  return { message, isBookmarked }
}
