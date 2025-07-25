import type { DBInstance } from '@api/db'
import type { Logger } from '@api/helpers'
import { notFound } from '@api/helpers/response'
import { publicLinkToResponse } from '@api/model/convert/link-converter'
import type { LinkRepository } from '@api/repositories'

class GetPublicLinkService {
  constructor(
    private readonly logger: Logger,
    private readonly db: DBInstance,
    private readonly linkRepository: LinkRepository
  ) {}

  async execute(_: Request, params: { id: string }) {
    this.logger.info(`Retrieving link with ID: ${params.id}`)

    const link = await this.linkRepository.findById(this.db, params.id)

    if (!link) {
      this.logger.error(`Link with ID: ${params.id} not found`)
      return notFound('Link not found')
    }

    const updatedLink = await this.linkRepository.updateLinkClick(
      this.db,
      params.id
    )

    if (!updatedLink) {
      this.logger.error(
        `Failed to update click count for link with ID: ${params.id}`
      )
    }

    this.logger.info(`Link with ID: ${params.id} retrieved successfully`)
    return Response.json(publicLinkToResponse(link), { status: 200 })
  }
}

export { GetPublicLinkService }
