'use server'

import { getDefaultHeaders } from '@/actions/get-request-props'
import { env } from '@/shared/env'
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
  const reqHeaders = await getDefaultHeaders()

  const res = await fetch(`${env.BETTER_AUTH_URL}/api/dashboard/link/${id}`, {
    method: 'DELETE',
    headers: reqHeaders
  })

  if (res.status !== 200) return failure(res)
  return success<Success>(res)
}
