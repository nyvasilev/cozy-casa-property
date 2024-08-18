import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/src/service/authOptions'

export const getSessionUser = async () => {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) return null

  return {
    user: session.user,
    userId: session.user.id,
  }
}
