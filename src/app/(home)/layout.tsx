import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <section className="flex flex-1 flex-col min-h-svh">
      <SiteHeader />
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </section>
  )
}
