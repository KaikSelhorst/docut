import { routeAdapter } from '@api/route-adapter'
import {
  createDeleteLinkService,
  createGetLinkService,
  createUpdateLinkService
} from '@api/services/factories/link'

const getLinkService = createGetLinkService()
const deleteLinkService = createDeleteLinkService()
const updateLinkService = createUpdateLinkService()

export const GET = routeAdapter(getLinkService.execute.bind(getLinkService))
export const DELETE = routeAdapter(
  deleteLinkService.execute.bind(deleteLinkService)
)

export const PUT = routeAdapter(
  updateLinkService.execute.bind(updateLinkService)
)
