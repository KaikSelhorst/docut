'use server'

import { env } from '@/shared/env'
import { getSession } from '../../get-session'
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
  const { header } = await getSession()

  const res = await fetch(`${env.APP_URL}/api/dashboard/link`, {
    method: 'POST',
    headers: { Cookie: header },
    body: JSON.stringify(link)
  })

  if (res.status !== 201) return failure(res)
  return success<Success>(res)
}
