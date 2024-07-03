import { access } from 'fs'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authOptions: {
        params: { prompt: 'consent', access_type: 'offline', response_type: 'code' },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      // 1 connect to database
      // 2 check if user exists
      // 3 if not, then add user to database
      // 4 return true to allow sign in
    },

    // modifies the session object
    async session({ session }) {
      // 1 get user from database
      // 2 assign the user id to the session
      //3 return session
    },
  },
}
