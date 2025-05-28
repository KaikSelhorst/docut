import type { DBInstance } from 'server/db'
import { notFound, unauthorized } from 'server/helpers/response'
import type { LinkRepository } from 'server/repository/link-repository'
import { getSession } from 'shared/lib/auth/utils'

export class GetLink {
  constructor(
    private readonly db: DBInstance,
    private readonly linkRepository: LinkRepository
  ) {}
  async execute(_: Request, params: { id: string }) {
    const session = await getSession()
    if (!session) return unauthorized()

    const link = await this.linkRepository.findByIdWithSeo(this.db, params.id)

    if (!link) return notFound('Link not found!')

    if (link.link.userId !== session.user.id) return unauthorized()

    return Response.json({ ...link.link, seo: link.seo }, { status: 200 })
  }
}
