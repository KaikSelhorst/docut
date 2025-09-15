import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  logging: { fetches: { fullUrl: true } },
  devIndicators: { position: 'bottom-right' }
}

export default nextConfig
