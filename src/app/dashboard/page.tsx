import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session?.user?.name || "User"}!</p>

      <div>
        <Link href="/dashboard/profile">View Profile</Link>
      </div>

      {/* admin check eklenecek */}
      <div>
        <Link href="/dashboard/admin">Admin Panel</Link>
      </div>
    </div>
  )
}
