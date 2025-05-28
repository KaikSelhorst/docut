import { z } from '@/shared/lib/zod'

const seoSchema = z.object({
  title: z.string().nullable().default(null),
  description: z.string().nullable().default(null)
})

const linkSchema = z.object({
  url: z.url(),
  seo: seoSchema,
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

export const createLinkSchema = linkSchema
export const updateLinkSchema = linkSchema.partial()
