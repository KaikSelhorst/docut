import type { EmailSend } from './protocols'

export class MockAdapter implements EmailSend {
  async send(payload: {
    from: string
    to: string
    subject: string
    html: string
    text?: string
  }) {
    console.log(payload)
    return true
  }
}
