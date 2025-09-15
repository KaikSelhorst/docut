'use server'

import { getDefaultHeaders } from '@/actions/get-request-props'
import { failure, success } from '@/actions/response'
import { routes } from '@/actions/routes'

type Success = {
  data: { browser: string | null; total: number }[]
}

export async function getBrowsers() {
  const reqHeaders = await getDefaultHeaders()

  const route = routes.link.getAnalytics
    .withParams({ type: 'browser' })
    .toString()

  const res = await fetch(route, {
    headers: reqHeaders,
    next: { revalidate: 30 }
  })
  if (res.status !== 200) return failure(res)
  return success<Success>(res)
}
