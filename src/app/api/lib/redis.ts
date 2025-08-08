import Redis from 'ioredis'
import { env } from 'shared/env'

export const redisClient = new Redis(env.REDIS_URL, {
  monitor: false,
  maxRetriesPerRequest: null
})
