import type { DBInstance } from '@api/db'
import type { Logger, Session } from '@api/helpers'
import { badRequest, serverError } from '@api/helpers/response'
import type { ClickRepository } from '@api/repositories'
import { metricTypeSchema } from '@api/schemas/metric-schema'

class GetLinkMetricsService {
  constructor(
    private readonly logger: Logger,
    private readonly session: Session,
    private readonly db: DBInstance,
    private readonly clickRepository: ClickRepository
  ) {}
  async execute(_: Request, params: { type: string }) {
    const session = await this.session.validate()
    if (session.error) return session.error()

    const metricType = this.validateMetricType(params.type)
    if (metricType instanceof Response) return metricType

    const res = await this.clickRepository.getMetrics(this.db, metricType)
    if (!res) return serverError(`Failed to retrieve ${metricType} metrics`)

    return Response.json({ data: res })
  }

  private validateMetricType(type: string) {
    const res = metricTypeSchema.safeParse(type)

    if (!res.success) {
      this.logger.error(`Invalid metric type: ${type}`)
      return badRequest('Invalid metric type')
    }

    return res.data
  }
}

export { GetLinkMetricsService }
