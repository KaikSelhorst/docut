import type { LinkRepository } from 'server/repository/link-repository'
import type { DBInstance } from 'server/db'
import { notFound, unauthorized } from 'server/helpers/response'
import { getSession } from 'shared/lib/auth/utils'

export class GetLink {
  constructor(
    private readonly db: DBInstance,
    private readonly linkRepository: LinkRepository
  ) {}
  async execute(_: Request, params: { id: string }) {
    const session = await getSession()

    if (!session) return unauthorized()

    const link = await this.linkRepository.findById(this.db, params.id)

    if (!link) return notFound('Link not found!')

    return Response.json(link, { status: 200 })
  }
}
