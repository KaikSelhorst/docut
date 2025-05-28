import type { LinkRepository } from 'server/repository/link-repository'
import type { DBInstance } from 'server/db'
import { notFound, serverError, unauthorized } from 'server/helpers/response'
import { getSession } from 'shared/lib/auth/utils'

export class DeleteLink {
  constructor(
    private readonly db: DBInstance,
    private readonly linkRepository: LinkRepository
  ) {}
  async execute(_: Request, params: { id: string }) {
    const session = await getSession()
    if (!session) return unauthorized()

    const link = await this.linkRepository.findById(this.db, params.id)
    if (!link) return notFound('Link not found!')

    if (link.userId !== session.user.id) return unauthorized()

    const deleted = this.linkRepository.deleteById(this.db, link.id)
    if (!deleted) return serverError()

    return Response.json({ message: 'Link deleted!' }, { status: 200 })
  }
}
