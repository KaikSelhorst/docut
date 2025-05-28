import { nanoid } from 'nanoid'
import type { LinkRepository } from 'server/repository/link-repository'
import type { DBInstance } from 'server/db'
import { parseRequest } from 'server/helpers/request'
import { createLinkSchema } from 'server/schemas/link-schema'
import { serverError, unauthorized } from 'server/helpers/response'
import { getSession } from 'shared/lib/auth/utils'

export class CreateLink {
  constructor(
    private readonly db: DBInstance,
    private readonly linkRepository: LinkRepository
  ) {}
  async execute(req: Request) {
    const session = await getSession()

    if (!session) return unauthorized()

    const { ctx, err } = await parseRequest(req, createLinkSchema)

    if (err) return err()

    const link = await this.linkRepository.create(this.db, {
      id: nanoid(),
      expiration: ctx.expiration,
      url: ctx.url,
      userId: session.user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    if (!link) return serverError()

    return Response.json(link, { status: 201 })
  }
}
