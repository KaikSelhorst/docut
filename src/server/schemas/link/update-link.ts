import { z } from 'shared/lib/zod'

export const updateLinkSchema = z
  .object({
    url: z.url(),
    expiration: z
      .string()
      .nullable()
      .transform((exp) => {
        if (!exp) return null
        return exp
      })
      .refine((exp) => {
        if (typeof exp === 'string' && !exp.includes('T')) return false
        if (typeof exp !== 'string') return true

        const date = new Date(exp)

        return date.toString() !== 'Invalid date'
      }, 'Invalid expiration date')
      .transform((exp) => {
        if (!exp) return null
        return new Date(exp)
      })
  })
  .partial()
