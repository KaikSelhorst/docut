import { getSessionCookie } from 'better-auth/cookies'
import { type NextRequest, NextResponse } from 'next/server'

const ROUTES = {
  auth: ['/sign-in', '/sign-up', '/reset-password', '/forgot-password'],
  protected: ['/dashboard', '/account']
} as const

export async function middleware(request: NextRequest) {
  const session = getSessionCookie(request)
  const { pathname } = request.nextUrl

  // @ts-expect-error typescript LOL
  if (session && ROUTES.auth.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (!session && ROUTES.protected.some((page) => pathname.startsWith(page))) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/sign-in/:path*',
    '/sign-up/:path*',
    '/reset-password/:path*',
    '/forgot-password/:path*',
    '/dashboard/:path*',
    '/account/:path*'
  ]
}
