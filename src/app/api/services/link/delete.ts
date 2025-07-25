import type { DBInstance } from '@api/db'
import type { Logger, Session } from '@api/helpers'
import { serverError } from '@api/helpers/response'
import type { LinkRepository } from '@api/repositories'

class DeleteLinkService {
  constructor(
    private readonly logger: Logger,
    private readonly session: Session,
    private readonly db: DBInstance,
    private readonly linkRepository: LinkRepository
  ) {}
  async execute(_: Request, params: { id: string }) {
    const session = await this.session.validate()
    if (session.error) return session.error()

    this.logger.info(`Deleting link ${params.id}`)
    const link = await this.linkRepository.deleteById(this.db, params.id)

    if (!link) {
      this.logger.error(`Failed to delete link ${params.id}`)
      return serverError('Error deleting link')
    }

    this.logger.info(`Link ${params.id} deleted`)
    return Response.json(link, { status: 200 })
  }
}

export { DeleteLinkService }
