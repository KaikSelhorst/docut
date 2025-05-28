import type { LinkRepository } from 'server/repository/link-repository'
import type { DBInstance } from 'server/db'
import { notFound } from 'server/helpers/response'

export class GetLinkSeo {
  constructor(
    private readonly db: DBInstance,
    private readonly linkRepository: LinkRepository
  ) {}
  async execute(_: Request, params: { id: string }) {
    const query = await this.linkRepository.findByIdWithSeo(this.db, params.id)

    if (!query) return notFound('Link not found!')

    const now = new Date()

    const linkExpiration = new Date(query.link.expiration || '')

    if (now > linkExpiration) return notFound('Link not found!')

    return Response.json(query.seo, { status: 200 })
  }
}
