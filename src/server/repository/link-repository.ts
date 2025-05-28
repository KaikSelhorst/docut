import { eq } from 'drizzle-orm'
import type { DBInstance } from '../db'
import { type Link, link } from '../db/schemas/'
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
      const query = await tx.query.link.findFirst({ where: eq(link.id, id) })
      return query ?? null
    } catch {
      return null
    }
  }

  async findManyByUserId(tx: DBInstance, id: string) {
    try {
      const query = await tx.query.link.findMany({ where: eq(link.userId, id) })
      return query ?? null
    } catch {
      return null
    }
  }
}
