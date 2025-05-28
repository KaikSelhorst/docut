import { eq } from 'drizzle-orm'
import type { DBInstance } from '../db'
import { seo, type Seo } from '../db/schemas/seo-schema'
import type { SeoRepositoryInterface } from './interfaces/seo-repository'

export class SeoRepository implements SeoRepositoryInterface {
  async create(tx: DBInstance, s: Seo) {
    try {
      const query = await tx.insert(seo).values(s).returning()
      return query.length ? query[0] : null
    } catch {
      return null
    }
  }

  async update(tx: DBInstance, s: Seo) {
    try {
      const query = await tx
        .update(seo)
        .set(s)
        .where(eq(seo.id, s.id))
        .returning()

      return query.length ? query[0] : null
    } catch {
      return null
    }
  }

  async findByLinkId(tx: DBInstance, id: string) {
    try {
      const query = await tx.query.seo.findFirst({ where: eq(seo.linkId, id) })
      return query ?? null
    } catch {
      return null
    }
  }

  async deleteByLinkId(tx: DBInstance, id: string) {
    try {
      const query = await tx.delete(seo).where(eq(seo.linkId, id))
      return query ?? null
    } catch {
      return null
    }
  }
}
