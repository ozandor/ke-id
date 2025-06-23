import AuthStatus from "../components/AuthStatus"
import Logo from "@/components/Logo"

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-600">
      
      <header className="border-b border-amber-400 bg-amber-400 shadow-sm dark:border-slate-400 dark:bg-slate-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-start space-x-4">
            <Logo size={32} />
            <h1 className="font-[family-name:var(--font-geist-sans)] text-xl font-semibold text-white">
              <span className="text-slate-700 dark:text-[var(--background)]">next</span>
              <span className="text-slate-700 dark:text-white">-</span>
              <span className="text-slate-700 dark:text-[var(--foreground)]">auth</span>
            </h1>
          </div>
        </div>
      </header>
      
      <main className="relative flex min-h-screen flex-col text-center">
        <div className="py-4 font-[family-name:var(--font-geist-sans)] text-3xl font-bold text-slate-700 dark:text-white sm:py-8 sm:text-5xl xl:py-16">
          Ana Sayfaya Hoşgeldiniz
        </div>
        <div className="flex flex-1 items-center justify-center py-16">
          <div className="font-[family-name:var(--font-geist-sans)] text-sm text-slate-700 dark:text-white sm:text-xl">
          <AuthStatus />
          </div>
        </div>
      </main>
      
    </div>
  )
}
