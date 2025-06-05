import { seoMetadata } from '@/constants/seo-config'
import { listLinks } from '@/actions/private/list-links'
import { Suspense } from 'react'
import { ListLinks, ListLinksSkeleton } from './components/link-table'
import Head from 'next/head'
import Script from 'next/script'

interface PageProps {
  searchParams: Promise<Record<string, string>>
}

export const metadata = {
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

export default async function Home(props: PageProps) {
  const searchParams = await props.searchParams
  const listLinkPromise = listLinks(searchParams)

  return (
    <main>
      <Head>
        <Script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoMetadata.jsonLd)
          }}
        />
      </Head>
      <Suspense
        fallback={<ListLinksSkeleton />}
        key={JSON.stringify(searchParams)}
      >
        <ListLinks linksPromise={listLinkPromise} />
      </Suspense>
    </main>
  )
}
