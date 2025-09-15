import { type InferSelectModel, relations } from 'drizzle-orm'
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createdAt, updatedAt } from '../helpers'
import { click, seo, user } from '.'

export const link = pgTable('link', {
  id: text('id').primaryKey(),
  url: text('url').notNull(),
  expiration: timestamp('expiration').$type<Date | null>(),
  createdAt: createdAt,
  updatedAt: updatedAt,
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  clicks: integer('click').notNull().default(0)
})

export const linkRelations = relations(link, ({ one, many }) => ({
  user: one(user, {
    fields: [link.userId],
    references: [user.id]
  }),
  seo: one(seo, {
    fields: [link.id],
    references: [seo.linkId]
  }),
  clicks: many(click)
}))

export type Link = InferSelectModel<typeof link>
