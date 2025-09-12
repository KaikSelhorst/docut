import type { DBInstance } from '@api/db'
import { type Click, click } from '@api/db/schemas'
import type { Logger } from '@api/helpers'
import { and, count, eq, sql } from 'drizzle-orm'

const metricsQueries = {
  city: (tx: DBInstance) =>
    tx
      .select({ city: click.city, country: click.country, total: count() })
      .from(click)
      .groupBy(click.city, click.country),
  browser: (tx: DBInstance) =>
    tx
      .select({ browser: click.browser, total: count() })
      .from(click)
      .groupBy(click.browser),
  country: (tx: DBInstance) =>
    tx
      .select({ country: click.country, total: count() })
      .from(click)
      .groupBy(click.country),
  device: (tx: DBInstance) =>
    tx
      .select({ device: click.device, total: count() })
      .from(click)
      .groupBy(click.device),
  os: (tx: DBInstance) =>
    tx.select({ os: click.os, total: count() }).from(click).groupBy(click.os)
}

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

  async getMetrics(
    tx: DBInstance,
    type: 'country' | 'os' | 'device' | 'browser' | 'city'
  ) {
    try {
      return await metricsQueries[type](tx)
    } catch {
      this.logger.error(`Failed to get ${type} metrics`)
      return null
    }
  }
}
