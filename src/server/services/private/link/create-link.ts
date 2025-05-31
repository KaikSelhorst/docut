import { nanoid } from 'nanoid'
import type { DBInstance } from 'server/db'
import { parseRequest } from 'server/helpers/request'
import { serverError, unauthorized } from 'server/helpers/response'
import type { LinkRepository } from 'server/repository/link-repository'
import type { SeoRepository } from 'server/repository/seo-repository'
import { createLinkSchema } from 'server/schemas/link-schema'
import { getSession } from 'shared/lib/auth/utils'

export class CreateLink {
  constructor(
    private readonly db: DBInstance,
    private readonly linkRepository: LinkRepository,
    private readonly seoRepository: SeoRepository
  ) {}
  async execute(req: Request) {
    const session = await getSession()

    if (!session) return unauthorized()

    const { ctx, err } = await parseRequest(req, createLinkSchema)

    if (err) return err()

    const link = await this.db.transaction(async (tx) => {
      const link = await this.linkRepository.create(tx, {
        id: nanoid(9),
        expiration: ctx.expiration,
        url: ctx.url,
        userId: session.user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        clicks: 0
      })

      if (!link) {
        tx.rollback()
        return null
      }

      const ctxSEO = ctx.seo

      const seo = await this.seoRepository.create(tx, {
        id: nanoid(),
        title: ctxSEO.title,
        description: ctx.seo.description,
        linkId: link.id,
        updatedAt: new Date(),
        createdAt: new Date()
      })

      if (!seo) {
        tx.rollback()
        return null
      }

      return link
    })

    if (!link) return serverError()

    return Response.json(link, { status: 201 })
  }
}
