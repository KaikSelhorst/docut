import { env } from 'shared/env'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/server/db/schemas',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: { url: env.DATABASE_URL }
})
