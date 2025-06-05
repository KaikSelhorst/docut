import { cookies } from 'next/headers'

export async function getSession() {
  const cookie = await cookies()

  const name = 'better-auth.session_token'

  const value = cookie.get(name)

  return { key: name, value: value?.value, header: `${name}=${value?.value}` }
}
