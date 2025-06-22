import { authOptions } from "@/lib/auth"

// ÖNEMLİ!!!: Gerçek testler veya e2e toollar kullanılarak test edilmeli. Bu haliyle sadece authOptions var mı yok mu diye kontrol ediyor.
describe("authOptions yapılandırması", () => {
  it("tanımlı olmalı", () => {
    expect(authOptions).toBeDefined()
  })

  it("temel NextAuth seçeneklerine sahip olmalı", () => {
    expect(authOptions.providers).toBeDefined()
    expect(authOptions.session).toBeDefined()
    expect(authOptions.secret).toBeDefined()
  })
})
