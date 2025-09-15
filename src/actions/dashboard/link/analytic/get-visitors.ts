'use server'

import { getDefaultHeaders } from '@/actions/get-request-props'
import { failure, success } from '@/actions/response'
import { routes } from '@/actions/routes'

type Success = {
  data: { date: string; views: number; visitors: number }[]
}

export async function getVisitors() {
  const reqHeaders = await getDefaultHeaders()

  const route = routes.link.getAnalytics
    .withParams({ type: 'visitors' })
    .toString()

  const res = await fetch(route, {
    headers: reqHeaders,
    next: { revalidate: 30 }
  })
  if (res.status !== 200) return failure(res)
  return success<Success>(res)
}
