import type { Metadata } from 'next'
import { seoMetadata } from '@/common/seo-config'

export function generateMetadata(): Metadata {
  return {
    title: seoMetadata.title,
    description: seoMetadata.description,
    keywords: seoMetadata.keywords,
    authors: [{ name: seoMetadata.author }],
    robots: seoMetadata.robots,
    alternates: {
      canonical: seoMetadata.canonical
    },
    openGraph: {
      title: seoMetadata.openGraph.title,
      description: seoMetadata.openGraph.description,
      type: seoMetadata.openGraph.type,
      url: seoMetadata.openGraph.url,
      siteName: seoMetadata.openGraph.site_name,
      images: [
        {
          url: seoMetadata.openGraph.image
        }
      ]
    },
    twitter: {
      card: seoMetadata.twitter.card,
      title: seoMetadata.twitter.title,
      description: seoMetadata.twitter.description,
      images: [seoMetadata.twitter.image]
    },
    icons: {
      icon: seoMetadata.favicon
    }
  }
}
