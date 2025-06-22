import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  // Admin panel made visible to only admin users.
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Hoşgeldin, {session?.user?.name || "User"}!</p>

      <div>
        <Link href="/dashboard/profile">Profili Görüntüle</Link>
      </div>

      {session?.user?.role === "admin" && (
        <div>
          <Link href="/dashboard/admin">Admin Paneli</Link>
        </div>
      )}
    </div>
  )
}
