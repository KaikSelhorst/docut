import { redisClient } from '@api/lib/redis'
import { Queue } from 'bullmq'
import type { SendEmailPayload } from './adapters/protocols'
import { config } from './config'

export class QueueClient {
  private queue: Queue

  constructor() {
    this.queue = new Queue(config.queueName, { connection: redisClient })
  }

  public addJob(job: SendEmailPayload) {
    return this.queue.add('send', job, {
      attempts: 5,
      backoff: { type: 'exponential', delay: 5000 }
    })
  }
}
