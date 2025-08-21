import type { DBInstance } from '@api/db'
import { type Click, click } from '@api/db/schemas'
import type { Logger } from '@api/helpers'
import { and, eq, sql } from 'drizzle-orm'

export class ClickRepository {
  constructor(private readonly logger: Logger) {}

  async registerClick(tx: DBInstance, clickValue: Omit<Click, 'isUnique'>) {
    try {
      const recentClick = await tx.$count(
        click,
        and(
          eq(click.linkId, clickValue.linkId),
          eq(click.ipAddress, clickValue.ipAddress),
          sql`${click.createdAt} >= now() - interval '24 hours'`
        )
      )

      await tx.insert(click).values({ ...clickValue, isUnique: !recentClick })
      return true
    } catch (e) {
      this.logger.error(
        `Failed to registry for link with ID: ${clickValue.linkId}`
      )
      return false
    }
  }
}
