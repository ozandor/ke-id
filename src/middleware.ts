export { default } from "next-auth/middleware"

export const config = {
  //Only dashboard and its paths are protected with our middleware.
  matcher: ["/dashboard/:path*"],
}
