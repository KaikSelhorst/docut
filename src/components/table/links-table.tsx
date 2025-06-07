import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { faker } from '@faker-js/faker'
import { use } from 'react'
import { LinksTableRow, LinksTableRowSkeleton } from './links-table-row'

interface LinksTableProps {
  className?: string
}

export function LinksTable({ className }: LinksTableProps) {
  const linkList = use(new Promise((r) => setTimeout(r, 3000)))

  return (
    <div className="border rounded-md overflow">
      <Table className={cn(className)}>
        <LinksTableHeader />
        <TableBody>
          {!invoices.length && (
            <TableRow>
              <TableCell colSpan={5}>No shortened links found.</TableCell>
            </TableRow>
          )}
          {invoices.map((invoice) => (
            <LinksTableRow
              clicks={invoice.clicks}
              expiration={invoice.expiration}
              id={invoice.id}
              lastAccess={invoice.last_access}
              url={invoice.url}
              key={invoice.id}
            />
          ))}
        </TableBody>
      </Table>
    </div>
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

const invoices = new Array(16).fill(0).map(() => ({
  id: faker.database.mongodbObjectId().slice(0, 9),
  url: faker.internet.url(),
  expiration: faker.date.soon({ days: 3 }).toISOString(),
  last_access: faker.date.recent({ days: 3 }).toISOString(),
  clicks: Math.ceil(Math.random() * 9999)
}))

export function LinksTableSkeleton() {
  return (
    <div className="border rounded-md overflow">
      <Table>
        <LinksTableHeader />
        <TableBody>
          {!invoices.length && (
            <TableRow>
              <TableCell colSpan={5}>No shortened links found.</TableCell>
            </TableRow>
          )}
          {invoices.map((invoice) => (
            <LinksTableRowSkeleton key={invoice.id} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
