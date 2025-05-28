import { env } from 'shared/env'
import * as schema from './schemas'

import { type NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres'

export type DBInstance = NodePgDatabase<typeof schema>

export const db = drizzle(env.DATABASE_URL, {
  schema,
  logger: env.DRIZZLE_LOGGER
})
