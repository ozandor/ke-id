import { render, screen } from "@testing-library/react"
import AdminPage from "@/app/dashboard/admin/page"
import { getServerSession } from "next-auth/next"
import type { Session } from "next-auth"

// NextAuth and getServerSession mocked
jest.mock("next-auth/next")
const mockGetServerSession = getServerSession as jest.Mock

// mockRedirect is a function that is used to redirect the user to the dashboard page, just a mocked test function
const mockRedirect = jest.fn()
jest.mock("next/navigation", () => ({
  redirect: (path: string) => mockRedirect(path),
}))

describe("Admin Sayfası", () => {
  beforeEach(() => {
    jest.resetAllMocks()
    // Redirecting to dashboard throw error so we can catch it in tests
    mockRedirect.mockImplementation(() => {
      throw new Error("NEXT_REDIRECT")
    })
  })

  it("Admin olmayan kullanıcıyı dashboarda yönlendirmeli", async () => {
    // Regular user mock session
    const mockSession: Session = {
      user: { id: "1", email: "user@example.com", role: "user" },
      expires: "1",
    }

    mockGetServerSession.mockResolvedValue(mockSession)

    // Wait for redirect error to be thrown
    await expect(AdminPage()).rejects.toThrow("NEXT_REDIRECT")

    // Redirected dashboard checked here
    expect(mockRedirect).toHaveBeenCalledWith("/dashboard")
  })

  it("Admin kullanıcı için admin panelini render etmeli", async () => {
    // Admin mock session
    const mockSession: Session = {
      user: { id: "2", email: "admin@example.com", role: "admin" },
      expires: "1",
    }
    mockGetServerSession.mockResolvedValue(mockSession)

    render(await AdminPage())

    // Admin panel test
    expect(
      screen.getByRole("heading", { name: /admin paneli/i })
    ).toBeInTheDocument()
    // Redirect not called check (user stayed on page)
    expect(mockRedirect).not.toHaveBeenCalled()
  })
})
