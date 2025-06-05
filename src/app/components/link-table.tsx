import type { listLinks } from '@/actions/private/list-links'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { use } from 'react'
import { CreateLinkButton } from './create-link-button'
import { LinkTableRow, LinkTableRowSkeleton } from './link-table-row'
import { SearchHash } from './search-hash'
import { Paginate } from './paginate'

interface ListLinksProps {
  linksPromise: ReturnType<typeof listLinks>
}

export function ListLinks({ linksPromise }: ListLinksProps) {
  const res = use(linksPromise)

  if (!res.success) {
    return <div>Links not found </div>
  }

  return (
    <section className="container mx-auto px-3">
      <div className="flex gap-3 py-2 flex-col-reverse sm:flex-row">
        <SearchHash />
        <Paginate totalPages={res.data.total_pages} />
        <CreateLinkButton />
      </div>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Expire at</TableHead>
            <TableHead>Clicks</TableHead>
            <TableHead>
              <span />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {res.data.links.map((link) => (
            <LinkTableRow {...link} key={link.id} />
          ))}
        </TableBody>
      </Table>
    </section>
  )
}

export function ListLinksSkeleton() {
  return (
    <section className="container mx-auto px-3">
      <div className="flex gap-3 py-2 flex-col-reverse sm:flex-row">
        <SearchHash />
        <Paginate totalPages={0} />
        <CreateLinkButton />
      </div>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Expire at</TableHead>
            <TableHead>Clicks</TableHead>
            <TableHead>
              <span />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(24)
            .fill('0')
            .map((_, i) => (
              <LinkTableRowSkeleton key={String(i)} />
            ))}
        </TableBody>
      </Table>
    </section>
  )
}
