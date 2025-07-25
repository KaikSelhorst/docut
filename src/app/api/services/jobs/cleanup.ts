import type { DBInstance } from '@api/db'
import type { Logger } from '@api/helpers'
import { serverError } from '@api/helpers/response'
import type { LinkRepository } from '@api/repositories'

class CleanupLinksService {
  constructor(
    private readonly logger: Logger,
    private readonly db: DBInstance,
    private readonly linkRepository: LinkRepository
  ) {}

  async execute(_: Request) {
    this.logger.info('Deleting expired links')

    const deleted = await this.linkRepository.deleteAllExpiredLinks(this.db)

    if (!deleted) {
      this.logger.error('Failed to delete expired links')
      return serverError('Failed to delete expired links')
    }

    this.logger.info('Expired links deleted successfully')
    return Response.json({ ok: deleted }, { status: 200 })
  }
}

export { CleanupLinksService }
