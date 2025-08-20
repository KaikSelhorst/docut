'use server'
import { getDefaultHeaders } from '@/actions/get-request-props'
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
  const reqHeaders = await getDefaultHeaders()

  const query = makeRequestQuery(filters)

  const res = await fetch(`${env.BETTER_AUTH_URL}/api/dashboard/link${query}`, {
    headers: reqHeaders
  })

  if (res.status !== 200) return failure(res)
  return success<Success>(res)
}
