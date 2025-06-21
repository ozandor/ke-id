import "next-auth"

declare module "next-auth" {
  //Extended the session.user (default) type to include the user's role.
  interface User {
    role?: string
  }

  interface Session {
    user?: User
  }
}

declare module "next-auth/jwt" {
  //Extended the JWT (its built in) type to include the user's role.
  interface JWT {
    role?: string
  }
}
