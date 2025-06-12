'use client'

import { Button } from '@/components/ui/button'
import { signIn, signUp } from 'shared/lib/auth/client'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { z } from 'shared/lib/zod'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DefaultField } from '@/components/form/fields'

import {
  passwordValidator,
  emailValidator,
  nameValidator
} from '@/shared/validators'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

const signInSchema = z.object({
  email: emailValidator(),
  password: passwordValidator().weak
})

export function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const form = useForm({ resolver: zodResolver(signInSchema) })

  const needEmailVerification = searchParams.get('eq') === 'verify-email'

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    toast.loading('Signing....')

    const { error } = await signIn.email(data)

    toast.dismiss()

    if (error) {
      if (error.status === 403) {
        toast.error('Please verify your email address')
        return
      }
      toast.error(error.message)
      return
    }
    toast.success('Sign in completed!')
    router.push('/')
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-3 max-w-sm w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {needEmailVerification && (
          <Alert variant="warning">
            <AlertCircle />
            <AlertTitle>Verify your email</AlertTitle>
            <AlertDescription>
              Please check your email inbox and click the verification link to
              activate your account. You may need to check your spam folder.
            </AlertDescription>
          </Alert>
        )}
        <h1 className="text-lg font-semibold">Sign in</h1>
        <DefaultField placeholder="Email" name="email" />
        <DefaultField placeholder="Password" name="password" type="password" />
        <Button disabled={form.formState.isSubmitting}>Continuar</Button>
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link
            href="/sign-up"
            className="text-primary font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </Form>
  )
}

const signUpForm = signInSchema.extend({
  name: nameValidator(),
  password: passwordValidator().strong
})

export function SignUpForm({
  needEmailVerification
}: { needEmailVerification: boolean }) {
  const router = useRouter()

  const form = useForm({ resolver: zodResolver(signUpForm) })

  async function onSubmit(data: z.infer<typeof signUpForm>) {
    const { error } = await signUp.email(data)

    if (error) {
      toast.error(error.message)
      return
    }

    if (needEmailVerification) {
      toast.warning('Please verify your email address')
      router.push('/sign-in?eq=verify-email')
      return
    }

    router.push('/')
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-3 max-w-sm w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="text-lg font-semibold">Sign up</h1>
        <DefaultField placeholder="Name" name="name" />
        <DefaultField placeholder="Email" name="email" />
        <DefaultField placeholder="Password" name="password" type="password" />
        <Button disabled={form.formState.isSubmitting}>Continuar</Button>
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            href="/sign-in"
            className="text-primary font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </Form>
  )
}
