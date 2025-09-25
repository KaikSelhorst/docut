import defaultMdxComponents from 'fumadocs-ui/mdx'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CodeBlock, Pre } from '@/components/ui/code-block'
import { source } from '@/lib/source'
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle
} from '../components/page/server'

interface PageCompProps {
  params: Promise<{ slug?: string[] }>
}

export default async function Page({ params }: PageCompProps) {
  const { slug } = await params
  const page = source.getPage(slug)

  if (!page) return notFound()

  const MDX = page.data.body

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{
        header: <div className="w-10 h-4" />
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={{
            ...defaultMdxComponents,
            pre: (props) => (
              <CodeBlock {...props}>
                <div style={{ minWidth: '100%', display: 'table' }}>
                  <Pre className="py-3 bg-fd-muted focus-visible:outline-none">
                    {props.children}
                  </Pre>
                </div>
              </CodeBlock>
            )
          }}
        />
      </DocsBody>
    </DocsPage>
  )
}

export async function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(
  props: PageProps<'/docs/[[...slug]]'>
): Promise<Metadata> {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description
  }
}
