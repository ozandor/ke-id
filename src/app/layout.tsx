import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import NextAuthProvider from "../providers/NextAuthProvider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "next-auth",
  description:
    "Authentication system built with Next.js, NextAuth.js, and Auth0 with role based control. Designed with TailwindCSS.",
  // Designed this logo myself using K and E on Inkscape. Can be found on the public folder.
  icons: [
    { rel: "icon", url: "/ke.svg", type: "image/svg+xml" },
    { rel: "icon", url: "/favicon.ico", type: "image/x-icon" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
