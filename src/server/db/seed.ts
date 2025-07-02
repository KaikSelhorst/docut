import { faker } from '@faker-js/faker'
import { nanoid } from 'nanoid'
import { db } from 'server/db'
import {
  account,
  link,
  seo,
  session,
  user,
  verification
} from 'server/db/schemas'
import { makePasswordHasher } from 'server/helpers/cryptography/password'
import { env } from 'shared/env'
import { logger } from 'shared/logger'
import { LinkRepository } from '../repository/link-repository'
import { SeoRepository } from '../repository/seo-repository'

async function seed() {
  const linkRepository = new LinkRepository()
  const seoRepository = new SeoRepository()

  const error = await db.transaction(async (tx) => {
    try {
      const tables = [user, link, account, seo, session, verification]

      for (let i = 0; i < tables.length; i++) {
        const table = tables[i]
        await tx.delete(table)
      }

      const [newUser] = await tx
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

      await tx
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

      const links = Array(100)
        .fill('')
        .map(() => ({
          id: nanoid(9),
          url: faker.internet.url(),
          expiration: faker.date.soon({ days: 12 }),
          createdAt: new Date(faker.date.recent()),
          updatedAt: new Date(faker.date.recent()),
          seo: {
            title: faker.lorem.words(),
            description: faker.lorem.paragraph()
          }
        }))

      for (let i = 0; i < links.length; i++) {
        const element = links[i]

        const link = await linkRepository.create(tx, {
          createdAt: element.createdAt,
          updatedAt: element.updatedAt,
          expiration: element.expiration,
          id: element.id,
          url: element.url,
          userId: newUser.id,
          clicks: Math.ceil(Math.random() * 3000)
        })

        if (!link) {
          throw new Error('Error on create link')
        }

        const seoLink = await seoRepository.create(tx, {
          createdAt: element.createdAt,
          updatedAt: element.updatedAt,
          description: element.seo.description,
          title: element.seo.title,
          id: nanoid(),
          linkId: link.id
        })

        if (!seoLink) {
          throw new Error('Error on create link seo')
        }
      }

      return false
    } catch (e) {
      console.log(e)
      tx.rollback()
      return true
    }
  })

  if (error) {
    logger.error('Error on seed!')
    process.exit(1)
  }

  logger.success('Seed concluided with success!')
  process.exit(0)
}
seed()
