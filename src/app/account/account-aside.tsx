'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'General', href: '/account' },
  { label: 'Authentication', href: '/account/authentication' }
]

export function AccountAside() {
  const pathname = usePathname()

  return (
    <nav className="max-w-56 grid w-full text-muted-foreground max-lg:hidden h-fit">
      {links.map(({ href, label }) => (
        <Button
          className={cn('justify-start', pathname === href && 'text-primary')}
          variant="ghost"
          key={href}
          asChild
        >
          <Link href={href}>{label}</Link>
        </Button>
      ))}
    </nav>
  )
}
