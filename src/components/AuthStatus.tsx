"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"

export default function AuthStatus() {
  const { data: session, status } = useSession()

  // Handles the sign out process with Auth0
  const handleSignOut = async () => {
    const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN
    const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID
    const returnTo = window.location.origin

    // Local session cleared
    await signOut({ redirect: false })

    // Redirect to Auth0 to clear the remote session  (Official, universal logout door of our Auth0)
    window.location.href = `${domain}/v2/logout?client_id=${clientId}&returnTo=${encodeURIComponent(
      returnTo
    )}`
  }

  if (status === "loading") {
    return <p>Yükleniyor...</p>
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <p>Kullanıcı girişi yapıldı: {session.user?.email}</p>
        <Link
          href="/dashboard"
          className="rounded-md bg-slate-500 px-4 py-2 text-white"
        >
          Dashboard&apos;a Git
        </Link>
        <button
          onClick={handleSignOut}
          className="rounded-md bg-slate-900 px-4 py-2 text-white"
        >
          Sign out
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <p>Henüz giriş yapılmadı.</p>
      <button
        onClick={() => signIn("auth0")}
        className="w-max transform rounded-2xl bg-gray-700 p-4 text-center transition hover:scale-105 hover:bg-gray-600"
      >
        Giriş Yap
      </button>
    </div>
  )
}
