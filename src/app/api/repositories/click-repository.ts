import type { DBInstance } from '@api/db'
import { type Click, click, link } from '@api/db/schemas'
import type { Logger } from '@api/helpers'
import dayjs from 'dayjs'
import { and, count, desc, eq, gte, sql } from 'drizzle-orm'
import { DEFAULT_LIST_DAYS } from '@/common/constants'

const whereFilter = (userId: string) =>
  and(
    eq(link.userId, userId),
    gte(click.createdAt, dayjs().subtract(DEFAULT_LIST_DAYS, 'day').toDate())
  )

const metricsQueries = {
  visitors: async (tx: DBInstance, userId: string) => {
    const query = await tx.execute(sql`
  WITH dias AS (
    SELECT generate_series(
      CURRENT_DATE - INTERVAL '59 days',
      CURRENT_DATE,
      INTERVAL '1 day'
    )::date AS date
  ),
  user_clicks AS (
    SELECT 
      DATE(t.created_at) as click_date,
      t.is_unique,
      t.id
    FROM ${click} t
    INNER JOIN ${link} l ON t.link_id = l.id
    WHERE l.user_id = ${userId}
  )
  SELECT
    d.date,
    COALESCE(SUM(uc.is_unique::integer), 0) AS visitors,
    COALESCE(COUNT(uc.id), 0) AS views
  FROM
    dias d
  LEFT JOIN
    user_clicks uc ON uc.click_date = d.date
  GROUP BY
    d.date
  ORDER BY
    d.date ASC
`)

    return query.rows
  },
  city: (tx: DBInstance, userId: string) =>
    tx
      .select({
        city: click.city,
        country: click.country,
        total: count()
      })
      .from(click)
      .leftJoin(link, eq(click.linkId, link.id))
      .groupBy(click.city, click.country)
      .where(whereFilter(userId))
      .orderBy(({ total }) => [desc(total)]),
  browser: (tx: DBInstance, userId: string) =>
    tx
      .select({ browser: click.browser, total: count() })
      .from(click)
      .leftJoin(link, eq(click.linkId, link.id))
      .groupBy(click.browser)
      .where(whereFilter(userId))
      .orderBy(({ total }) => [desc(total)]),
  country: (tx: DBInstance, userId: string) =>
    tx
      .select({ country: click.country, total: count() })
      .from(click)
      .leftJoin(link, eq(click.linkId, link.id))
      .groupBy(click.country)
      .where(whereFilter(userId))
      .orderBy(({ total }) => [desc(total)]),
  device: (tx: DBInstance, userId: string) =>
    tx
      .select({ device: click.device, total: count() })
      .from(click)
      .leftJoin(link, eq(click.linkId, link.id))
      .groupBy(click.device)
      .where(whereFilter(userId))
      .orderBy(({ total }) => [desc(total)]),
  os: (tx: DBInstance, userId: string) =>
    tx
      .select({ os: click.os, total: count() })
      .from(click)
      .leftJoin(link, eq(click.linkId, link.id))
      .groupBy(click.os)
      .where(whereFilter(userId))
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
    } catch {
      this.logger.error(
        `Failed to registry for link with ID: ${clickValue.linkId}`
      )
      return false
    }
  }

  async getMetrics(
    tx: DBInstance,
    type: 'country' | 'os' | 'device' | 'browser' | 'city' | 'visitors',
    userId: string
  ) {
    try {
      return await metricsQueries[type](tx, userId)
    } catch {
      this.logger.error(`Failed to get ${type} metrics`)
      return null
    }
  }
}
