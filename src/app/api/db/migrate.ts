import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { logger } from 'shared/logger'
import { db } from './instance'

async function main() {
  logger.info('Starting database migration...')

  try {
    await migrate(db, { migrationsFolder: 'drizzle/migrations' })
    logger.success('Migration completed successfully.')
  } catch (error: unknown) {
    logger.error('Migration failed!')
    if (error instanceof Error) {
      logger.error(`Error details: ${error.message}`)
    } else {
      logger.error(`Error details: ${String(error)}`)
    }
    process.exit(1)
  }
  process.exit(0)
}

main()
