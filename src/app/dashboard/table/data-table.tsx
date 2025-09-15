'use client'
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  type PaginationState,
  type SortingState,
  useReactTable
} from '@tanstack/react-table'
import { X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useDebounceCallback } from 'usehooks-ts'
import { DataTablePagination } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useTableFilters } from '@/hooks'
import { columnsSkeleton } from './columns'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  sort_by?: string
  sort_direction?: string
  per_page?: string
  page?: string
  page_count?: string | number
  filter?: string
  disabled?: boolean
}

const defPagination: PaginationState = { pageIndex: 0, pageSize: 25 }
const defFilter = ''
const defSorting: SortingState = []

export function OverviewTable<TData, TValue>({
  data,
  columns,
  disabled,
  ...filters
}: DataTableProps<TData, TValue>) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [filter, setFilter] = useState<string>(filters.filter || defFilter)

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: Number(filters.page) || defPagination.pageIndex,
    pageSize: Number(filters.per_page) || defPagination.pageSize
  })

  const [sorting, setSorting] = useState<SortingState>(
    filters.sort_by
      ? [{ id: filters.sort_by, desc: filters.sort_direction === 'desc' }]
      : defSorting
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onGlobalFilterChange: setFilter,
    manualSorting: true,
    manualPagination: true,
    manualFiltering: true,
    pageCount: Number(filters.page_count) || 0,
    state: {
      sorting,
      pagination,
      globalFilter: filter
    }
  })

  const updateQueries = useCallback(
    (params: URLSearchParams) => {
      router.push(`?${params.toString()}`, { scroll: false })
    },
    [router]
  )

  const debouncedUpdateQueries = useDebounceCallback(updateQueries, 350)

  // biome-ignore lint/correctness/useExhaustiveDependencies: router and searchParams are stable in Next.js
  useEffect(() => {
    if (disabled) return
    const newParams = new URLSearchParams(searchParams.toString())

    if (sorting.length > 0) {
      newParams.set('sort_by', sorting[0].id)
      newParams.set('sort_direction', sorting[0].desc ? 'desc' : 'asc')
    } else {
      newParams.delete('sort_by')
      newParams.delete('sort_direction')
    }

    if (pagination.pageSize !== defPagination.pageSize) {
      newParams.set('per_page', String(pagination.pageSize))
    } else {
      newParams.delete('per_page')
    }

    if (!newParams.has('page', String(pagination.pageIndex)))
      newParams.set('page', String(pagination.pageIndex + 1))

    if (defPagination.pageIndex === pagination.pageIndex) {
      newParams.delete('page')
    }

    if (filter !== defFilter) {
      newParams.set('id', filter)
    } else {
      newParams.delete('id')
    }

    if (newParams.toString() !== searchParams.toString()) {
      debouncedUpdateQueries(newParams)
    }
  }, [sorting, pagination, filter])

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-between">
        <Input
          className="max-w-md"
          placeholder="Search by id"
          value={filter}
          disabled={disabled}
          onChange={(e) => table.setGlobalFilter(e.currentTarget.value)}
          aria-label="Search table data"
        />
        {Boolean(searchParams.keys().toArray().length) && (
          <Button
            variant="outline"
            disabled={disabled}
            onClick={() => {
              setFilter(defFilter)
              setPagination(defPagination)
              setSorting(defSorting)
            }}
          >
            <X />
            Clear Filters
          </Button>
        )}
      </div>
      <div className="bg-background overflow-hidden rounded-md border">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                      className="h-11"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-16 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination disabled={disabled} table={table} />
    </div>
  )
}

export function OverviewTableSkeleton() {
  const query = useTableFilters([
    'page',
    'id',
    'sort_by',
    'sort_direction',
    'per_page'
  ])

  return (
    <OverviewTable
      columns={columnsSkeleton}
      data={Array(Number(query.per_page) || defPagination.pageSize)}
      disabled={true}
      filter={query.id}
      page={query.page}
      page_count="0"
      per_page={query.per_page}
    />
  )
}
