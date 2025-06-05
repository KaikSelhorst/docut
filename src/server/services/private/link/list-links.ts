import { parseRequest } from '@/server/helpers/request'
import { listLinksSchema } from '@/server/schemas/link-schema'
import type { DBInstance } from 'server/db'
import { serverError, unauthorized } from 'server/helpers/response'
import type { LinkRepository } from 'server/repository/link-repository'
import { getSession } from 'shared/lib/auth/utils'

export class ListLinks {
  constructor(
    private readonly db: DBInstance,
    private readonly linkRepository: LinkRepository
  ) {}
  async execute(req: Request) {
    const session = await getSession()
    if (!session) return unauthorized()

    const { ctx, err } = await parseRequest(req, listLinksSchema)

    if (err) return err()

    const link = await this.linkRepository.findManyByUserId(
      this.db,
      session.user.id,
      ctx
    )

    if (!link) return serverError()

    return Response.json(link, { status: 200 })
  }
}
