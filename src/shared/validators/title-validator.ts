import { z } from 'shared/lib/zod'

export function titleValidator() {
  return z
    .literal(['', null, undefined])
    .or(z.string().transform((v) => (v ? v.trim() : v)))
    .transform((v) => {
      if (!v) return null
      return v
    })
}
