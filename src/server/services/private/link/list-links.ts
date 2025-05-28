import type { DBInstance } from 'server/db'
import { serverError, unauthorized } from 'server/helpers/response'
import type { LinkRepository } from 'server/repository/link-repository'
import { getSession } from 'shared/lib/auth/utils'

export class ListLinks {
  constructor(
    private readonly db: DBInstance,
    private readonly linkRepository: LinkRepository
  ) {}
  async execute(_: Request) {
    const session = await getSession()
    if (!session) return unauthorized()

    const link = await this.linkRepository.findManyByUserId(
      this.db,
      session.user.id
    )

    if (!link) return serverError()

    return Response.json(link, { status: 200 })
  }
}
