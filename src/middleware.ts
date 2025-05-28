import { type NextRequest, NextResponse } from 'next/server'
import { getSession } from 'shared/lib/auth/utils'

const authPages = ['/sign-in', '/sign-up']

export async function middleware(request: NextRequest) {
  const session = await getSession()

  const { pathname } = new URL(request.url)

  // Dashboard is the root
  if (!session && pathname === '/') {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  if (session && authPages.some((v) => v === pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  runtime: 'nodejs',
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)'
  ]
}
