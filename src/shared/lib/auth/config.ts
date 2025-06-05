import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { db } from 'server/db'
import { makePasswordHasher } from 'server/helpers/cryptography/password'

// Better auth use User, account,
// verification and session database tables.

const passwordHasher = makePasswordHasher()

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg'
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    password: { hash: passwordHasher.hash, verify: passwordHasher.compare }
  },
  advanced: { cookiePrefix: 'doshort' },
  plugins: [nextCookies()]
})
