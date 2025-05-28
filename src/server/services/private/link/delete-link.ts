import type { DBInstance } from 'server/db'
import { notFound, serverError, unauthorized } from 'server/helpers/response'
import type { LinkRepository } from 'server/repository/link-repository'
import type { SeoRepository } from 'server/repository/seo-repository'
import { getSession } from 'shared/lib/auth/utils'

export class DeleteLink {
  constructor(
    private readonly db: DBInstance,
    private readonly linkRepository: LinkRepository,
    private readonly seoRepository: SeoRepository
  ) {}
  async execute(_: Request, params: { id: string }) {
    const session = await getSession()
    if (!session) return unauthorized()

    const link = await this.linkRepository.findById(this.db, params.id)
    if (!link) return notFound('Link not found!')

    if (link.userId !== session.user.id) return unauthorized()

    const deleted = await this.db.transaction(async (tx) => {
      const linkDeleted = await this.linkRepository.deleteById(tx, link.id)

      if (!linkDeleted) {
        tx.rollback()
        return null
      }

      const seoDeleted = await this.seoRepository.deleteByLinkId(tx, link.id)

      if (!seoDeleted) {
        tx.rollback()
        return null
      }

      return linkDeleted
    })

    if (!deleted) return serverError()

    return Response.json({ message: 'Link deleted!' }, { status: 200 })
  }
}
