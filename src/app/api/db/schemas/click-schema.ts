import { type InferSelectModel, relations } from 'drizzle-orm'
import { boolean, pgTable, text } from 'drizzle-orm/pg-core'
import { link } from '.'
import { createdAt, updatedAt } from '../helpers'

export const click = pgTable('click', {
  id: text('id').primaryKey(),
  linkId: text('link_id')
    .notNull()
    .references(() => link.id, { onDelete: 'cascade' }),
  ipAddress: text('ip_address').notNull(),
  userAgent: text('user_agent'),
  referer: text('referer'),
  country: text('country'),
  city: text('city'),
  os: text('os'),
  device: text('device'),
  browser: text('browser'),
  isUnique: boolean('is_unique').default(true).notNull(),
  createdAt: createdAt,
  updatedAt: updatedAt
})

export const clickRelations = relations(click, ({ one }) => ({
  link: one(link, { fields: [click.linkId], references: [link.id] })
}))

export type Click = InferSelectModel<typeof click>
