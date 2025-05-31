import type { DBInstance } from 'server/db'
import { parseRequest } from 'server/helpers/request'
import { notFound, serverError, unauthorized } from 'server/helpers/response'
import type { LinkRepository } from 'server/repository/link-repository'
import type { SeoRepository } from 'server/repository/seo-repository'
import { updateLinkSchema } from 'server/schemas/link-schema'
import { getSession } from 'shared/lib/auth/utils'

export class UpdateLink {
  constructor(
    private readonly db: DBInstance,
    private readonly linkRepository: LinkRepository,
    private readonly seoRepository: SeoRepository
  ) {}
  async execute(req: Request, params: { id: string }) {
    const session = await getSession()
    if (!session) return unauthorized()

    const { ctx, err } = await parseRequest(req, updateLinkSchema)

    if (err) return err()

    const link = await this.linkRepository.findById(this.db, params.id)
    if (!link) return notFound('Link not found!')

    if (link.userId !== session.user.id) return unauthorized()

    const linkSeo = await this.seoRepository.findByLinkId(this.db, link.id)

    if (!linkSeo) return notFound('Link seo not found!')

    const updated = await this.db.transaction(async (tx) => {
      const linkUpdated = await this.linkRepository.update(tx, {
        ...link,
        ...ctx,
        updatedAt: new Date()
      })

      if (!linkUpdated) {
        tx.rollback()
        return null
      }

      const ctxSeo = ctx.seo ?? {}

      const seoUpdated = await this.seoRepository.update(tx, {
        ...linkSeo,
        ...ctxSeo,
        updatedAt: new Date()
      })

      if (!seoUpdated) {
        tx.rollback()
        return null
      }

      return { ...linkUpdated, seo: seoUpdated }
    })

    if (!updated) return serverError()

    return Response.json(updated, { status: 200 })
  }
}
