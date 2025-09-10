import { createEnv } from '@t3-oss/env-nextjs'
import { vercel } from '@t3-oss/env-nextjs/presets-zod'
import { z } from 'shared/lib/zod'

const booleanSchema = z.stringbool({
  truthy: ['1', 'true'],
  falsy: ['0', 'false']
})

const envParsed = createEnv({
  server: {
    NODE_ENV: z
      .enum(['production', 'development', 'test'])
      .default('development'),
    DEBUG: booleanSchema,
    ADMIN_EMAIL: z.email().optional().default('admin@docut.xyz'),
    ADMIN_PASSWORD: z.string().optional().default('Senha123.'),
    // BetterAuth
    BETTER_AUTH_URL: z.string().min(1).optional(),
    BETTER_AUTH_SECRET: z.string().min(1).optional(),
    // Database
    DATABASE_URL: z.string().min(1),
    DRIZZLE_LOGGER: booleanSchema,
    // Mail
    MAIL_ADAPTER: z.enum(['NONE', 'RESEND']).default('NONE'),
    MAIL_TOKEN: z.string().optional().default(''),
    // Redis
    REDIS_URL: z.string().min(1)
  },
  client: {},
  experimental__runtimeEnv: {},
  extends: [vercel()]
})

export const isDevelopment = envParsed.NODE_ENV === 'development'
export const isProduction = envParsed.NODE_ENV === 'production'

export const enableEmailVerification = envParsed.MAIL_ADAPTER !== 'NONE'

function getApplicationURL() {
  return envParsed.VERCEL_URL
    ? `https://${envParsed.VERCEL_URL}`
    : envParsed.BETTER_AUTH_URL
}

export const env = {
  ...envParsed,
  APP_URL: getApplicationURL()
}
