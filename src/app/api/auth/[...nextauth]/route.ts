import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import Auth0Provider from "next-auth/providers/auth0"

export const authOptions: NextAuthOptions = {
  //Auth0 providers
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER!,
    }),
    //We can add more OAuth here like Google, Github, Microsoft etc.
  ],

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET!,
}

//NextAuth handler
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
