import type { LinkRepository } from 'server/repository/link-repository'
import { serverError, unauthorized } from 'server/helpers/response'
import { getSession } from '@/shared/lib/auth/utils'

export class ListLinks {
  constructor(private readonly linkRepository: LinkRepository) {}
  async execute(_: Request) {
    const session = await getSession()
    if (!session) return unauthorized()

    const link = await this.linkRepository.findManyByUserId(session.user.id)

    if (!link) return serverError()

    return Response.json(link, { status: 200 })
  }
}
