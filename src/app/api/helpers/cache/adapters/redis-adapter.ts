import Redis from 'ioredis'
import { env } from 'shared/env'
import type { CacheProtocol } from './protocols'

const redisClient = new Redis(env.REDIS_URL, {
  monitor: false,
  maxRetriesPerRequest: null
})

export class RedisClient implements CacheProtocol {
  async save(key: string, data: string, ttl?: number) {
    const res = ttl
      ? await redisClient.set(key, data, 'EX', ttl)
      : await redisClient.set(key, data)
    return res === 'OK'
  }

  async get(key: string) {
    const data = await redisClient.get(key)
    return data
  }

  async delete(key: string) {
    const res = await redisClient.del(key)
    return Boolean(res)
  }
}
