'use server'

import { env } from '@/shared/env'
import { getSession } from '../../get-session'
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
  const { header } = await getSession()

  const res = await fetch(`${env.BETTER_AUTH_URL}/api/dashboard/link/${id}`, {
    headers: { Cookie: header }
  })

  if (res.status !== 200) return failure(res)
  return success<Success>(res)
}
