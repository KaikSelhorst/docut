'use server'

import { env } from 'shared/env'
import { getDefaultHeaders } from '../get-request-props'
import { failure, success } from '../response'

export async function getPublicLink({ hash }: { hash: string }) {
  const headers = await getDefaultHeaders()
  const res = await fetch(`${env.BETTER_AUTH_URL}/api/link/${hash}`, {
    headers: headers
  })

  if (res.status !== 200) return failure(res)

  return success<{ url: string }>(res)
}
