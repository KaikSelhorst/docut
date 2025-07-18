import {
  type SQL,
  and,
  asc,
  count,
  desc,
  eq,
  gte,
  ilike,
  isNotNull,
  isNull,
  lt,
  or,
  sql
} from 'drizzle-orm'
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

  async findManyByUserId(
    tx: DBInstance,
    userId: string,
    filters: {
      page: number
      id: string
      per_page: number
      sort_by: string
      sort_direction: 'asc' | 'desc'
    }
  ) {
    const arrFilters: SQL[] = []

    arrFilters.push(eq(link.userId, userId))
    arrFilters.push(
      or(gte(link.expiration, new Date()), isNull(link.expiration)) as SQL
    )

    if (filters.id) {
      arrFilters.push(ilike(link.id, `%${filters.id}%`))
    }

    const safePageSize = filters.per_page || 16
    const safeOffset = (filters.page - 1) * safePageSize

    const sortDirection = filters.sort_direction === 'desc' ? desc : asc

    let orderBy: SQL = sortDirection(link.updatedAt)

    switch (filters.sort_by) {
      case 'clicks':
        orderBy = sortDirection(link.clicks)
        break
      case 'url':
        orderBy = sortDirection(link.url)
        break
      case 'expiration':
        orderBy = sortDirection(link.expiration)
        break
      case 'created_at':
        orderBy = sortDirection(link.createdAt)
        break
      case 'id':
        orderBy = sortDirection(link.createdAt)
        break
      default:
        break
    }

    try {
      const queryPromise = tx
        .select()
        .from(link)
        .where(and(...arrFilters))
        .limit(safePageSize)
        .orderBy(orderBy)
        .offset(safeOffset)

      const totalPromise = tx
        .select({ count: count() })
        .from(link)
        .where(and(...arrFilters))

      const [query, [total]] = await Promise.all([queryPromise, totalPromise])

      return {
        links: query,
        total: total.count,
        per_page: safePageSize,
        total_pages: Math.ceil(total.count / safePageSize)
      }
    } catch {
      return null
    }
  }
  async deleteAllExpiredLinks(tx: DBInstance) {
    try {
      await tx
        .delete(link)
        .where(and(isNotNull(link.id), lt(link.expiration, new Date())))
      return true
    } catch {
      return false
    }
  }
}
