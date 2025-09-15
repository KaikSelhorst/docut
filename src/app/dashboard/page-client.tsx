'use client'
import { use } from 'react'
import type { listLinks } from '@/actions/dashboard/link'
import { useTableFilters } from '@/hooks'
import { columns } from './table/columns'
import { OverviewTable } from './table/data-table'

interface PageClientProps {
  linksPromise: ReturnType<typeof listLinks>
}

export function PageClient({ linksPromise }: PageClientProps) {
  const linksRes = use(linksPromise)

  const query = useTableFilters([
    'page',
    'id',
    'sort_by',
    'sort_direction',
    'per_page'
  ])

  if (!linksRes.success) {
    return <div>Page Error</div>
  }

  const { links, ...paginate } = linksRes.data

  return (
    <OverviewTable
      columns={columns}
      data={links}
      page={query.page}
      filter={query.id}
      sort_by={query.sort_by}
      sort_direction={query.sort_direction}
      page_count={paginate.total_pages}
      per_page={query.per_page}
    />
  )
}
