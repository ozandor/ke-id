import { render, screen } from "@testing-library/react"
import Home from "@/app/page"
import { useSession } from "next-auth/react"

// NextAuth and useSession mocked
jest.mock("next-auth/react")
const mockUseSession = useSession as jest.Mock

describe("Ana Sayfa", () => {
  it("Oturum açma başarısız olduğunda giriş bilgileri gözükmeli", () => {
    // useSession hook returns unauthenticated
    mockUseSession.mockReturnValue({
      data: null,
      status: "unauthenticated",
    })

    render(<Home />)

    // Checking the loginText element, because there has to be this text when we are in this page (Home page)
    const loginText = screen.getByText(/Henüz giriş yapılmadı./i)

    expect(loginText).toBeInTheDocument()
  })
})
