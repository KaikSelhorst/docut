import type { DBInstance } from '@api/db'
import type { Logger, Session } from '@api/helpers'
import { parseRequest } from '@api/helpers/request'
import { serverError } from '@api/helpers/response'
import type { LinkRepository } from '@api/repositories'
import { listLinks } from '@api/schemas/link-schema'

class ListLinksService {
  constructor(
    private readonly logger: Logger,
    private readonly session: Session,
    private readonly db: DBInstance,
    private readonly linkRepository: LinkRepository
  ) {}
  async execute(req: Request) {
    const session = await this.session.validate()
    if (session.error) return session.error()

    const input = await this.parseRequest(req)

    if (input.error) return input.error()

    this.logger.info(`Fetching links for user ${session.session.userId}`)
    const listOfLinks = await this.linkRepository.findManyByUserId(
      this.db,
      session.session.userId,
      input.ctx
    )

    if (!listOfLinks) {
      this.logger.error(
        `Failed to fetch links for user ${session.session.userId}`
      )
      return serverError('Failed to retrieve links')
    }
    this.logger.info(`Links fetched for user ${session.session.userId}`)
    return Response.json(listOfLinks, { status: 200 })
  }

  private async parseRequest(req: Request) {
    const { ctx, err } = await parseRequest(req, listLinks)
    return { ctx, error: err }
  }
}

export { ListLinksService }
