import { z } from '@/shared/lib/zod'
import {
  descriptionValidator,
  expirationValidator,
  titleValidator
} from '@/shared/validators'

const seoSchema = z.object({
  title: titleValidator().transform((v) => v || null),
  description: descriptionValidator().transform((v) => v || null)
})

const linkSchema = z.object({
  url: z.url(),
  seo: seoSchema,
  expiration: expirationValidator().transform((exp) => {
    if (!exp) return null
    return new Date(exp)
  })
})

export const createLinkSchema = linkSchema
export const updateLinkSchema = linkSchema.partial()

export const listLinksSchema = z.object({
  per_page: z
    .string()
    .transform((per) => {
      const num = Number(per)
      if (Number.isNaN(num)) return 16
      if (num > 64) return 64
      return num
    })
    .default(16),
  page: z
    .string()
    .transform((v) => {
      const parsed = Number(v)

      if (typeof parsed === 'number') return parsed
      return 1
    })
    .default(1),
  id: z.string().default('')
})
