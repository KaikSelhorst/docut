import { RedisClient } from './adapters/redis-adapter'

export function makeCacheClient() {
  return new RedisClient()
}
