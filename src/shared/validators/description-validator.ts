import { z } from 'shared/lib/zod'

export function descriptionValidator() {
  return z
    .literal(['', null, undefined])
    .or(z.string().transform((v) => (v ? v.trim() : v)))
    .transform((v) => {
      if (!v) return null
      return v
    })
}
