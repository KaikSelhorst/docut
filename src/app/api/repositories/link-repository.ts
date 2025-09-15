import type { DBInstance } from '@api/db'
import { type Link, link } from '@api/db/schemas'
import {
  and,
  asc,
  desc,
  eq,
  gte,
  ilike,
  isNotNull,
  isNull,
  lt,
  or,
  type SQL,
  sql
} from 'drizzle-orm'

interface FiltersOptions {
  page: number
  id: string
  per_page: number
  sort_by: string
  sort_direction: 'asc' | 'desc'
}

class LinkRepository {
  async findById(tx: DBInstance, id: string) {
    try {
      const value = await tx.query.link.findFirst({
        with: { seo: true },
        where: eq(link.id, id)
      })

      if (!value) return null

      const now = new Date()
      const linkExpiration = new Date(value.expiration || '')

      if (now > linkExpiration) return null

      return value || null
    } catch {
      return null
    }
  }

  async updateLinkClick(tx: DBInstance, linkId: string) {
    try {
      const [value] = await tx
        .update(link)
        .set({ clicks: sql`${link.clicks} + 1` })
        .where(eq(link.id, linkId))
        .returning()

      return value
    } catch {
      return null
    }
  }

  async deleteById(tx: DBInstance, linkId: string) {
    try {
      const [value] = await tx
        .delete(link)
        .where(eq(link.id, linkId))
        .returning({ id: link.id })
      return value
    } catch {
      return null
    }
  }

  async update(tx: DBInstance, linkData: Link) {
    try {
      const [value] = await tx
        .update(link)
        .set(linkData)
        .where(eq(link.id, linkData.id))
        .returning()
      return value
    } catch {
      return null
    }
  }

  async create(tx: DBInstance, linkData: Link) {
    try {
      const [value] = await tx.insert(link).values(linkData).returning()
      return value
    } catch {
      return null
    }
  }

  async findManyByUserId(
    tx: DBInstance,
    userId: string,
    filters: FiltersOptions
  ) {
    const filtersArr: SQL[] = []

    filtersArr.push(eq(link.userId, userId))
    filtersArr.push(
      or(gte(link.expiration, new Date()), isNull(link.expiration)) as SQL
    )

    if (filters.id) {
      filtersArr.push(ilike(link.id, `%${filters.id}%`))
    }

    const sortDirection = filters.sort_direction === 'desc' ? desc : asc

    const safePageSize = filters.per_page || 16
    const safeOffset = (filters.page - 1) * safePageSize

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
      const valuesPromise = tx.query.link.findMany({
        columns: { userId: false },
        with: { seo: { columns: { title: true, description: true } } },
        where: and(...filtersArr),
        limit: safePageSize,
        orderBy: orderBy,
        offset: safeOffset
      })

      const totalPromise = tx.$count(link, and(...filtersArr))

      const [links, count] = await Promise.all([valuesPromise, totalPromise])

      return {
        links,
        total: count,
        per_page: safePageSize,
        total_pages: Math.ceil(count / safePageSize)
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

export { LinkRepository }
