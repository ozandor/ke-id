import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  // When user is not admin, redirect them to the main dashboard.
  if (session?.user?.role !== "admin") {
    redirect("/dashboard")
  }

  return (
    <div>
      <h1>Admin Paneli</h1>
      <p>Sadece admin rolü erişebilir.</p>
    </div>
  )
}
