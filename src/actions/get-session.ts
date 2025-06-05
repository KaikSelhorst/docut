import { cookies } from 'next/headers'

export async function getSession() {
  const cookie = await cookies()

  const devName = 'doshort.session_token'
  const prodName = '__Secure-doshort.session_token'

  const name = cookie.has(devName) ? devName : prodName

  const value = cookie.get(name)

  return { key: name, value: value?.value, header: `${name}=${value?.value}` }
}
