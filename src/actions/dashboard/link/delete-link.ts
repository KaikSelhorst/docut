'use server'

import { env } from '@/shared/env'
import { getSession } from '../../get-session'
import { failure, success } from '../../response'

interface Success {
  id: string
  url: string
  expiration: string | null
  createdAt: string
  updatedAt: string
  userId: string
}

export async function deleteLink(id: string) {
  const { header } = await getSession()

  const res = await fetch(`${env.BETTER_AUTH_URL}/api/dashboard/link/${id}`, {
    method: 'DELETE',
    headers: { Cookie: header }
  })

  if (res.status !== 200) return failure(res)
  return success<Success>(res)
}
