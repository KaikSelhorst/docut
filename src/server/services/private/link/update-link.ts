import type { LinkRepository } from 'server/repository/link-repository'
import { notFound, serverError, unauthorized } from 'server/helpers/response'
import { getSession } from '@/shared/lib/auth/utils'
import { parseRequest } from 'server/helpers/request'
import { updateLinkSchema } from '@/server/schemas/link-schema'

export class UpdateLink {
  constructor(private readonly linkRepository: LinkRepository) {}
  async execute(req: Request, params: { id: string }) {
    const session = await getSession()
    if (!session) return unauthorized()

    const { ctx, err } = await parseRequest(req, updateLinkSchema)

    if (err) return err()

    const link = await this.linkRepository.findById(params.id)
    if (!link) return notFound('Link not found!')

    if (link.userId !== session.user.id) return unauthorized()

    const updated = await this.linkRepository.update({
      ...link,
      ...ctx,
      updatedAt: new Date()
    })
    if (!updated) return serverError()

    return Response.json(updated, { status: 200 })
  }
}
