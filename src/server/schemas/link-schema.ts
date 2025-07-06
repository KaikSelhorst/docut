import { z } from '@/shared/lib/zod'
import {
  descriptionValidator,
  expirationValidator,
  titleValidator
} from '@/shared/validators'
import { pageSchema, perPageSchema, sortBy, sortDirection } from './filters'

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
  per_page: perPageSchema(25),
  page: pageSchema(1),
  sort_by: sortBy('updated_at'),
  sort_direction: sortDirection('desc'),
  id: z.string().default('')
})
