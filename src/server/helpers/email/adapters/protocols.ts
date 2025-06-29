export interface EmailSend {
  send(payload: {
    from: string
    to: string
    subject: string
    html: string
    text?: string
  }): Promise<boolean>
}
