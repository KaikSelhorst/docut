import { getLinkSeo } from '@/actions/public/get-link-seo'
import { Badge } from '@/components/ui/badge'
import { env } from '@/shared/env'
import type { Metadata } from 'next'
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
    robots: {
      index: false,
      follow: false
    },
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

  if (link.status !== 200) return <Notfound />

  const res = await link.json()

  return <RedirectTo path={res.url} />
}

function Notfound() {
  return (
    <section className="h-screen flex flex-col">
      <section className="grow flex justify-center items-center">
        <div className="max-w-xl text-center space-y-4">
          <Badge variant="outline" className="gap-1.5">
            <span
              className="size-1.5 rounded-full bg-orange-500"
              aria-hidden="true"
            />
            Expired
          </Badge>
          <hgroup>
            <h1 className="text-4xl leading-14 text-center font-medium">
              This link has expired
            </h1>
            <p className="text-muted-foreground">
              The link you tried to access is no longer valid. It may have
              expired or been deactivated by its owner.
            </p>
          </hgroup>
          <p className="text-muted-foreground italic">
            If you think this is a mistake, try requesting a new link or contact
            the sender.
          </p>
        </div>
      </section>
    </section>
  )
}
