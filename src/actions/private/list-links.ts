'use server'

import { env } from '@/shared/env'
import { getSession } from '../get-session'
import { makeRequestQuery } from '../request'
import { failure, success } from '../response'

export async function listLinks(filters: Record<string, string>) {
  const session = await getSession()

  const query = makeRequestQuery(filters)

  const res = await fetch(`${env.BETTER_AUTH_URL}/api/private/link${query}`, {
    headers: { Cookie: session.header }
  })

  if (res.status !== 200) return failure(res)

  return success<{
    links: {
      id: string
      createdAt: Date
      updatedAt: Date
      userId: string
      url: string
      clicks: number
      expiration: string | null
    }[]
    total: number
    per_page: number
    total_pages: number
  }>(res)
}
