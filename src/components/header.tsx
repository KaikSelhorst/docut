'use client'

import { useSession } from '@/shared/lib/auth/client'
import Link from 'next/link'

export function Header() {
  const { isPending, data: session } = useSession()

  return (
    <header className="border-b">
      <div className="container mx-auto h-16 flex items-center justify-between">
        <h1 className="font-mono font-semibold">doshort</h1>
        <p className="text-sm">{isPending ? '...' : session?.user.name}</p>
        <Link
          href="/"
          className="text-sm font-medium text-primary hover:text-primary/80 duration-150"
        >
          {isPending ? '' : session?.user.name.split(' ')[0]}
          {!isPending && session?.user ? '' : 'Login'}
        </Link>
      </div>
    </header>
  )
}
