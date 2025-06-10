import { listLinks } from '@/actions/dashboard/link'
import { AppSidebar } from '@/components/sidebar/app-sidebar'
import { LinksTable, LinksTableSkeleton } from '@/components/table/links-table'
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

interface PageProps {
  searchParams: Promise<Record<string, string>>
}

export default async function Page({ searchParams }: PageProps) {
  const query = await searchParams
  const linksPromise = listLinks(query)
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
        <main className="p-4 max-w-[2000px] mx-auto w-full">
          <Suspense key={Math.random()} fallback={<LinksTableSkeleton />}>
            <LinksTable linksPromise={linksPromise} />
          </Suspense>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
