"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Yükleniyor...</p>;
  }

  if (session) {
    return (
      <div>
        <p>Giriş yapıldı: {session.user?.email}</p>
        <button onClick={() => signOut()}>Oturumu Kapat</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <p>Henüz giriş yapılmadı.</p>
      <button onClick={() => signIn("auth0")} className="w-max transform rounded-2xl bg-gray-700 p-4 text-center transition hover:scale-105 hover:bg-gray-600">
        Giriş Yap
      </button>
    </div>

  );
}
