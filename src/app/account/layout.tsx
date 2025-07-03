import { DashboardHeader } from '@/components/dashboard-header'
import { SiteFooter } from '@/components/site-footer'
import { AccountAside } from './account-aside'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <section className="flex flex-1 flex-col min-h-svh">
      <DashboardHeader />
      <section className="flex flex-1 flex-col">
        <hgroup className="border-y">
          <h1 className="text-3xl font-medium my-10 mx-auto max-w-6xl px-4">
            Account Settings
          </h1>
        </hgroup>
        <section className="lg:flex py-10 mx-auto max-w-6xl px-4 w-full gap-16">
          <AccountAside />
          <main className="flex flex-1 flex-col">{children}</main>
        </section>
      </section>
      <SiteFooter />
    </section>
  )
}
