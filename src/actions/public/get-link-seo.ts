'use server'

import { env } from '@/shared/env'
import { failure, success } from '../response'

export async function getLinkSeo(hash: string) {
  const res = await fetch(`${env.BETTER_AUTH_URL}/api/link/${hash}/seo`)

  if (res.status !== 200) return failure(res)

  return success<{
    id: string
    title: string | null
    description: string | null
    createdAt: Date
    updatedAt: Date
    linkId: string
  }>(res)
}
