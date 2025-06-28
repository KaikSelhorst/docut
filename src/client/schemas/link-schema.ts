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
