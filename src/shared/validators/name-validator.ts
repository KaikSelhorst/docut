import { z } from 'shared/lib/zod'

export function nameValidator() {
  return z
    .string({ error: 'Name is required.' })
    .min(1, 'Name is required.')
    .transform((str) => str.trim())
}
