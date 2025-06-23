import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import AuthStatus from "@/components/AuthStatus"
import { useSession, signIn, signOut } from "next-auth/react"
import type { Session } from "next-auth"

// Following modules mocked
jest.mock("next-auth/react")

const mockUseSession = useSession as jest.Mock
const mockSignIn = signIn as jest.Mock
const mockSignOut = signOut as jest.Mock

// Env variables mocked
const originalEnv = process.env
beforeEach(() => {
  process.env = {
    ...originalEnv,
    NEXT_PUBLIC_AUTH0_DOMAIN: "https://test.auth0.com",
    NEXT_PUBLIC_AUTH0_CLIENT_ID: "test-client-id",
  }
})

afterEach(() => {
  process.env = originalEnv
  jest.clearAllMocks()
})

describe("AuthStatus Bileşeni", () => {
  describe("Yükleme Durumu", () => {
    it("Durum yüklenirken mesajı göstermeli", () => {
      // Loading state mock
      mockUseSession.mockReturnValue({
        data: null,
        status: "loading",
      })

      render(<AuthStatus />)

      expect(screen.getByText("Yükleniyor...")).toBeInTheDocument()
    })
  })

  describe("Authenticated", () => {
    it("kimlik doğrulandığında kullanıcı mailini ve çıkış butonunu göstermeli", () => {
      // Authenticated user mock session
      const mockSession: Session = {
        user: {
          id: "123",
          email: "test@example.com",
          role: "user",
        },
        expires: "1",
      }
      mockUseSession.mockReturnValue({
        data: mockSession,
        status: "authenticated",
      })

      render(<AuthStatus />)

      // Check user email and buttons
      expect(
        screen.getByText(/Kullanıcı girişi yapıldı: test@example.com/i)
      ).toBeInTheDocument()
      expect(
        screen.getByRole("button", { name: /Çıkış Yap/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole("link", { name: /Dashboard/i })
      ).toBeInTheDocument()
    })

    it("Çıkışa tıklanıldığında signOut çağırmalı", async () => {
      // Authenticated user mock session
      const mockSession: Session = {
        user: {
          id: "123",
          email: "test@example.com",
          role: "user",
        },
        expires: "1",
      }
      mockUseSession.mockReturnValue({
        data: mockSession,
        status: "authenticated",
      })
      mockSignOut.mockResolvedValue(undefined)

      render(<AuthStatus />)

      // logout button clicked
      const logoutButton = screen.getByRole("button", { name: /Çıkış Yap/i })
      fireEvent.click(logoutButton)

      // signOut called with correct params
      await waitFor(() => {
        expect(mockSignOut).toHaveBeenCalledWith({ redirect: false })
      })
    })
  })

  describe("Unauthenticated", () => {
    it("Kimlik doğrulama başarısızsa giriş mesajını ve giriş butonunu göstermeli", () => {
      // Unauthenticated user mocked
      mockUseSession.mockReturnValue({
        data: null,
        status: "unauthenticated",
      })

      render(<AuthStatus />)

      // Still needs to show login and not logined yet information
      expect(screen.getByText("Henüz giriş yapılmadı.")).toBeInTheDocument()
      expect(
        screen.getByRole("button", { name: /Giriş Yap/i })
      ).toBeInTheDocument()
    })

    it("Girişe tıklanıldığında auth0 provider ile signIn çağrılmalı", () => {
      // Unauthenticated state mock
      mockUseSession.mockReturnValue({
        data: null,
        status: "unauthenticated",
      })
      mockSignIn.mockImplementation(() => {})

      render(<AuthStatus />)

      // Login button clicked
      const loginButton = screen.getByRole("button", { name: /Giriş Yap/i })
      fireEvent.click(loginButton)

      // signIn with Auth0 expected here
      expect(mockSignIn).toHaveBeenCalledWith("auth0")
    })
  })

  describe("Dashboard Linki", () => {
    it("Dashboard linkinin href doğru mu?", () => {
      // Authenticated user mock session
      const mockSession: Session = {
        user: {
          id: "123",
          email: "test@example.com",
          role: "user",
        },
        expires: "1",
      }
      mockUseSession.mockReturnValue({
        data: mockSession,
        status: "authenticated",
      })

      render(<AuthStatus />)

      // Dashboard link expected here
      const dashboardLink = screen.getByRole("link", {
        name: /Dashboard'a Git/i,
      })
      expect(dashboardLink).toHaveAttribute("href", "/dashboard")
    })
  })
})
