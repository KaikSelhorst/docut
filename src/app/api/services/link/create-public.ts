import type { DBInstance } from '@api/db'
import type { Logger, Session } from '@api/helpers'
import { parseRequest } from '@api/helpers/request'
import { serverError, unauthorized } from '@api/helpers/response'
import { publicLinkToResponse } from '@api/model/convert/link-converter'
import type {
  LinkRepository,
  SeoRepository,
  UserRepository
} from '@api/repositories'
import { createLink } from '@api/schemas/link-schema'
import dayjs from 'dayjs'
import { nanoid } from 'nanoid'
import { constants } from 'shared/constants'
import { auth } from 'shared/lib/auth/config'

class CreateLinkPublicService {
  constructor(
    private readonly logger: Logger,
    private readonly session: Session,
    private readonly db: DBInstance,
    private readonly linkRepository: LinkRepository,
    private readonly seoRepository: SeoRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(req: Request) {
    const session = await this.getCustomSession(req)

    if (session instanceof Response) return session

    const input = await this.parseRequest(req)

    if (input.error) return input.error()

    const linkCreated = await this.db.transaction(async (tx) => {
      const linkId = nanoid(9)

      this.logger.info(`Creating link with ID: ${linkId}`)

      const link = await this.linkRepository.create(tx, {
        id: linkId,
        expiration: input.ctx.expiration,
        url: input.ctx.url,
        userId: session.id,
        clicks: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      })

      if (!link) {
        this.logger.error(`Failed to create link with ID: ${linkId}`)
        tx.rollback()
        return null
      }

      this.logger.info(`Creating SEO metadata for link with ID: ${linkId}`)

      const seo = await this.seoRepository.create(tx, {
        createdAt: new Date(),
        id: nanoid(),
        linkId: link.id,
        updatedAt: new Date(),
        ...input.ctx.seo
      })

      if (!seo) {
        this.logger.error(
          `Failed to create SEO metadata for link with ID: ${linkId}`
        )
        tx.rollback()
        return null
      }

      this.logger.info(
        `Link with ID: ${linkId} and SEO metadata created successfully`
      )
      return { ...link, seo }
    })

    if (!linkCreated) {
      this.logger.error('Link creation transaction failed')
      return serverError('Failed to create link')
    }

    return Response.json(publicLinkToResponse(linkCreated), { status: 201 })
  }

  private async parseRequest(req: Request) {
    const { ctx, err } = await parseRequest(req, createLink)
    return { ctx, error: err }
  }

  private async getCustomSession(req: Request) {
    const session = await this.session.validate()

    if (session.session) return session.session.user

    const input = await this.parseRequest(req)

    if (input.error) return input.error()

    if (!input.ctx.expiration) {
      return unauthorized(
        'Permanent links are only available for account holders'
      )
    }

    if (dayjs().add(7, 'day').isBefore(input.ctx.expiration, 'day')) {
      return unauthorized(
        'Links with expiration longer than 7 days are only available for account holders'
      )
    }

    const defaultUserExist = await this.userRepository.findByEmail(
      this.db,
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
}

export { CreateLinkPublicService }
