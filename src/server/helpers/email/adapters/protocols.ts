export interface EmailSend {
  send(payload: {
    from: string
    to: string
    subject: string
    html: string
  }): Promise<boolean>
}
