import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/$', '/dashboard', '/sign-in', '/sign-up'],
        disallow: ['/']
      }
    ],
    sitemap: 'https://www.docut.xyz/sitemap.xml'
  }
}
