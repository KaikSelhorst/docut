import { redisClient } from '@api/lib/redis'
import { Worker } from 'bullmq'
import { Logger } from '../logger'
import type { SendEmailPayload } from './adapters/protocols'
import { config } from './config'
import { makeEmail } from './email'

const email = await makeEmail()
const logger = new Logger('email-worker')

const worker = new Worker<SendEmailPayload>(config.queueName, emailProcessor, {
  connection: redisClient
})

async function emailProcessor(job: any) {
  const sended = await email.send(job.data)
  if (!sended) throw new Error('Email not sended!')
}

worker.on('completed', (job) =>
  logger.info(`Email to = ${job.data.to} sended.`)
)

worker.on('failed', (job) => logger.error(`Email to ${job?.data.to} failured.`))

export { worker }
