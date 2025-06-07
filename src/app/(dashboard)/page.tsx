import { AppSidebar } from '@/components/sidebar/app-sidebar'
import { LinksTable, LinksTableSkeleton } from '@/components/table/links-table'
import { LinksTableFilter } from '@/components/table/links-table-filter'
import { LinksTablePaginate } from '@/components/table/links-table-paginate'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage
} from '@/components/ui/breadcrumb'

import { Separator } from '@/components/ui/separator'

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { generateMetadata } from '@/helpers/generate-metadata'
import { Suspense } from 'react'

export const metadata = generateMetadata()

export default function Page() {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Shortened links</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="p-4 space-y-3 max-w-[2000px] mx-auto w-full">
          <LinksTableFilter />
          <Suspense fallback={<LinksTableSkeleton />}>
            <LinksTable />
          </Suspense>
          <LinksTablePaginate />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
