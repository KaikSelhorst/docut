import type { DBInstance } from 'server/db'
import { serverError } from 'server/helpers/response'
import type { LinkRepository } from 'server/repository/link-repository'

export class ClearTrash {
  constructor(
    private readonly db: DBInstance,
    private readonly linkRepository: LinkRepository
  ) {}
  async execute(_: Request) {
    const deleted = await this.linkRepository.deleteAllExpiredLinks(this.db)
    if (!deleted) return serverError('Trash cleanup failed.')

    return Response.json(
      { message: 'Trash cleanup successful.' },
      { status: 200 }
    )
  }
}
