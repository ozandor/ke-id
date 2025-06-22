"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"

export default function AuthStatus() {
  const { data: session, status } = useSession()

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
          onClick={() => signOut()}
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
