import { routeAdapter } from '@api/route-adapter'
import { createGetLinkMetricsService } from '@api/services/factories/link'

const getMetricsService = createGetLinkMetricsService()

export const GET = routeAdapter(
  getMetricsService.execute.bind(getMetricsService)
)
