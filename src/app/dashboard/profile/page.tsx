import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    // Middleware does this check, but it's good practice to check it here too.
    redirect("/api/auth/signin")
  }

  return (
    <div>
      <h1>Profil</h1>
      <p>Kullanıcı Profili</p>
      <ul>
        <li>Email: {session.user?.email}</li>
        <li>Name: {session.user?.name || "Not provided"}</li>
      </ul>
    </div>
  )
}
