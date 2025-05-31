import { and, desc, eq, gte, isNull, or, sql } from 'drizzle-orm'
import type { DBInstance } from '../db'
import { type Link, link, seo } from '../db/schemas/'
import type { LinkRepositoryInterface } from './interfaces/link-repository'

export class LinkRepository implements LinkRepositoryInterface {
  async create(tx: DBInstance, lk: Link) {
    try {
      const query = await tx.insert(link).values(lk).returning()
      return query.length ? query[0] : null
    } catch {
      return null
    }
  }

  async deleteById(tx: DBInstance, id: string) {
    try {
      const query = await tx.delete(link).where(eq(link.id, id)).returning()
      return query.length ? query[0] : null
    } catch {
      return null
    }
  }

  async update(tx: DBInstance, lk: Link) {
    try {
      const query = await tx
        .update(link)
        .set(lk)
        .where(eq(link.id, lk.id))
        .returning()
      return query.length ? query[0] : null
    } catch {
      return null
    }
  }

  async findById(tx: DBInstance, id: string) {
    try {
      const query = await tx.query.link.findFirst({
        where: eq(link.id, id)
      })

      if (!query) return null

      const now = new Date()
      const linkExpiration = new Date(query.expiration || '')

      if (now > linkExpiration) return null

      await tx
        .update(link)
        .set({ clicks: sql`${link.clicks} + 1`, updatedAt: new Date() })
        .where(eq(link.id, id))
      return query ?? null
    } catch {
      return null
    }
  }

  async findByIdWithSeo(tx: DBInstance, id: string) {
    try {
      const query = await tx
        .select()
        .from(link)
        .innerJoin(seo, eq(seo.linkId, link.id))
        .where(eq(link.id, id))
        .limit(1)
      return query.length ? query[0] : null
    } catch {
      return null
    }
  }

  async findManyByUserId(tx: DBInstance, id: string) {
    try {
      const query = await tx
        .select()
        .from(link)
        .where(
          and(
            eq(link.userId, id),
            or(gte(link.expiration, new Date()), isNull(link.expiration))
          )
        )
        .limit(24)
        .orderBy(desc(link.updatedAt))
      return query ?? null
    } catch {
      return null
    }
  }
}
