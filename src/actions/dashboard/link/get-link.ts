'use server'

import { getDefaultHeaders } from '@/actions/get-request-props'
import { routes } from '@/actions/routes'
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

  const route = routes.link.get.withParams({ id }).toString()

  const res = await fetch(route, { headers: reqHeaders })

  if (res.status !== 200) return failure(res)
  return success<Success>(res)
}
