import { defineConfig } from 'drizzle-kit'
import { env } from 'shared/env'

export default defineConfig({
  schema: './src/app/api/db/schemas',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: { url: env.DATABASE_URL }
})
