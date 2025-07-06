import dayjs from 'dayjs'
import type { DBInstance } from 'server/db'
import { parseRequest } from 'server/helpers/request'
import { serverError, unauthorized } from 'server/helpers/response'
import { createLink } from 'server/models/link'
import { createSEO } from 'server/models/seo'
import type { LinkRepository } from 'server/repository/link-repository'
import type { SeoRepository } from 'server/repository/seo-repository'
import type { UserRepository } from 'server/repository/user-repository'
import { createLinkSchema } from 'server/schemas/link-schema'
import { constants } from 'shared/constants'
import { auth } from 'shared/lib/auth/config'
import { getSession } from 'shared/lib/auth/utils'

export class CreateLink {
  constructor(
    private readonly db: DBInstance,
    private readonly userRepository: UserRepository,
    private readonly linkRepository: LinkRepository,
    private readonly seoRepository: SeoRepository
  ) {}

  async execute(req: Request) {
    const user = await createLinkStrategy(req, this.db, this.userRepository)

    if (user instanceof Response) return user

    const { ctx, err } = await parseRequest(req, createLinkSchema)

    if (err) return err()

    const link = await this.db.transaction(async (tx) => {
      const link = await this.linkRepository.create(
        tx,
        createLink({
          expiration: ctx.expiration,
          url: ctx.url,
          userId: user.id
        })
      )

      if (!link) {
        tx.rollback()
        return null
      }

      const ctxSEO = ctx.seo

      const seo = await this.seoRepository.create(
        tx,
        createSEO({
          description: ctxSEO.description,
          title: ctxSEO.title,
          linkId: link.id
        })
      )

      if (!seo) {
        tx.rollback()
        return null
      }

      return link
    })

    if (!link) return serverError()

    return Response.json(link, { status: 201 })
  }
}

async function createLinkStrategy(
  req: Request,
  db: DBInstance,
  userRepository: UserRepository
) {
  const session = await getSession()

  if (session) return session.user

  const { ctx, err } = await parseRequest(req, createLinkSchema)

  if (err) return err()

  if (!ctx.expiration)
    return unauthorized(
      'Permanent links are only available for account holders.'
    )

  if (dayjs().add(7, 'day').isBefore(ctx.expiration, 'day')) {
    return unauthorized(
      'Links longer than 7 days are only available for account holders.'
    )
  }

  const defaultUserExist = await userRepository.findByEmail(
    db,
    constants.APPLICATION_DEFAULT_USER_EMAIL
  )

  if (defaultUserExist) return defaultUserExist

  const newDefaultUser = await auth.api.signUpEmail({
    body: {
      email: constants.APPLICATION_DEFAULT_USER_EMAIL,
      name: constants.APPLICATION_DEFAULT_USER_NAME,
      password: constants.APPLICATION_DEFAULT_USER_PASSWORD
    }
  })

  return newDefaultUser.user
}
