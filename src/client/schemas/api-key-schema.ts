import { z } from 'shared/lib/zod'

export const createApiKeySchema = z.object({
  name: z
    .string()
    .min(4, 'The name must have at least 4 characters')
    .max(50, 'The name must have at most 50 characters')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'The name must contain only letters, numbers, hyphen, or underscore'
    )
    .trim(),
  expire_in: z
    .string()
    .transform((value) => {
      if (value === 'no-expire') return undefined
      const num = Number(value)

      if (Number.isNaN(num) || !num) return 0
      return num
    })
    .refine((num) => num !== 0, 'Invalid Expiration Date')
})
