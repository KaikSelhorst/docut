import type { DBInstance } from '@api/db'
import type { Logger } from '@api/helpers'
import { getRequestInfo } from '@api/helpers/request'
import { notFound } from '@api/helpers/response'
import { publicLinkToResponse } from '@api/model/convert/link-converter'
import type { ClickRepository, LinkRepository } from '@api/repositories'
import { nanoid } from 'nanoid'

class GetPublicLinkService {
  constructor(
    private readonly logger: Logger,
    private readonly db: DBInstance,
    private readonly linkRepository: LinkRepository,
    private readonly clickRepository: ClickRepository
  ) {}

  async execute(req: Request, params: { id: string }) {
    this.logger.info(`Retrieving link with ID: ${params.id}`)

    const link = await this.linkRepository.findById(this.db, params.id)

    if (!link) {
      this.logger.error(`Link with ID: ${params.id} not found`)
      return notFound('Link not found')
    }

    this.linkRepository
      .updateLinkClick(this.db, params.id)
      .catch(() =>
        this.logger.error(
          `Failed to update click count for link with ID: ${params.id}`
        )
      )

    const reqInfo = await getRequestInfo(req)

    await this.clickRepository.registerClick(this.db, {
      id: nanoid(),
      linkId: link.id,
      updatedAt: new Date(),
      createdAt: new Date(),
      country: reqInfo.country,
      city: reqInfo.city,
      ipAddress: reqInfo.ip,
      deviceType: reqInfo.os,
      userAgent: reqInfo.userAgent,
      referer: reqInfo.referer
    })

    this.logger.info(`Link with ID: ${params.id} retrieved successfully`)
    return Response.json(publicLinkToResponse(link), { status: 200 })
  }
}

export { GetPublicLinkService }
