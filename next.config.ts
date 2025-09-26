import { createMDX } from 'fumadocs-mdx/next'
import type { NextConfig } from 'next'

const withMDX = createMDX({
  configPath: 'source.config.ts'
})

const nextConfig: NextConfig = {
  logging: { fetches: { fullUrl: true } },
  devIndicators: { position: 'bottom-right' },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'docut.xyz'
      },
      {
        protocol: 'https',
        hostname: 'vercel.com'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/introduction',
        permanent: false
      }
    ]
  }
}

export default withMDX(nextConfig)
