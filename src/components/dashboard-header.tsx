'use client'
import { useTheme } from '@/hooks'
import { Home, House, LogOut, SunMoon, Zap } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { signOut, useSession } from 'shared/lib/auth/client'
import { toast } from 'sonner'
import { CreateLinkSheet } from './form/create-link-sheet'
import { Logo, LogoSVGText } from './icons/logo'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu'

export function DashboardHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="h-14 px-4 flex justify-between items-center">
      <DropdownMenu open={open} onOpenChange={(b) => setOpen(!b || false)}>
        <DropdownMenuTrigger
          asChild
          onContextMenu={(e) => {
            e.preventDefault()
            setOpen(true)
          }}
        >
          <Link href="/dashboard">
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
            <Link href="/">
              <House />
              Home page
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DashboardHeaderNavbar />
    </header>
  )
}

function DashboardHeaderNavbar() {
  const { data: session, isPending } = useSession()
  const [signingOut, setSigningOut] = useState(false)
  const { toggleTheme } = useTheme()
  const router = useRouter()

  if (isPending) return null

  return (
    <nav className="flex items-center gap-2">
      <Button size="sm" variant="ghost" asChild>
        <Link href="/docs">Docs</Link>
      </Button>
      <CreateLinkSheet side="right">
        <Button size="sm">
          <Zap />
          Shorten link
        </Button>
      </CreateLinkSheet>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="rounded-md">
            <AvatarImage src={session?.user.image || ''} />
            <AvatarFallback>LD</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px]">
          <hgroup>
            <DropdownMenuLabel className="leading-4">
              {session?.user.name}
            </DropdownMenuLabel>
            <p className="text-sm text-muted-foreground px-2 mb-2">
              {session?.user.email}
            </p>
          </hgroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/account/settings">Account Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={toggleTheme} className="justify-between">
            Switch theme <SunMoon />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="justify-between" asChild>
            <Link href="/">
              Home Page
              <Home />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="justify-between"
            disabled={signingOut}
            onSelect={(e) => {
              e.preventDefault()
              signOut({
                fetchOptions: {
                  onRequest: () => {
                    setSigningOut(true)
                    toast.loading('Signing out...')
                  },
                  onSuccess: () => {
                    toast.dismiss()
                    setSigningOut(false)
                    toast.success('Signed out successfully')
                    router.push('/sign-in')
                  },
                  onError: () => {
                    toast.dismiss()
                    setSigningOut(false)
                    toast.error('Failed to sign out')
                  }
                }
              })
            }}
          >
            Logout
            <LogOut />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}
