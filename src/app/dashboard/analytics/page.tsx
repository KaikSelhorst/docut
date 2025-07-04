import {
  DashboardNavbar,
  DashboardNavbarLink
} from '@/components/dashboard-navbar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <DashboardNavbar>
        <DashboardNavbarLink href="/dashboard">Overview</DashboardNavbarLink>
        <DashboardNavbarLink href="/dashboard/analytics">
          Analytics
        </DashboardNavbarLink>
      </DashboardNavbar>
      <section className="grow flex justify-center items-center">
        <div className="max-w-xl text-center space-y-4">
          <Badge variant="outline" className="gap-1.5">
            <span
              className="size-1.5 rounded-full bg-yellow-500"
              aria-hidden="true"
            />
            Working in Progress
          </Badge>
          <hgroup>
            <h1 className="text-4xl leading-14 text-center font-medium">
              We’re working on this!
            </h1>
            <p className="text-muted-foreground">
              This feature is currently under development and will be available
              soon.
            </p>
          </hgroup>
          <p className="text-muted-foreground italic">
            In the meantime, feel free to explore other parts of the dashboard.
          </p>
          <nav className="flex gap-2 justify-center">
            <Button asChild>
              <Link href="/dashboard">
                <ArrowLeft />
                Back to Dashboard
              </Link>
            </Button>
          </nav>
        </div>
      </section>
    </>
  )
}
