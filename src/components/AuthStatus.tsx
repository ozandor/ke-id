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
      <div className="flex flex-col items-center gap-4">
        <p>Kullanıcı girişi yapıldı: {session.user?.email}</p>
        <Link
          href="/dashboard"
          className="w-max transform rounded-2xl bg-amber-400 p-4 text-center transition hover:scale-110 hover:bg-amber-300 dark:bg-slate-700 dark:hover:bg-slate-800"
        >
          Dashboard
        </Link>
        <button
          onClick={handleSignOut}
          className="w-max transform rounded-2xl bg-amber-400 p-4 text-center transition hover:scale-110 hover:bg-amber-300 dark:bg-slate-700 dark:hover:bg-slate-800"
        >
          Çıkış Yap
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <p>Henüz giriş yapılmadı.</p>
      <button
        onClick={() => signIn("auth0")}
        className="w-max transform rounded-2xl bg-amber-400 p-4 text-center transition hover:scale-110 hover:bg-amber-300 dark:bg-slate-700 dark:hover:bg-slate-800"
      >
        Giriş Yap
      </button>
    </div>
  )
}
