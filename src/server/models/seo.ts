import { nanoid } from 'nanoid'
import type { Seo } from 'server/db/schemas'

interface CreateLinkProps {
  title: string | null
  description: string | null
  linkId: string
}

export function createSEO({
  title,
  linkId,
  description
}: CreateLinkProps): Seo {
  return {
    id: nanoid(),
    createdAt: new Date(),
    updatedAt: new Date(),
    description,
    linkId,
    title
  }
}
