import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import Logo from "@/components/Logo"

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    // Middleware does this check, but it's good practice to check it here too.
    redirect("/api/auth/signin")
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-600">
      
      <header className="border-b border-amber-400 bg-amber-400 shadow-sm dark:border-slate-400 dark:bg-slate-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Logo size={32} />
              <h1 className="font-[family-name:var(--font-geist-sans)] text-xl font-semibold text-white">
                <span className="text-slate-700 dark:text-[var(--background)]">
                  Profil
                </span>
              </h1>
            </div>
            <div className="flex items-center space-x-4 text-slate-700 dark:text-white">
              <Link
                href="/dashboard"
                className="w-max transform rounded-2xl bg-white px-2 py-1 text-center transition hover:scale-110 hover:bg-amber-100 dark:bg-slate-700 dark:hover:bg-slate-600"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="relative flex min-h-screen flex-col text-center">
        <div className="py-4 font-[family-name:var(--font-geist-sans)] text-3xl font-bold text-slate-700 dark:text-white sm:py-8 sm:text-5xl xl:py-16">
          Kullanıcı Profili
        </div>
        <div className="flex flex-1 items-center justify-center py-16">
          <div className="font-[family-name:var(--font-geist-sans)] text-sm text-slate-700 dark:text-white sm:text-xl">
            <ul className="space-y-2 text-left">
              <li>Email: {session.user?.email}</li>
              <li>Name: {session.user?.name || "Not provided"}</li>
            </ul>
          </div>
        </div>
      </main>
      
    </div>
  )
}
