'use server'

import { env } from '@/shared/env'
import { getDefaultHeaders } from '../get-request-props'
import { failure, success } from '../response'

interface Success {
  id: string
  url: string
  expiration: string | null
}

interface Link {
  expiration: string | null
  url: string
  seo: {
    description: string | null
    title: string | null
  }
}

export async function createLink(link: Link) {
  const reqHeaders = await getDefaultHeaders()

  const res = await fetch(`${env.BETTER_AUTH_URL}/api/link`, {
    method: 'POST',
    headers: reqHeaders,
    body: JSON.stringify(link)
  })

  if (res.status !== 201) return failure(res)
  return success<Success>(res)
}
