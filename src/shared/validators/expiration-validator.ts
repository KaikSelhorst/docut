import { z } from 'shared/lib/zod'

export function expirationValidator() {
  return empty.or(dateObject).or(isoDate)
}

const empty = z
  .string()
  .max(0)
  .nullable()
  .refine((str) => !str, 'Invalid expiration')

const dateObject = z.date().transform((d) => d.toISOString())

const isoDate = z.iso.datetime()
