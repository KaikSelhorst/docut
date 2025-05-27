import { drizzle } from 'drizzle-orm/node-postgres'
import { env } from 'shared/env'
import * as schema from './schemas'

export const db = drizzle(env.DATABASE_URL, {
  schema,
  logger: env.DRIZZLE_LOGGER
})
