'use server'

import { env } from '@/shared/env'
import { getSession } from '../get-session'
import { failure, success } from '../response'

export async function deleteLink(id: string) {
  const session = await getSession()

  const res = await fetch(`${env.BETTER_AUTH_URL}/api/private/link/${id}`, {
    headers: { Cookie: session.header },
    method: 'DELETE'
  })
  await new Promise((r) => setTimeout(r, 3000))

  if (res.status !== 200) return failure(res)

  return success<{
    id: string
    url: string
    expiration: string | null
    createdAt: string
    updatedAt: string
    userId: string
  }>(res)
}
