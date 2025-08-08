import { getSessionCookie } from 'better-auth/cookies'
import { type NextRequest, NextResponse } from 'next/server'

const authPages = ['/sign-in', '/sign-up']
const authenticatedPages = ['/dashboard', '/account']

export async function middleware(request: NextRequest) {
  const session = getSessionCookie(request)

  const { pathname } = new URL(request.url)

  if (session && authPages.some((v) => v === pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (
    !session &&
    authenticatedPages.some((page) => pathname.startsWith(page))
  ) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}

export const config = { matcher: ['/dashboard/:path*', '/account/:path*'] }
