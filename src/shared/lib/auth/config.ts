import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { db } from 'server/db'
import { makePasswordHasher } from 'server/helpers/cryptography/password'
import { makeEmail } from 'server/helpers/email/email'
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
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    requireEmailVerification: enableEmailVerification,
    password: { hash: passwordHasher.hash, verify: passwordHasher.compare }
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      if (user.email === constants.APPLICATION_DEFAULT_USER_EMAIL) return
      email.send({
        to: user.email,
        from: 'noreply@docut.xyz',
        subject: 'Complete Sign-up',
        html: `To complete your sign up access <a href="${url}">this link</a>`
      })
    },
    sendOnSignUp: enableEmailVerification,
    autoSignInAfterVerification: true,
    expiresIn: 3600
  },

  plugins: [nextCookies()]
})
