import { transporter } from './transporter'

interface SendEmailPayload {
  from: string
  to: string
  subject: string
  html: string
  text?: string
}

export class QueueClient {
  public addJob(job: SendEmailPayload) {
    return transporter.sendMail(job)
  }
}
