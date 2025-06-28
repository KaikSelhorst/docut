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
