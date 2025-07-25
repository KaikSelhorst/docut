import type { DBInstance } from '@api/db'
import type { Logger, Session } from '@api/helpers'
import { parseRequest } from '@api/helpers/request'
import { serverError } from '@api/helpers/response'
import type { LinkRepository, SeoRepository } from '@api/repositories'
import { createLink } from '@api/schemas/link-schema'
import { nanoid } from 'nanoid'

class CreateLinkService {
  constructor(
    private readonly logger: Logger,
    private readonly session: Session,
    private readonly db: DBInstance,
    private readonly linkRepository: LinkRepository,
    private readonly seoRepository: SeoRepository
  ) {}
  async execute(req: Request) {
    const session = await this.session.validate()
    if (session.error) return session.error()

    const input = await this.parseRequest(req)

    if (input.error) return input.error()

    const linkCreated = await this.db.transaction(async (tx) => {
      const linkId = nanoid(9)
      this.logger.info(`Creating link ${linkId}`)
      const link = await this.linkRepository.create(tx, {
        id: linkId,
        expiration: input.ctx.expiration,
        url: input.ctx.url,
        userId: session.session.userId,
        clicks: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      })

      if (!link) {
        this.logger.error(`Failed to create link ${linkId}`)
        tx.rollback()
        return null
      }

      this.logger.info(`Creating SEO metadata for link ${linkId}`)
      const seo = await this.seoRepository.create(tx, {
        createdAt: new Date(),
        id: nanoid(),
        linkId: link.id,
        updatedAt: new Date(),
        ...input.ctx.seo
      })

      if (!seo) {
        this.logger.error(`Failed to create SEO metadata for link ${linkId}`)
        tx.rollback()
        return null
      }

      this.logger.info(`Link ${linkId} and SEO metadata created`)
      return { ...link, seo }
    })

    if (!linkCreated) {
      this.logger.error('Link creation transaction failed')
      return serverError('Failed to create link')
    }

    return Response.json(linkCreated, { status: 201 })
  }

  private async parseRequest(req: Request) {
    const { ctx, err } = await parseRequest(req, createLink)
    return { ctx, error: err }
  }
}

export { CreateLinkService }
