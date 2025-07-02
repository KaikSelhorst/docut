'use client'
import type { listLinks } from '@/actions/dashboard/link'
import { useTableFilters } from '@/hooks'
import { use } from 'react'
import { columns } from './table/columns'
import { OverviewTable } from './table/data-table'

interface PageClientProps {
  linksPromise: ReturnType<typeof listLinks>
}

export function PageClient({ linksPromise }: PageClientProps) {
  const linksRes = use(linksPromise)

  if (!linksRes.success) {
    return <div>Page Error</div>
  }

  const { links, ...paginate } = linksRes.data

  const query = useTableFilters([
    'page',
    'filter',
    'sort_by',
    'sort_direction',
    'per_page'
  ])

  return (
    <OverviewTable
      columns={columns}
      data={linksRes.data.links}
      page={query.page}
      filter={query.filter}
      sort_by={query.sort_by}
      sort_direction={query.sort_direction}
      page_count={paginate.total_pages}
      per_page={query.per_page}
    />
  )
}
