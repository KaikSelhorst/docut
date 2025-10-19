import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'shared/lib/zod'
import { SMTP_DEFAULT_CONFIG } from '@/common/constants'

const booleanSchema = z.stringbool({
  truthy: ['1', 'true'],
  falsy: ['0', 'false']
})

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(['production', 'development', 'test'])
      .default('development'),
    DEBUG: booleanSchema.default(false),
    ADMIN_EMAIL: z.email().optional().default('admin@docut.xyz'),
    ADMIN_PASSWORD: z.string().optional().default('Senha123.'),
    // Better-Auth
    BETTER_AUTH_URL: z.string().min(1).optional(),
    BETTER_AUTH_SECRET: z.string().min(1).optional(),
    // Database
    DATABASE_URL: z.string().min(1),
    DRIZZLE_LOGGER: booleanSchema.default(false),
    // Redis
    REDIS_URL: z.string().min(1),
    // SMTP
    SMTP_HOST: z.string().default(SMTP_DEFAULT_CONFIG.HOST),
    SMTP_PORT: z.coerce.number().default(SMTP_DEFAULT_CONFIG.PORT),
    SMTP_SECURE: booleanSchema.default(SMTP_DEFAULT_CONFIG.SECURE),
    SMTP_USER: z.string().default(SMTP_DEFAULT_CONFIG.USER),
    SMTP_PASSWORD: z.string().default(SMTP_DEFAULT_CONFIG.PASSWORD)
  },
  client: {},
  experimental__runtimeEnv: {}
})

export const isDevelopment = env.NODE_ENV === 'development'
export const isProduction = env.NODE_ENV === 'production'

export const enableEmailVerification =
  env.SMTP_PASSWORD !== SMTP_DEFAULT_CONFIG.PASSWORD
