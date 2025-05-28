import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: { position: 'bottom-right' },
  experimental: {
    nodeMiddleware: true
  }
}

export default nextConfig
