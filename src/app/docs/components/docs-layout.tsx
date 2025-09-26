import type { PageTree } from 'fumadocs-core/server'
import {
  type PageStyles,
  StylesProvider,
  TreeContextProvider
} from 'fumadocs-ui/provider'
import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Sidebar } from './sidebar'

export interface DocsLayoutProps {
  tree: PageTree.Root
  children: React.ReactNode
  containerProps?: HTMLAttributes<HTMLDivElement>
  className?: string
}

export function DocsLayout({ children, ...props }: DocsLayoutProps): ReactNode {
  const variables = cn(
    '[--fd-tocnav-height:36px] md:[--fd-sidebar-width:268px]',
    'lg:[--fd-sidebar-width:286px]',
    'xl:[--fd-toc-width:286px] xl:[--fd-tocnav-height:0px]'
  )

  const pageStyles: PageStyles = {
    tocNav: cn('xl:hidden'),
    toc: cn('max-xl:hidden')
  }

  const { className, ...containerProps } = props

  return (
    <TreeContextProvider tree={props.tree}>
      <main
        id="nd-docs-layout"
        className={cn(
          'flex flex-1 flex-row pe-(--fd-layout-offset)',
          variables,
          className
        )}
        style={
          {
            '--fd-layout-offset':
              'max(calc(50vw - var(--fd-layout-width) / 2), 0px)',
            ...props.containerProps?.style
          } as object
        }
        {...containerProps}
      >
        <div
          className={cn(
            '[--fd-tocnav-height:36px]',
            'md:mr-[268px] lg:mr-[286px]',
            'xl:[--fd-toc-width:286px] xl:[--fd-tocnav-height:0px]'
          )}
        >
          <Sidebar />
        </div>
        <StylesProvider {...pageStyles}>{children}</StylesProvider>
      </main>
    </TreeContextProvider>
  )
}
