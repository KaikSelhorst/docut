'use server'

import { getDefaultHeaders } from '@/actions/get-request-props'
import { env } from '@/shared/env'
import { failure, success } from '../../response'

interface Success {
  id: string
  url: string
  clicks: number
  expiration: string | null
  seo: { description: string | null; title: string | null }
  createdAt: string
  updatedAt: string
}

interface Link {
  expiration: string | null
  url: string
  seo: {
    description: string | null
    title: string | null
  }
}

export async function updateLink(id: string, link: Link) {
  const reqHeaders = await getDefaultHeaders()

  const res = await fetch(`${env.BETTER_AUTH_URL}/api/dashboard/link/${id}`, {
    method: 'PUT',
    headers: reqHeaders,
    body: JSON.stringify(link)
  })

  if (res.status !== 200) return failure(res)
  return success<Success>(res)
}
