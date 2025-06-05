import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.docut.xyz',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0
    }
  ]
}
