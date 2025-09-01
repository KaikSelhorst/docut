import { METRIC_TYPES } from '@/common/constants'
import { z } from 'shared/lib/zod'

export const metricTypeSchema = z.enum(METRIC_TYPES)
