'use server'

import { getSession } from '../get-session'
import { failure, success } from '../response'

export async function getLink(id: string) {
  const session = await getSession()

  const res = await fetch(`http://localhost:3000/api/private/link/${id}`, {
    headers: { Cookie: session.header }
  })

  if (res.status !== 200) return failure(res)

  return success<{
    seo: {
      id: string
      title: string | null
      description: string | null
      createdAt: string
      updatedAt: string
      linkId: string
    }
    id: string
    url: string
    expiration: string | null
    createdAt: string
    updatedAt: string
    userId: string
  }>(res)
}
