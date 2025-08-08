import type { QueueClient } from '@api/helpers/email/queue-client'
import {
  generateResetPasswordEmailTemplate,
  generateVerifyEmailTemplate
} from '@api/helpers/email/templates'

interface Payload {
  token: string
  url: string
  user: { name: string; email: string }
}

export async function resetPassword(client: QueueClient, payload: Payload) {
  const resetPasswordURL = new URL(payload.url)

  const body = {
    resetURL: resetPasswordURL.toString(),
    userFirstname: payload.user.name
  }

  const htmlTemplate = await generateResetPasswordEmailTemplate(body)

  const textTemplate = await generateResetPasswordEmailTemplate(body, {
    plainText: true
  })

  await client.addJob({
    to: payload.user.email,
    from: '"Docut" <contact@docut.xyz>',
    subject: 'Reset Password',
    text: textTemplate,
    html: htmlTemplate
  })
}

export async function emailVerification(client: QueueClient, payload: Payload) {
  const confirmURL = new URL(payload.url)

  confirmURL.searchParams.set('callbackURL', '/sign-up/verified')

  const body = {
    confirmURL: confirmURL.toString(),
    userFirstname: payload.user.name
  }

  const htmlTemplate = await generateVerifyEmailTemplate(body)

  const textTemplate = await generateVerifyEmailTemplate(body, {
    plainText: true
  })

  await client.addJob({
    to: payload.user.email,
    from: '"Docut" <contact@docut.xyz>',
    subject: 'Complete Sign-up',
    text: textTemplate,
    html: htmlTemplate
  })
}

export const sendEmail = {
  resetPassword,
  emailVerification
}
