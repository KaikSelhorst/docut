import { nanoid } from 'nanoid'
import type { Link } from 'server/db/schemas'

interface CreateLinkProps {
  url: string
  expiration: Date | null
  userId: string
}

export function createLink({ url, expiration, userId }: CreateLinkProps): Link {
  return {
    id: nanoid(9),
    clicks: 0,
    createdAt: new Date(),
    expiration: expiration,
    updatedAt: new Date(),
    url: url,
    userId: userId
  }
}
