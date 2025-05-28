import { nanoid } from 'nanoid'
import { db } from 'server/db'
import { account, user } from 'server/db/schemas'
import { makePasswordHasher } from 'server/helpers/cryptography/password'
import { env } from 'shared/env'
import { logger } from 'shared/logger'

async function seed() {
  try {
    logger.info('Start seed DB...')

    try {
      const [newUser] = await db
        .insert(user)
        .values({
          name: 'Admin',
          email: env.ADMIN_EMAIL,
          emailVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          id: nanoid()
        })
        .returning()

      await db
        .insert(account)
        .values({
          id: nanoid(),
          accountId: nanoid(),
          userId: newUser!.id,
          providerId: 'credential',
          password: await makePasswordHasher().hash(env.ADMIN_PASSWORD),
          createdAt: new Date(),
          updatedAt: new Date()
        })
        .returning()
    } catch (error) {
      logger.error('Seed - Account exist')
    }

    logger.success('Seed concluided with success!')
  } catch (error) {
    logger.error('Error on start seed:', error)
    process.exit(1)
  } finally {
    process.exit(0)
  }
}
seed()
