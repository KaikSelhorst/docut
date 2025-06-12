import { z } from 'shared/lib/zod'

export function titleValidator() {
  return z
    .string()
    .transform((v) => (v ? v.trim() : v))
    .nullable()
    .default('')
}
