"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface NextAuthProviderProps { children: ReactNode; }

//Made this provider for SessionProvider. It will use useSession, sign in, sign out, etc on client side.
export default function NextAuthProvider({ children }: NextAuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
