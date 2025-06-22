import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: [
    "jose",
    "@panva/hkdf",
    "uuid",
    "preact-render-to-string",
    "preact",
  ],
}

export default nextConfig
