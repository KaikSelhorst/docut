import type { DBInstance } from '@api/db'
import type { Logger, Session } from '@api/helpers'
import { parseRequest } from '@api/helpers/request'
import { notFound, serverError, unauthorized } from '@api/helpers/response'
import type { LinkRepository, SeoRepository } from '@api/repositories'
import { updateLink } from '@api/schemas/link-schema'

class UpdateLinkService {
  constructor(
    private readonly logger: Logger,
    private readonly session: Session,
    private readonly db: DBInstance,
    private readonly linkRepository: LinkRepository,
    private readonly seoRepository: SeoRepository
  ) {}

  async execute(req: Request, params: { id: string }) {
    const session = await this.session.validate()
    if (session.error) return session.error()

    const input = await this.parseRequest(req)
    if (input.error) return input.error()

    const link = await this.linkRepository.findById(this.db, params.id)
    if (!link) {
      this.logger.error(`Link with id: ${params.id} not found!`)
      return notFound('Link not found!')
    }

    if (link.userId !== session.session.userId) {
      this.logger.error(`Unauthorized user tried to update link ${params.id}`)
      return unauthorized('Nice try')
    }

    const linkUpdated = await this.db.transaction(async (tx) => {
      this.logger.info(`Updating link ${params.id}`)

      const { seo: newSeoValues, ...linkValues } = input.ctx
      const updatedLink = await this.linkRepository.update(tx, {
        ...link,
        ...linkValues
      })

      if (!updatedLink) {
        this.logger.error(`Failed to update link ${params.id}`)
        tx.rollback()
        return null
      }

      this.logger.info(`Updating SEO metadata for link ${params.id}`)
      if (!newSeoValues) {
        this.logger.info(
          `No new SEO values provided for link ${params.id}, keeping existing metadata`
        )
        return { ...updatedLink, seo: link.seo }
      }

      const prevSeo = await this.seoRepository.findByLinkId(tx, link.id)
      if (!prevSeo) {
        this.logger.error(`SEO metadata not found for link ${link.id}`)
        tx.rollback()
        return null
      }

      const updatedSeo = await this.seoRepository.update(tx, {
        ...prevSeo,
        ...newSeoValues
      })

      if (!updatedSeo) {
        this.logger.error(`Failed to update SEO metadata for link ${link.id}`)
        tx.rollback()
        return null
      }

      this.logger.info(
        `Link ${link.id} and SEO metadata updated by user ${session.session.userId}`
      )
      return { ...link, seo: updatedSeo }
    })

    if (!linkUpdated) {
      this.logger.error(`Link update transaction failed for link ${params.id}`)
      return serverError('Failed to update link')
    }

    return Response.json(linkUpdated, { status: 200 })
  }

  private async parseRequest(req: Request) {
    const { ctx, err } = await parseRequest(req, updateLink)
    return { ctx, error: err }
  }
}

export { UpdateLinkService }
