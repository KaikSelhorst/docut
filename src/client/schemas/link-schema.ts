import { z } from 'shared/lib/zod'
import {
  descriptionValidator,
  expirationValidator,
  titleValidator,
  urlValidator
} from 'shared/validators'

export const createLinkSchema = z.object({
  url: urlValidator(),
  expiration: expirationValidator(),

  seo: z
    .object({
      title: titleValidator(),
      description: descriptionValidator()
    })
    .default({ title: null, description: null })
})

export type CreatedLinkSchema = z.infer<typeof createLinkSchema>

export const updateLinkSchema = z.object({
  url: urlValidator(),
  expiration: expirationValidator(),

  seo: z.object({
    title: titleValidator(),
    description: descriptionValidator()
  })
})

export type UpdateLinkSchema = z.infer<typeof updateLinkSchema>
