import { db } from '@api/db'
import { makePasswordHasher } from '@api/helpers/cryptography/password'
import { QueueClient } from '@api/helpers/email'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { apiKey } from 'better-auth/plugins'
import { enableEmailVerification, env } from 'shared/env'
import { sendEmail } from './helpers/send-email'

// Better auth use User, account,
// verification and session database tables.

const passwordHasher = makePasswordHasher()
const emailClient = new QueueClient()

export const auth = betterAuth({
  baseURL: env.APP_URL,
  database: drizzleAdapter(db, {
    provider: 'pg'
  }),
  user: { deleteUser: { enabled: true } },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60
    }
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    requireEmailVerification: enableEmailVerification,
    password: { hash: passwordHasher.hash, verify: passwordHasher.compare },
    sendResetPassword: async (body) =>
      await sendEmail.resetPassword(emailClient, body)
  },
  emailVerification: {
    sendVerificationEmail: async (body) =>
      await sendEmail.emailVerification(emailClient, body),
    sendOnSignUp: enableEmailVerification,
    autoSignInAfterVerification: true,
    expiresIn: 3600
  },

  plugins: [
    nextCookies(),
    apiKey({
      rateLimit: {
        enabled: true,
        timeWindow: 1000 * 60 * 60 * 24,
        maxRequests: 350
      }
    })
  ]
})
