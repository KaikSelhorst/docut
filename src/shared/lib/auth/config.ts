import { db } from '@api/db'
import { makeCacheClient } from '@api/helpers/cache'
import { makePasswordHasher } from '@api/helpers/cryptography/password'
import { QueueClient } from '@api/helpers/email'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { apiKey } from 'better-auth/plugins'
import { enableEmailVerification } from 'shared/env'
import { sendEmail } from './helpers/send-email'

const passwordHasher = makePasswordHasher()
const emailClient = new QueueClient()
const cacheClient = makeCacheClient()

export const auth = betterAuth({
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

  secondaryStorage: {
    get: cacheClient.get,
    set: async (key, data, ttl) => {
      await cacheClient.save(key, data, ttl)
    },
    delete: async (key) => {
      await cacheClient.delete(key)
    }
  },
  plugins: [
    nextCookies(),
    apiKey({
      rateLimit: {
        enabled: true,
        maxRequests: 350
      }
    })
  ]
})
