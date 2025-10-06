import { db } from '@api/db'
import {
  account,
  click,
  link,
  seo,
  session,
  user,
  verification
} from '@api/db/schemas'
import { Logger } from '@api/helpers'
import { makePasswordHasher } from '@api/helpers/cryptography/password'
import { getRequestInfo } from '@api/helpers/request'
import {
  ClickRepository,
  LinkRepository,
  SeoRepository
} from '@api/repositories'
import { faker } from '@faker-js/faker'
import { nanoid } from 'nanoid'
import { env } from 'shared/env'
import { logger } from 'shared/logger'
import { DEFAULT_LIST_DAYS } from '@/common/constants'

async function seed() {
  const clickRepository = new ClickRepository(
    new Logger('click-repository-seed')
  )
  const linkRepository = new LinkRepository()
  const seoRepository = new SeoRepository()

  const error = await db.transaction(async (tx) => {
    try {
      const tables = [user, link, account, seo, session, verification, click]

      for (let i = 0; i < tables.length; i++) {
        const table = tables[i]
        await tx.delete(table)
      }

      const [newUser] = await tx
        .insert(user)
        .values({
          name: 'Admin',
          email: env.ADMIN_EMAIL,
          image: `https://api.dicebear.com/9.x/glass/svg?seed=${btoa(env.ADMIN_EMAIL)}`,
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

      const links = Array(300)
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

        const linkPromise = linkRepository.create(tx, {
          createdAt: element.createdAt,
          updatedAt: element.updatedAt,
          expiration: element.expiration,
          id: element.id,
          url: element.url,
          userId: newUser.id,
          clicks: Math.ceil(Math.random() * 3000)
        })

        const seoPromise = seoRepository.create(tx, {
          createdAt: element.createdAt,
          updatedAt: element.updatedAt,
          description: element.seo.description,
          title: element.seo.title,
          id: nanoid(),
          linkId: element.id
        })

        const [link, seo] = await Promise.all([linkPromise, seoPromise])

        if (!link) {
          throw new Error('Error on create link')
        }

        if (!seo) {
          throw new Error('Error on create link seo')
        }

        const req = new Request({
          url: link.url,
          headers: new Headers({
            'x-forwarded-for': faker.internet.ipv4(),
            'user-agent': faker.internet.userAgent()
          })
        } as any)

        const reqInfo = await getRequestInfo(req)

        const date = faker.date.recent({ days: DEFAULT_LIST_DAYS })

        for (let index = 0; index < Math.ceil(Math.random() * 6); index++) {
          const registred = await clickRepository.registerClick(tx, {
            linkId: link.id,
            userAgent: reqInfo.userAgent,
            browser: reqInfo.browser,
            city: reqInfo.city,
            country: reqInfo.country,
            createdAt: date,
            updatedAt: date,
            device: reqInfo.device,
            id: nanoid(),
            ipAddress: reqInfo.ip,
            os: reqInfo.os,
            referer: reqInfo.referer,
            isUnique: !index
          })

          if (!registred) {
            throw new Error('Error on create link click')
          }
        }
      }

      return false
    } catch {
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
