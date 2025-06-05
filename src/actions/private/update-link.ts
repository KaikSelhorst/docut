'use server'

import { getSession } from '../get-session'
import { failure, success } from '../response'

export async function updateLink(
  id: string,
  params: {
    url: string
    expiration: null | string
    seo: { title: string | null; description: string | null }
  }
) {
  const session = await getSession()

  const res = await fetch(`http://localhost:3000/api/private/link/${id}`, {
    method: 'PATCH',
    headers: { Cookie: session.header },
    body: JSON.stringify(params)
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
