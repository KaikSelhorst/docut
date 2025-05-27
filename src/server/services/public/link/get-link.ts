import type { LinkRepository } from 'server/repository/link-repository'
import { notFound } from 'server/helpers/response'

export class GetLink {
  constructor(private readonly linkRepository: LinkRepository) {}
  async execute(_: Request, params: { id: string }) {
    const link = await this.linkRepository.findById(params.id)

    if (!link) return notFound('Link not found!')

    const now = new Date()

    const linkExpiration = new Date(link.expiration || '')

    if (now > linkExpiration) return notFound('Link not found!')

    return Response.json(link, { status: 200 })
  }
}
