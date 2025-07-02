'use client'

import { cn } from '@/lib/utils'
import Link, { type LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'

interface DashboardNavbarProps extends React.ComponentProps<'nav'> {}

export function DashboardNavbar({
  children,
  className,
  ...rest
}: DashboardNavbarProps) {
  return (
    <nav
      className={cn(
        'border-b h-[46px] flex items-center px-4 z-10 bg-background sticky top-0',
        className
      )}
      {...rest}
    >
      {children}
    </nav>
  )
}

interface DashboardNavbarLinkProps extends LinkProps {
  children: React.ReactNode
}

export function DashboardNavbarLink({
  children,
  ...props
}: DashboardNavbarLinkProps) {
  const pathname = usePathname()

  const isActive = pathname === props.href

  return (
    <Button
      size="sm"
      variant="ghost"
      data-state={isActive ? 'active' : 'inactive'}
      className="data-[state=active]:after:bg-primary relative after:absolute after:inset-x-0 after:-bottom-[6px] after:h-0.5 data-[state=active]:text-current text-muted-foreground"
      asChild
    >
      <Link {...props}>{children}</Link>
    </Button>
  )
}
