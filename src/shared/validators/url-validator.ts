import { z } from 'shared/lib/zod'

export function urlValidator() {
  return z.url().transform((str) => str.trim())
}
