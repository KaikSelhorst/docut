import type { DBInstance } from '@api/db'
import { type Seo, seo } from '@api/db/schemas'
import { eq } from 'drizzle-orm'

class SeoRepository {
  async findByLinkId(tx: DBInstance, linkID: string) {
    // TODO: Verify if link is expired
    try {
      const value = await tx.query.seo.findFirst({
        where: eq(seo.linkId, linkID)
      })
      return value || null
    } catch {
      return null
    }
  }

  async create(tx: DBInstance, seoData: Seo) {
    try {
      const [value] = await tx.insert(seo).values(seoData).returning()
      return value
    } catch {
      return null
    }
  }

  async update(tx: DBInstance, seoData: Seo) {
    try {
      const [value] = await tx
        .update(seo)
        .set(seoData)
        .where(eq(seo.id, seoData.id))
        .returning()

      return value
    } catch {
      return null
    }
  }
}

export { SeoRepository }
