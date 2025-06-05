import { listLinks } from '@/actions/private/list-links'
import { Suspense } from 'react'
import { ListLinks, ListLinksSkeleton } from './components/link-table'

interface PageProps {
  searchParams: Promise<Record<string, string>>
}

export default async function Home(props: PageProps) {
  const searchParams = await props.searchParams
  const listLinkPromise = listLinks(searchParams)

  return (
    <main>
      <Suspense
        fallback={<ListLinksSkeleton />}
        key={JSON.stringify(searchParams)}
      >
        <ListLinks linksPromise={listLinkPromise} />
      </Suspense>
    </main>
  )
}
