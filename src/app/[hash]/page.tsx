import { getLinkSeo } from '@/actions/public/get-link-seo'
import { env } from '@/shared/env'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { RedirectTo } from './redirect-to'

interface PageProps {
  params: Promise<{ hash: string }>
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { hash } = await params

  const seo = await getLinkSeo(hash)

  if (!seo.success) return {}

  return {
    title: seo.data.title,
    description: seo.data.description,
    openGraph: {
      title: seo.data.title || '',
      description: seo.data.description || ''
    },
    twitter: {
      description: seo.data.description || '',
      title: seo.data.title || ''
    }
  }
}

export default async function Page({ params }: PageProps) {
  const { hash } = await params

  const link = await fetch(`${env.BETTER_AUTH_URL}/api/link/${hash}`)

  if (link.status !== 200) return <div>Not found!</div>

  const res = await link.json()

  return <RedirectTo path={res.url} />
}
