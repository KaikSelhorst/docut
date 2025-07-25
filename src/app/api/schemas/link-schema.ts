import { z } from 'shared/lib/zod'
import { descriptionValidator, titleValidator } from 'shared/validators'
import {
  expirationDate,
  pageSchema,
  perPageSchema,
  removeInvalidOptinalKeys,
  sortBy,
  sortDirection
} from './helpers-schema'

const seoSchema = z.object({
  title: titleValidator(),
  description: descriptionValidator()
})

export const createLink = z.object({
  url: z.url(),
  expiration: expirationDate
    .optional()
    .default(null)
    .transform((exp) => {
      if (!exp) return null
      return new Date(exp)
    }),
  seo: seoSchema.optional().default({ description: null, title: null })
})

const updateSeoSchema = seoSchema.partial().transform(removeInvalidOptinalKeys)

export const updateLink = z
  .object({
    url: z.url().optional(),
    seo: updateSeoSchema.optional(),
    expiration: expirationDate
      .transform((exp) => {
        if (!exp) return null
        return new Date(exp)
      })
      .optional()
  })
  .transform(removeInvalidOptinalKeys)

export const listLinks = z.object({
  per_page: perPageSchema(25),
  page: pageSchema(1),
  sort_by: sortBy('updated_at'),
  sort_direction: sortDirection('desc'),
  id: z.string().default('')
})
