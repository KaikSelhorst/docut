'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { use } from 'react'
import { LinksTableRow, LinksTableRowSkeleton } from './links-table-row'
import type { listLinks } from '@/actions/dashboard/link'
import {
  LinksTableFilter,
  LinksTableFilterSkeleton
} from './links-table-filter'
import { LinksTablePaginate } from './links-table-paginate'
import { useSearchParams } from 'next/navigation'

interface LinksTableProps {
  className?: string
  linksPromise: ReturnType<typeof listLinks>
}

export function LinksTable({ className, linksPromise }: LinksTableProps) {
  const linkList = use(linksPromise)

  if (!linkList.success) {
    return <div>Error</div>
  }

  const { links, total_pages, total } = linkList.data

  return (
    <section className="space-y-3">
      <LinksTableFilter />
      <div className="border rounded-md overflow">
        <Table className={cn(className)}>
          <LinksTableHeader />
          <TableBody>
            {!linkList.data.links.length && (
              <TableRow>
                <TableCell colSpan={5}>No shortened links found.</TableCell>
              </TableRow>
            )}
            {linkList.data.links.map((invoice) => (
              <LinksTableRow
                expiration={invoice.expiration}
                clicks={invoice.clicks}
                id={invoice.id}
                lastAccess={invoice.updatedAt}
                url={invoice.url}
                key={invoice.id}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <LinksTablePaginate
        perPage={links.length}
        total={total}
        totalPages={total_pages}
      />
    </section>
  )
}

function LinksTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-40">Hash</TableHead>
        <TableHead className="max-w-[300px] overflow-ellipsis overflow-clip">
          Full URL
        </TableHead>
        <TableHead>Expire At</TableHead>
        <TableHead>Last access</TableHead>
        <TableHead>Clicks</TableHead>
        <TableHead>
          <span />
        </TableHead>
      </TableRow>
    </TableHeader>
  )
}

export function LinksTableSkeleton() {
  const searchParams = useSearchParams()

  const perPage = Number(searchParams.get('per_page')) || 16
  const invoices = new Array(perPage).fill(0)

  return (
    <section className="space-y-3">
      <LinksTableFilterSkeleton />
      <div className="border rounded-md overflow">
        <Table>
          <LinksTableHeader />
          <TableBody>
            {!invoices.length && (
              <TableRow>
                <TableCell colSpan={5}>No shortened links found.</TableCell>
              </TableRow>
            )}
            {invoices.map((_, i) => (
              <LinksTableRowSkeleton key={String(i)} />
            ))}
          </TableBody>
        </Table>
      </div>
      <LinksTablePaginate totalPages={0} perPage={0} total={0} />
    </section>
  )
}
