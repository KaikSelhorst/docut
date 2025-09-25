import type { PageTree } from 'fumadocs-core/server'
import {
  AlertTriangle,
  BookKey,
  CircleHelp,
  Code,
  KeySquare,
  type LucideIcon,
  Rocket,
  Shield,
  Wrench
} from 'lucide-react'
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
    title: 'Authentication',
    Icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.4em"
        height="1.4em"
        viewBox="0 0 24 24"
      >
        <path
          className="fill-foreground"
          fillRule="evenodd"
          d="M10 4h4c3.771 0 5.657 0 6.828 1.172C22 6.343 22 8.229 22 12c0 3.771 0 5.657-1.172 6.828C19.657 20 17.771 20 14 20h-4c-3.771 0-5.657 0-6.828-1.172C2 17.657 2 15.771 2 12c0-3.771 0-5.657 1.172-6.828C4.343 4 6.229 4 10 4m3.25 5a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75m1 3a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75m1 3a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75M11 9a2 2 0 1 1-4 0a2 2 0 0 1 4 0m-2 8c4 0 4-.895 4-2s-1.79-2-4-2s-4 .895-4 2s0 2 4 2"
          clipRule="evenodd"
        />
      </svg>
    ),
    list: [
      {
        title: 'Overview',
        href: '/docs/authentication/overview',
        icon: () => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            height="1.2em"
            viewBox="0 0 24 24"
          >
            <path
              className="fill-current"
              d="M17 15q-1.05 0-1.775-.725T14.5 12.5t.725-1.775T17 10t1.775.725t.725 1.775t-.725 1.775T17 15m-4 5q-.425 0-.712-.288T12 19v-.4q0-.6.313-1.112t.887-.738q.9-.375 1.863-.562T17 16t1.938.188t1.862.562q.575.225.888.738T22 18.6v.4q0 .425-.288.713T21 20zm-3-8q-1.65 0-2.825-1.175T6 8t1.175-2.825T10 4t2.825 1.175T14 8t-1.175 2.825T10 12m-8 5.2q0-.85.425-1.562T3.6 14.55q1.5-.75 3.113-1.15T10 13q.875 0 1.75.15t1.75.35l-1.7 1.7q-.625.625-1.213 1.275T10 18v.975q0 .3.113.563t.362.462H4q-.825 0-1.412-.587T2 18z"
            />
          </svg>
        )
      },
      {
        title: 'API Keys',
        href: '/docs/authentication/api-keys',
        icon: () => <KeySquare className="w-4 h-4 text-current" />
      },
      {
        title: 'Security',
        href: '/docs/authentication/security',
        icon: () => <Shield className="w-4 h-4 text-current" />
      },
      {
        title: 'Troubleshooting',
        href: '/docs/authentication/troubleshooting',
        icon: () => <AlertTriangle className="w-4 h-4 text-current" />
      }
    ]
  },
  {
    title: 'Development',
    Icon: () => <Code className="w-5 h-5" />,
    list: [
      {
        title: 'Local Setup',
        href: '/docs/development/installation',
        icon: () => <Wrench className="size-4" />
      }
    ]
  },
  {
    title: 'Deploy',
    Icon: () => <Rocket className="w-5 h-5" />,
    list: [
      {
        title: 'Environment Variables',
        href: '/docs/setup/environment-variables',
        icon: () => <BookKey className="size-4" />
      },
      {
        title: 'Deploy to Vercel',
        href: '/docs/setup/deploy/vercel',
        icon: () => <Rocket className="size-4" />
      }
    ]
  }
]
