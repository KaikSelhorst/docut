import { cookies, headers } from 'next/headers'
import { env } from 'shared/env'

async function getSession() {
  const cookie = await cookies()

  const devName = 'better-auth.session_token'
  const prodName = '__Secure-better-auth.session_token'

  const name = cookie.has(devName) ? devName : prodName

  const value = cookie.get(name)

  return `${name}=${value?.value}`
}

async function getUserAgentAndIP() {
  const h = await headers()

  const agent = h.get('user-agent') as string
  const ip =
    env.NODE_ENV === 'development'
      ? '127.168.0.1'
      : (h.get('x-forwarded-for') as string)

  return { ip, agent }
}

export async function getDefaultHeaders() {
  const sessionCookie = await getSession()
  const { agent, ip } = await getUserAgentAndIP()

  const requestHeaders = new Headers()

  requestHeaders.set('Cookie', sessionCookie)
  requestHeaders.set('user-agent', agent)
  requestHeaders.set('x-forwarded-for', ip)

  return requestHeaders
}
