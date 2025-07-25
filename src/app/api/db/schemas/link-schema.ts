import { type InferSelectModel, relations } from 'drizzle-orm'
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { seo, user } from '.'
import { createdAt, updatedAt } from '../helpers'

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

export const linkRelations = relations(link, ({ one }) => ({
  user: one(user, {
    fields: [link.userId],
    references: [user.id]
  }),
  seo: one(seo, {
    fields: [link.id],
    references: [seo.linkId]
  })
}))

export type Link = InferSelectModel<typeof link>
