import { z } from 'shared/lib/zod'

export function emailValidator() {
  return z.email().transform((str) => str.trim())
}
