import { eq } from 'drizzle-orm'
import { db } from '../db'
import { type Link, link } from '../db/schemas/'

export class LinkRepository {
  async create(lk: Link) {
    try {
      const query = await db.insert(link).values(lk).returning()
      return query.length ? query[0] : null
    } catch {
      return null
    }
  }

  async deleteById(id: string) {
    try {
      const query = await db.delete(link).where(eq(link.id, id)).returning()
      return query.length ? query[0] : null
    } catch {
      return null
    }
  }

  async update(lk: Link) {
    try {
      const query = await db
        .update(link)
        .set(lk)
        .where(eq(link.id, lk.id))
        .returning()
      return query.length ? query[0] : null
    } catch {
      return null
    }
  }

  async findById(id: string) {
    try {
      const query = await db.query.link.findFirst({ where: eq(link.id, id) })
      return query ?? null
    } catch {
      return null
    }
  }

  async findManyByUserId(id: string) {
    try {
      const query = await db.query.link.findMany({ where: eq(link.userId, id) })
      return query ?? null
    } catch {
      return null
    }
  }
}
