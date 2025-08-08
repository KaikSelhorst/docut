import { env } from '@/shared/env'
import { Resend } from 'resend'
import type { EmailSend } from './protocols'

const resend = new Resend(env.MAIL_TOKEN)

export class ResendAdapter implements EmailSend {
  client = new Resend(env.MAIL_TOKEN)
  async send(payload: {
    from: string
    to: string
    subject: string
    text?: string
    html: string
  }) {
    const res = await resend.emails.send(payload)
    return res.error === null
  }
}
