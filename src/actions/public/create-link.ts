'use server'
import { getDefaultHeaders } from '../get-request-props'
import { failure, success } from '../response'
import { routes } from '../routes'

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

  const route = routes.link.postPublic.toString()

  const res = await fetch(route, {
    method: 'POST',
    headers: reqHeaders,
    body: JSON.stringify(link)
  })

  if (res.status !== 201) return failure(res)
  return success<Success>(res)
}
