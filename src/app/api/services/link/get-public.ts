import type { DBInstance } from '@api/db'
import type { Logger } from '@api/helpers'
import { makeGeolocalization } from '@api/helpers/geolocalization'
import { notFound } from '@api/helpers/response'
import { makeUserDevice } from '@api/helpers/user-device'
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

    const userDevice = makeUserDevice()
    const geo = makeGeolocalization()

    const userAgent = req.headers.get('user-agent') || ''
    const referer = req.headers.get('referer') || null

    const reqGeo = await geo.lookup(req.headers)
    const reqDevice = await userDevice.detect(userAgent)

    this.clickRepository.registerClick(this.db, {
      id: nanoid(),
      linkId: link.id,
      updatedAt: new Date(),
      createdAt: new Date(),
      country: reqGeo.country,
      ipAddress: reqGeo.ip,
      deviceType: reqDevice.os.name,
      userAgent,
      referer
    })

    this.logger.info(`Link with ID: ${params.id} retrieved successfully`)
    return Response.json(publicLinkToResponse(link), { status: 200 })
  }
}

export { GetPublicLinkService }
