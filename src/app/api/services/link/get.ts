import type { DBInstance } from '@api/db'
import type { Logger, Session } from '@api/helpers'
import { notFound } from '@api/helpers/response'
import type { LinkRepository } from '@api/repositories'

class GetLinkService {
  constructor(
    private readonly logger: Logger,
    private readonly session: Session,
    private readonly db: DBInstance,
    private readonly linkRepository: LinkRepository
  ) {}
  async execute(_: Request, params: { id: string }) {
    const session = await this.session.validate()
    if (session.error) return session.error()

    this.logger.info(`Retrieving link with id: ${params.id}`)
    const link = await this.linkRepository.findById(this.db, params.id)

    if (!link) {
      this.logger.error(`Link with id: ${params.id} not found`)
      return notFound('Link not found!')
    }

    this.logger.info(`Link with id: ${params.id} retrieved successfully`)
    return Response.json(link, { status: 200 })
  }
}

export { GetLinkService }
