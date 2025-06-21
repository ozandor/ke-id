import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import Auth0Provider from "next-auth/providers/auth0"

export const authOptions: NextAuthOptions = {
  // Auth0 providers
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_DOMAIN!,
    }),
    // We can add more OAuth here like Google, Github, Microsoft etc.
  ],

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET!,

  callbacks: {
    // JWT callback
    async jwt({ token, account }) {
      // If this is a sign in, add the user's role from the access token to the JWT.
      if (account?.id_token) {
        // This namespace matching Auth0's namespace
        const namespace = "https://next-auth-example.com"
        const decodedToken = JSON.parse(
          Buffer.from(account.id_token.split(".")[1], "base64").toString()
        )
        const roles = decodedToken[`${namespace}/roles`] as string[] | undefined
        token.role = roles?.[0] // Assigns the role to our JWT token
      }
      return token
    },

    // In each session check, we add the role to the user's session object.
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
      }
      return session
    },
  },
}

// NextAuth handler
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
