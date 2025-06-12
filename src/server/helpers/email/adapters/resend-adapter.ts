import { Resend } from 'resend'
import type { EmailSend } from './protocols'
import { env } from '@/shared/env'

const resend = new Resend(env.MAIL_TOKEN)

export class ResendAdapter implements EmailSend {
  client = new Resend(env.MAIL_TOKEN)
  async send(payload: {
    from: string
    to: string
    subject: string
    html: string
  }) {
    const res = await resend.emails.send(payload)
    return !!res.error
  }
}
