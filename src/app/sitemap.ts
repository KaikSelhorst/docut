import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.docut.xyz',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: 'https://www.docut.xyz/dashboard',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.1
    },
    {
      url: 'https://www.docut.xyz/sign-in',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.5
    },
    {
      url: 'https://www.docut.xyz/sign-up',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.6
    }
  ]
}
