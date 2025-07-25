import { type InferSelectModel, relations } from 'drizzle-orm'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { link } from './link-schema'

export const seo = pgTable('seo', {
  id: text('id').primaryKey(),
  title: text('title'),
  description: text('description'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  linkId: text('link_id')
    .notNull()
    .unique()
    .references(() => link.id, { onDelete: 'cascade' })
})

export const seoRelations = relations(seo, ({ one }) => ({
  link: one(link, {
    fields: [seo.linkId],
    references: [link.id]
  })
}))

export type Seo = InferSelectModel<typeof seo>
