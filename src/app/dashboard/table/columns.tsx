import { DataTableColumnHeader } from '@/components/data-table'
import { Skeleton } from '@/components/ui/skeleton'
import { dateUtils } from '@/lib/date'
import type { ColumnDef } from '@tanstack/react-table'
import {
  DataTableActions,
  DataTableActionsSkeleton
} from './data-table-actions'

export interface Link {
  id: string
  url: string
  expiration: string | null
  clicks: number
  updatedAt: string
  createdAt: string
}

export const columns: ColumnDef<Link>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    accessorKey: 'id',
    cell: ({ row }) => <div className="font-medium">{row.getValue('id')}</div>,
    size: 100
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full URL" />
    ),
    accessorKey: 'url',
    size: 200,
    enableSorting: false
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Clicks" />
    ),
    accessorKey: 'clicks',
    cell: ({ row }) => <div>{row.getValue('clicks')}</div>,
    size: 180,
    enableSorting: false
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expire at" />
    ),
    accessorKey: 'expiration',
    cell: ({ row }) => {
      const expiration = row.getValue('expiration')
      if (expiration === null) return <div>Permanent</div>
      return <div>{dateUtils.fromNow(expiration as string)}</div>
    },
    size: 120,
    enableSorting: false
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Access" />
    ),
    accessorKey: 'updatedAt',
    cell: ({ row }) => (
      <div>{dateUtils.fromNow(row.getValue('updatedAt'))}</div>
    ),
    size: 120,
    enableSorting: false
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    accessorKey: 'actions',
    cell: ({ row }) => {
      const link = row.original
      return <DataTableActions id={link.id} />
    },
    size: 40,
    enableSorting: false
  }
]

export const columnsSkeleton: ColumnDef<Link>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    accessorKey: 'id',
    cell: () => <Skeleton className="h-5 w-24" />,
    size: 100,
    enableSorting: false
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full URL" />
    ),
    accessorKey: 'url',
    cell: () => <Skeleton className="h-5 w-56" />,

    size: 200,
    enableSorting: false
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Clicks" />
    ),
    accessorKey: 'clicks',
    cell: () => <Skeleton className="h-5 w-12" />,
    size: 180,
    enableSorting: false
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expire at" />
    ),
    accessorKey: 'expiration',
    cell: () => <Skeleton className="h-5 w-16" />,
    size: 120,
    enableSorting: false
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Access" />
    ),
    accessorKey: 'updatedAt',
    cell: () => <Skeleton className="h-5 w-20" />,
    size: 120,
    enableSorting: false
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    accessorKey: 'actions',
    cell: () => <DataTableActionsSkeleton />,
    size: 40,
    enableSorting: false
  }
]
