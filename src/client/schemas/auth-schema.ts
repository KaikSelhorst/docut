import { z } from 'shared/lib/zod'
import {
  emailValidator,
  nameValidator,
  passwordValidator
} from 'shared/validators'

export const signInSchema = z.object({
  email: emailValidator(),
  password: passwordValidator().weak
})

export const signUpForm = signInSchema.extend({
  name: nameValidator(),
  password: passwordValidator().strong
})

export const forgotPasswordSchema = z.object({
  email: emailValidator()
})

export const resetPasswordSchema = z
  .object({
    password: passwordValidator().strong,
    confirm: z.string()
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm']
  })
