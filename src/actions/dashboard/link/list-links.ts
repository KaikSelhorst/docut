'use server'
import { getDefaultHeaders } from '@/actions/get-request-props'
import { failure, success } from '@/actions/response'
import { routes } from '@/actions/routes'

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

  const route = routes.link.list.withSearchParams(filters).toString()

  console.log(route)

  const res = await fetch(route, { headers: reqHeaders })
  console.log(res.status, res.url)
  if (res.status !== 200) return failure(res)
  return success<Success>(res)
}
