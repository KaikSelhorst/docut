import { z } from 'shared/lib/zod'

export function descriptionValidator() {
  return z
    .string()
    .transform((v) => (v ? v.trim() : v))
    .nullable()
    .default('')
}
