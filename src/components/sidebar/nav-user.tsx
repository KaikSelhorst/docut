'use client'

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar'
import { signOut, useSession } from '@/shared/lib/auth/client'
import { toast } from 'sonner'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export function NavUser() {
  const router = useRouter()
  const { isMobile } = useSidebar()
  const { isPending, data: session } = useSession()
  const [signingOut, setSigningOut] = useState(false)

  if (isPending) return null

  const user = {
    avatar: session?.user.image || '',
    name: session?.user.name,
    email: session?.user.email,
    fallback: (session?.user.name || '  ').slice(0, 2).toUpperCase()
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              tooltip="Account"
              size="lg"
              className={cn(
                'data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground',
                signingOut && 'animate-pulse'
              )}
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {user.fallback}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {user.fallback}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              disabled={signingOut}
              onClick={() =>
                signOut({
                  fetchOptions: {
                    onRequest: () => {
                      setSigningOut(true)
                      toast.loading('Signing out...')
                    },
                    onSuccess: () => {
                      setSigningOut(false)
                      toast.success('Signed out successfully')
                      toast.dismiss()
                      router.push('/sign-in')
                    },
                    onError: () => {
                      setSigningOut(false)
                      toast.error('Failed to sign out')
                    }
                  }
                })
              }
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
