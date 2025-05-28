import type { DBInstance } from '@/server/db'
import type { Seo } from '@/server/db/schemas/seo-schema'

export interface SeoRepositoryInterface {
  create: (tx: DBInstance, s: Seo) => Promise<Seo | null>
  update: (tx: DBInstance, s: Seo) => Promise<Seo | null>
  findByLinkId: (tx: DBInstance, id: string) => Promise<Seo | null>
  deleteByLinkId: (tx: DBInstance, id: string) => Promise<Seo | null>
}
