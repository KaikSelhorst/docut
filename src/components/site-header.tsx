'use client'
import { LayoutGrid } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import { Logo, LogoSVGText } from './icons/logo'
import { ModeSwitcher } from './mode-switcher'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu'

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b h-14 flex items-center">
      <div className="container mx-auto px-3 sm:px-0 flex justify-between items-center">
        <DropdownMenu open={open} onOpenChange={(b) => setOpen(!b || false)}>
          <DropdownMenuTrigger
            asChild
            onContextMenu={(e) => {
              e.preventDefault()
              setOpen(true)
            }}
          >
            <Link href="/">
              <Logo size={36} />
            </Link>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(LogoSVGText)
                toast.success('Copied Logo SVG to clipboard.')
                setOpen(false)
              }}
            >
              <Logo />
              Copy Logo as SVG
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard">
                <LayoutGrid />
                Dashboard
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <nav className="flex gap-2 text-sm font-medium">
          <Button size="sm" variant="ghost" asChild>
            <Link href="/docs">Docs</Link>
          </Button>
          <Button size="sm" variant="ghost" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <ModeSwitcher />
        </nav>
      </div>
    </header>
  )
}
