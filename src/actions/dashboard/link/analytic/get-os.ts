'use server'

import { getDefaultHeaders } from '@/actions/get-request-props'
import { failure, success } from '@/actions/response'
import { routes } from '@/actions/routes'

type Success = {
  data: { os: string | null; total: number }[]
}

export async function getOs() {
  const reqHeaders = await getDefaultHeaders()

  const route = routes.link.getAnalytics.withParams({ type: 'os' }).toString()

  const res = await fetch(route, { headers: reqHeaders })
  if (res.status !== 200) return failure(res)
  return success<Success>(res)
}
