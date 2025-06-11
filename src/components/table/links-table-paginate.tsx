'use client'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react'
import { Button } from '../ui/button'
import { useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { PerPage } from './filters/per-page-filter'

interface LinksTablePaginateProps {
  total: number
  perPage: number
  totalPages: number
}

export function LinksTablePaginate({
  totalPages,
  perPage,
  total
}: LinksTablePaginateProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const page = useMemo(
    () => Number(searchParams.get('page')) || 1,
    [searchParams]
  )

  const canPrev = page > 1
  const canNext = page < totalPages

  function updatePage(page: number) {
    const query = new URLSearchParams(searchParams)
    query.set('page', String(page))
    router.push(`?${query}`)
  }

  return (
    <div className="flex w-full items-center gap-8">
      <div
        className={cn(
          'text-muted-foreground hidden flex-1 text-sm lg:flex',
          !total && 'invisible'
        )}
      >
        {perPage} of {total} row(s) selected.
      </div>
      <PerPage className={perPage ? '' : 'invisible'} />
      <div
        className={cn(
          'flex w-fit items-center justify-center text-sm font-medium',
          !totalPages && 'invisible'
        )}
      >
        Page {page} of {totalPages}
      </div>
      <div className="ml-auto flex items-center gap-2 lg:ml-0">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          disabled={!canPrev}
          onClick={() => updatePage(1)}
        >
          <span className="sr-only">Go to first page</span>
          <ChevronsLeft />
        </Button>
        <Button
          variant="outline"
          className="size-8"
          size="icon"
          disabled={!canPrev}
          onClick={() => updatePage(page - 1)}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          className="size-8"
          size="icon"
          disabled={!canNext}
          onClick={() => updatePage(page + 1)}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          className="hidden size-8 lg:flex"
          size="icon"
          disabled={!canNext}
          onClick={() => updatePage(totalPages)}
        >
          <span className="sr-only">Go to last page</span>
          <ChevronsRight />
        </Button>
      </div>
    </div>
  )
}
