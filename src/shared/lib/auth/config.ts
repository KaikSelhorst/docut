import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { apiKey } from 'better-auth/plugins'
import { db } from 'server/db'
import { makePasswordHasher } from 'server/helpers/cryptography/password'
import { makeEmail } from 'server/helpers/email/email'
import {
  generateResetPasswordEmailTemplate,
  generateVerifyEmailTemplate
} from 'server/helpers/email/templates'
import { constants } from 'shared/constants'
import { enableEmailVerification } from 'shared/env'

// Better auth use User, account,
// verification and session database tables.

const passwordHasher = makePasswordHasher()
const email = await makeEmail()

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg'
  }),
  user: { deleteUser: { enabled: true } },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    requireEmailVerification: enableEmailVerification,
    password: { hash: passwordHasher.hash, verify: passwordHasher.compare },
    sendResetPassword: async ({ url, token, user }) => {
      const resetPasswordURL = new URL(url)

      resetPasswordURL.searchParams.set(
        'callbackURL',
        `/reset-password/${token}`
      )

      const htmlTemplate = await generateResetPasswordEmailTemplate({
        resetURL: resetPasswordURL.toString(),
        userFirstname: user.name
      })

      const textTemplate = await generateResetPasswordEmailTemplate(
        {
          resetURL: resetPasswordURL.toString(),
          userFirstname: user.name
        },
        { plainText: true }
      )

      email.send({
        to: user.email,
        from: '"Docut" <contact@docut.xyz>',
        subject: 'Reset Password',
        text: textTemplate,
        html: htmlTemplate
      })
    }
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      if (user.email === constants.APPLICATION_DEFAULT_USER_EMAIL) return

      const confirmURL = new URL(url)

      confirmURL.searchParams.set('callbackURL', '/sign-up/verified')

      const htmlTemplate = await generateVerifyEmailTemplate({
        confirmURL: confirmURL.toString(),
        userFirstname: user.name
      })

      const textTemplate = await generateVerifyEmailTemplate(
        {
          confirmURL: confirmURL.toString(),
          userFirstname: user.name
        },
        { plainText: true }
      )

      email.send({
        to: user.email,
        from: '"Docut" <contact@docut.xyz>',
        subject: 'Complete Sign-up',
        text: textTemplate,
        html: htmlTemplate
      })
    },
    sendOnSignUp: enableEmailVerification,
    autoSignInAfterVerification: true,
    expiresIn: 3600
  },

  plugins: [nextCookies(), apiKey()]
})
