import { type NextRequest, NextResponse } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'

const authPages = ['/sign-in', '/sign-up']

export async function middleware(request: NextRequest) {
  const session = getSessionCookie(request)

  const { pathname } = new URL(request.url)

  if (session && authPages.some((v) => v === pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!session && pathname === '/') {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)'
  ]
}
