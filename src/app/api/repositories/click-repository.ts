import { DEFAULT_LIST_DAYS } from '@/common/constants'
import type { DBInstance } from '@api/db'
import { type Click, click } from '@api/db/schemas'
import type { Logger } from '@api/helpers'
import dayjs from 'dayjs'
import { and, count, desc, eq, gte, sql } from 'drizzle-orm'

const metricsQueries = {
  visitors: async (tx: DBInstance) => {
    const query = await tx.execute(sql`
  WITH dias AS (
    SELECT generate_series(
      CURRENT_DATE - INTERVAL '59 days',
      CURRENT_DATE,
      INTERVAL '1 day'
    )::date AS date
  )
  SELECT
    d.date,
    COALESCE(SUM(t.is_unique::integer), 0) AS visitors,
    COALESCE(COUNT(t.id), 0) AS views
  FROM
    dias d
  LEFT JOIN
    ${click} t ON DATE(t.created_at) = d.date
  GROUP BY
    d.date
  ORDER BY
    d.date ASC
`)

    return query.rows
  },
  city: (tx: DBInstance) =>
    tx
      .select({ city: click.city, country: click.country, total: count() })
      .from(click)
      .groupBy(click.city, click.country)
      .where(
        gte(
          click.createdAt,
          dayjs().subtract(DEFAULT_LIST_DAYS, 'day').toDate()
        )
      )
      .orderBy(({ total }) => [desc(total)]),
  browser: (tx: DBInstance) =>
    tx
      .select({ browser: click.browser, total: count() })
      .from(click)
      .groupBy(click.browser)
      .where(
        gte(
          click.createdAt,
          dayjs().subtract(DEFAULT_LIST_DAYS, 'day').toDate()
        )
      )
      .orderBy(({ total }) => [desc(total)]),
  country: (tx: DBInstance) =>
    tx
      .select({ country: click.country, total: count() })
      .from(click)
      .groupBy(click.country)
      .where(
        gte(
          click.createdAt,
          dayjs().subtract(DEFAULT_LIST_DAYS, 'day').toDate()
        )
      )
      .orderBy(({ total }) => [desc(total)]),
  device: (tx: DBInstance) =>
    tx
      .select({ device: click.device, total: count() })
      .from(click)
      .groupBy(click.device)
      .where(
        gte(
          click.createdAt,
          dayjs().subtract(DEFAULT_LIST_DAYS, 'day').toDate()
        )
      )
      .orderBy(({ total }) => [desc(total)]),
  os: (tx: DBInstance) =>
    tx
      .select({ os: click.os, total: count() })
      .from(click)
      .groupBy(click.os)
      .where(
        gte(
          click.createdAt,
          dayjs().subtract(DEFAULT_LIST_DAYS, 'day').toDate()
        )
      )
      .orderBy(({ total }) => [desc(total)])
}

export class ClickRepository {
  constructor(private readonly logger: Logger) {}

  async registerClick(
    tx: DBInstance,
    clickValue: Omit<Click, 'isUnique'> & { isUnique?: boolean }
  ) {
    try {
      const recentClick = await tx.$count(
        click,
        and(
          eq(click.linkId, clickValue.linkId),
          eq(click.ipAddress, clickValue.ipAddress),
          sql`${click.createdAt} >= now() - interval '24 hours'`
        )
      )

      const isUnique =
        clickValue.isUnique !== undefined ? clickValue.isUnique : !recentClick

      await tx.insert(click).values({
        ...clickValue,
        isUnique
      })
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
    type: 'country' | 'os' | 'device' | 'browser' | 'city' | 'visitors'
  ) {
    try {
      return await metricsQueries[type](tx)
    } catch {
      this.logger.error(`Failed to get ${type} metrics`)
      return null
    }
  }
}
