import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'shared/lib/zod'

const booleanSchema = z.stringbool({
  truthy: ['1', 'true'],
  falsy: ['0', 'false']
})

export const env = createEnv({
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
  experimental__runtimeEnv: {}
})

export const isDevelopment = env.NODE_ENV === 'development'
export const isProduction = env.NODE_ENV === 'production'

export const enableEmailVerification = env.MAIL_ADAPTER !== 'NONE'
