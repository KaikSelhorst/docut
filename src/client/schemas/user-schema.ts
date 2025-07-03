import { z } from 'shared/lib/zod'
import {
  emailValidator,
  nameValidator,
  passwordValidator
} from 'shared/validators'

export const updatePasswordSchema = z
  .object({
    current: passwordValidator().weak,
    password: passwordValidator().strong,
    confirm: passwordValidator().strong
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm']
  })

export const updateDisplayNameSchema = z.object({
  name: nameValidator()
})

export const updateEmailSchema = z.object({ email: emailValidator() })
