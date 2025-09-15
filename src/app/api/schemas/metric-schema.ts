import { z } from 'shared/lib/zod'
import { METRIC_TYPES } from '@/common/constants'

export const metricTypeSchema = z.enum(METRIC_TYPES)
