import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { DocsLayout } from './components/docs-layout'
import { baseOptions } from './options'

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <section className="flex flex-1 flex-col min-h-svh">
      <SiteHeader className="fixed w-full bg-background z-10" />
      <main className="flex flex-1 flex-col mt-[56px]">
        <DocsLayout {...baseOptions}>{children}</DocsLayout>
      </main>
      <SiteFooter />
    </section>
  )
}
