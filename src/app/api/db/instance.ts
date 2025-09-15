import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres'
import { env } from 'shared/env'
import * as schema from './schemas'

export type DBInstance = NodePgDatabase<typeof schema>

export const db = drizzle(env.DATABASE_URL, {
  schema,
  logger: env.DRIZZLE_LOGGER
})
