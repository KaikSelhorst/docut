'use server'

import { getDefaultHeaders } from '@/actions/get-request-props'
import { env } from '@/shared/env'
import { failure, success } from '../../response'

interface Success {
  expiration: string | null
  url: string
  seo: {
    description: string | null
    title: string | null
  }
}

export async function getLink(id: string) {
  const reqHeaders = await getDefaultHeaders()

  const res = await fetch(`${env.BETTER_AUTH_URL}/api/dashboard/link/${id}`, {
    headers: reqHeaders
  })

  if (res.status !== 200) return failure(res)
  return success<Success>(res)
}
