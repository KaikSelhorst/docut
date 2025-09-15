'use client'
import { LayoutGrid, LogOut, SunMoon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { signOut, useSession } from 'shared/lib/auth/client'
import { toast } from 'sonner'
import { useTheme } from '@/hooks'
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

export function SiteHeader() {
  const { toggleTheme } = useTheme()
  const router = useRouter()
  const { data: session } = useSession()
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
              <Link href="/dashboard" prefetch={false}>
                <LayoutGrid />
                Dashboard
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <nav className="flex gap-2 text-sm font-medium items-center">
          <Button size="sm" variant="ghost" asChild>
            <Link href="/docs/setup">Docs</Link>
          </Button>
          {session ? (
            <>
              <Button asChild variant="ghost">
                <Link href="/dashboard" prefetch={false}>
                  Dashboard
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="rounded-md">
                    <AvatarImage src={session?.user.image || ''} />
                    <AvatarFallback className="rounded-md">LD</AvatarFallback>
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
                    <Link href="/dashboard" prefetch={false}>
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/account">Account Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={toggleTheme}
                    className="justify-between"
                  >
                    Switch theme <SunMoon />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="justify-between"
                    onSelect={(e) => {
                      e.preventDefault()
                      signOut({
                        fetchOptions: {
                          onRequest: () => {
                            toast.loading('Signing out...')
                          },
                          onSuccess: () => {
                            toast.dismiss()
                            toast.success('Signed out successfully')
                            router.push('/sign-in')
                          },
                          onError: () => {
                            toast.dismiss()
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
            </>
          ) : (
            <>
              <Button asChild variant="outline" size="sm">
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
