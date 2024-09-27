'use client'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { bookmarkProperty } from '@/src/app/actions'
import { FaBookmark } from 'react-icons/fa'
import { useSession } from 'next-auth/react'

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession()
  const userId = session?.user?.id
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [loading, setLoading] = useState(true)

  const handleClick = async () => {
    if (!userId) {
      toast.error('You need to be signed in to bookmark a a listing')
      return
    }

    bookmarkProperty(property._id).then((res) => {
      if (res.error) return toast.error(res.error)
      toast.success(res.message)
    })
  }

  return isBookmarked ? (
    <button
      //   onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      //   onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      onClick={handleClick}>
      <FaBookmark className="fas fa-bookmark mr-2" /> Bookmark Property
    </button>
  )
}

export default BookmarkButton
