'use server'

import { getSession } from '@/actions/get-session'
import { makeRequestQuery } from '@/actions/request'
import { failure, success } from '@/actions/response'
import { env } from '@/shared/env'

interface Link {
  id: string
  url: string
  clicks: number
  expiration: string | null
  createdAt: string
  updatedAt: string
}

interface Paginate {
  per_page: number
  total: number
  total_pages: number
}

interface Success extends Paginate {
  links: Link[]
}

export async function listLinks(filters: Record<string, string | undefined>) {
  const { header } = await getSession()

  const query = makeRequestQuery(filters)

  const res = await fetch(`${env.BETTER_AUTH_URL}/api/private/link${query}`, {
    headers: { Cookie: header }
  })

  if (res.status !== 200) return failure(res)
  return success<Success>(res)
}
