import { routeAdapter } from '@api/route-adapter'
import { createGetPublicLinkService } from '@api/services/factories/link'

const getPublicLinkService = createGetPublicLinkService()

export const GET = routeAdapter(
  getPublicLinkService.execute.bind(getPublicLinkService)
)
