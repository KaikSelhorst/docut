'use server'

import { getDefaultHeaders } from '@/actions/get-request-props'
import { routes } from '@/actions/routes'
import { failure, success } from '../../response'

interface Success {
  id: string
  url: string
  expiration: string | null
  createdAt: string
  updatedAt: string
  userId: string
}

export async function deleteLink(id: string) {
  const reqHeaders = await getDefaultHeaders()

  const route = routes.link.delete.withParams({ id }).toString()

  const res = await fetch(route, {
    method: 'DELETE',
    headers: reqHeaders
  })

  if (res.status !== 200) return failure(res)
  return success<Success>(res)
}
