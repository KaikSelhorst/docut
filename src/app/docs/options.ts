import type { PageTree } from 'fumadocs-core/server'
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import { source } from '@/lib/source'

interface Options extends BaseLayoutProps {
  tree: PageTree.Root
}

export const baseOptions: Options = {
  nav: { title: 'Docut Docs' },
  tree: source.pageTree
}
