'use server'

import { getDefaultHeaders } from '@/actions/get-request-props'
import { routes } from '@/actions/routes'
import { failure, success } from '../../response'

interface Success {
  id: string
  url: string
  clicks: number
  expiration: string | null
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

export async function createLink(link: Link) {
  const reqHeaders = await getDefaultHeaders()

  const route = routes.link.post.toString()

  const res = await fetch(route, {
    method: 'POST',
    headers: reqHeaders,
    body: JSON.stringify(link)
  })

  if (res.status !== 201) return failure(res)
  return success<Success>(res)
}
