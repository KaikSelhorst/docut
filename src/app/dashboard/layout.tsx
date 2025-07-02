import { DashboardHeader } from '@/components/dashboard-header'
import { SiteFooter } from '@/components/site-footer'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <section className="flex flex-1 flex-col min-h-svh">
      <DashboardHeader />
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </section>
  )
}
