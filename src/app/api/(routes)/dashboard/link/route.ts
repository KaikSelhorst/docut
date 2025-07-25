import { routeAdapter } from '@api/route-adapter'
import {
  createCreateLinkService,
  createListLinksService
} from '@api/services/factories/link'

const createLinkService = createCreateLinkService()
const listLinksService = createListLinksService()

export const POST = routeAdapter(
  createLinkService.execute.bind(createLinkService)
)

export const GET = routeAdapter(listLinksService.execute.bind(listLinksService))
