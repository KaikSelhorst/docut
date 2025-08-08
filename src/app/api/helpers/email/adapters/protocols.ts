export interface SendEmailPayload {
  from: string
  to: string
  subject: string
  html: string
  text?: string
}

export interface EmailSend {
  send(payload: SendEmailPayload): Promise<boolean>
}
