import { Suspense } from 'react'
import { listLinks } from '@/actions/dashboard/link'
import {
  DashboardNavbar,
  DashboardNavbarLink
} from '@/components/dashboard-navbar'
import { PageClient } from './page-client'
import { OverviewTableSkeleton } from './table/data-table'

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>
}

export default async function Page({ searchParams }: PageProps) {
  const search = await searchParams

  const linksRes = listLinks(search)

  return (
    <>
      <DashboardNavbar>
        <DashboardNavbarLink href="/dashboard">Overview</DashboardNavbarLink>
        <DashboardNavbarLink href="/dashboard/analytics">
          Analytics
        </DashboardNavbarLink>
      </DashboardNavbar>
      <div className="px-4 container mx-auto my-6">
        <Suspense
          fallback={<OverviewTableSkeleton />}
          key={JSON.stringify(search)}
        >
          <PageClient linksPromise={linksRes} />
        </Suspense>
      </div>
    </>
  )
}
