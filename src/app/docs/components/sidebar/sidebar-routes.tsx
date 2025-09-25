import type { PageTree } from 'fumadocs-core/server'
import { BookKey, CircleHelp, KeySquare, type LucideIcon } from 'lucide-react'
import type { ReactNode, SVGProps } from 'react'

interface Content {
  title: string
  href?: string
  Icon: ((props?: SVGProps<any>) => ReactNode) | LucideIcon
  isNew?: boolean
  list: {
    title: string
    href: string
    icon: ((props?: SVGProps<any>) => ReactNode) | LucideIcon
    group?: boolean
    isNew?: boolean
  }[]
}

export function getPageTree(): PageTree.Root {
  return {
    $id: 'root',
    name: 'docs',
    children: [
      {
        type: 'folder',
        root: true,
        name: 'Docs',
        description: 'get started, concepts, and plugins.',
        children: contents.map(contentToPageTree)
      }
    ]
  }
}

function contentToPageTree(content: Content): PageTree.Folder {
  return {
    type: 'folder',
    icon: <content.Icon />,
    name: content.title,
    index: content.href
      ? {
          icon: <content.Icon />,
          name: content.title,
          type: 'page',
          url: content.href
        }
      : undefined,
    children: content.list.map((item) => ({
      type: 'page',
      url: item.href,
      name: item.title,
      icon: <item.icon />
    }))
  }
}

export const contents: Content[] = [
  {
    title: 'Get Started',
    Icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.4em"
        height="1.4em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-1 14H9V8h2zm1 0V8l5 4z"
        />
      </svg>
    ),
    list: [
      {
        title: 'Introduction',
        href: '/docs/introduction',
        icon: () => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            height="1.2em"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M232 48h-64a32 32 0 0 0-32 32v87.73a8.17 8.17 0 0 1-7.47 8.25a8 8 0 0 1-8.53-8V80a32 32 0 0 0-32-32H24a8 8 0 0 0-8 8v144a8 8 0 0 0 8 8h72a24 24 0 0 1 24 23.94a7.9 7.9 0 0 0 5.12 7.55A8 8 0 0 0 136 232a24 24 0 0 1 24-24h72a8 8 0 0 0 8-8V56a8 8 0 0 0-8-8m-24 120h-39.73a8.17 8.17 0 0 1-8.25-7.47a8 8 0 0 1 8-8.53h39.73a8.17 8.17 0 0 1 8.25 7.47a8 8 0 0 1-8 8.53m0-32h-39.73a8.17 8.17 0 0 1-8.25-7.47a8 8 0 0 1 8-8.53h39.73a8.17 8.17 0 0 1 8.25 7.47a8 8 0 0 1-8 8.53m0-32h-39.73a8.17 8.17 0 0 1-8.27-7.47a8 8 0 0 1 8-8.53h39.73a8.17 8.17 0 0 1 8.27 7.47a8 8 0 0 1-8 8.53"
            />
          </svg>
        )
      },
      {
        title: 'FAQ',
        href: '/docs/faq',
        icon: () => <CircleHelp className="w-4 h-4 text-current" />
      }
    ]
  },
  {
    title: 'Setup',
    Icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.3em"
        height="1.3em"
        viewBox="0 0 48 48"
      >
        <path
          fill="currentColor"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="4"
          d="M18 6H8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Zm0 22H8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V30a2 2 0 0 0-2-2ZM40 6H30a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Zm0 22H30a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V30a2 2 0 0 0-2-2Z"
        />
      </svg>
    ),
    list: [
      {
        title: 'Environment variables',
        href: '/docs/setup/environment-variables',
        icon: () => <BookKey className="size-4" />
      }
    ]
  }
]
