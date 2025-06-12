import { z } from 'shared/lib/zod'

const basePasswordSchema = z
  .string({ error: 'Password is required.' })
  .min(8, { message: 'Must be at least 8 characters.' })

export function passwordValidator() {
  return {
    weak: basePasswordSchema,
    strong: basePasswordSchema.regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/,
      'Must include uppercase, lowercase, number, special character, and be 8+ chars.'
    )
  }
}
