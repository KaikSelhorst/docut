import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { user } from './user-schema'
import type { InferSelectModel } from 'drizzle-orm'

export const link = pgTable('link', {
  id: text('id').primaryKey(),
  url: text('url').notNull(),
  expiration: timestamp('expiration').$type<Date | null>(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  userId: text('project_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' })
})

export type Link = InferSelectModel<typeof link>
