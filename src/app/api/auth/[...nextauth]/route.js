import { authOptions } from '@/src/service/authOptions'
import NextAuth from 'next-auth/next'

const handler = NextAuth(authOptions)

export { handler as Get, handler as POST }
