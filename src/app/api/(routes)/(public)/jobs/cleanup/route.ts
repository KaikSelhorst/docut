import { routeAdapter } from '@api/route-adapter'
import { createCleanupLinksService } from '@api/services/factories/jobs'

const cleanupLinksServices = createCleanupLinksService()

export const GET = routeAdapter(
  cleanupLinksServices.execute.bind(cleanupLinksServices)
)
