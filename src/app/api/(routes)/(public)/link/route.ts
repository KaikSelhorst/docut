import { routeAdapter } from '@api/route-adapter'
import { createCreatePublicLinkService } from '@api/services/factories/link'

const createPublicLinkService = createCreatePublicLinkService()

export const POST = routeAdapter(
  createPublicLinkService.execute.bind(createPublicLinkService)
)
