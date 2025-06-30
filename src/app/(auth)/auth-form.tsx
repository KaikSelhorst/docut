'use client'

import { DefaultField } from '@/components/form/fields'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpForm
} from 'client/schemas/auth-schema'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { authClient, signIn, signUp } from 'shared/lib/auth/client'
import type { z } from 'shared/lib/zod'
import { toast } from 'sonner'

export function SignInForm() {
  const router = useRouter()

  const form = useForm({ resolver: zodResolver(signInSchema) })

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    toast.loading('Signing in...')

    const { error } = await signIn.email(data)

    toast.dismiss()

    if (error) {
      if (error.status === 403) {
        toast.error('Please verify your email to continue.')
        return
      }
      toast.error(error.message)
      return
    }
    toast.success('Successfully signed in!')
    router.push('/')
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-3 max-w-sm w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="text-lg font-semibold">Sign in</h1>
        <DefaultField placeholder="Email" name="email" />
        <DefaultField placeholder="Password" name="password" type="password" />
        <Button disabled={form.formState.isSubmitting}>Continue</Button>
        <div className="justify-between flex text-sm text-muted-foreground">
          <p>
            Don't have an account?{' '}
            <Link
              href="/sign-up"
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
          <Link
            href="/forgot-password"
            className="text-primary font-medium hover:underline"
          >
            Forgot password
          </Link>
        </div>
      </form>
    </Form>
  )
}

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
      toast.warning('Please verify your email to continue.')
      router.push('/sign-up/verify-email')
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
        <Button disabled={form.formState.isSubmitting}>Continue</Button>
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

export function ForgotPasswordForm() {
  const router = useRouter()

  const form = useForm({ resolver: zodResolver(forgotPasswordSchema) })

  async function onSubmit(data: z.infer<typeof forgotPasswordSchema>) {
    const { error } = await authClient.forgetPassword({
      ...data
    })

    if (error) {
      toast.error(error.message)
      return
    }

    router.push('/reset-password')
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-3 max-w-sm w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="text-lg font-semibold">Forgot Password</h1>
        <DefaultField placeholder="Email" name="email" />
        <Button disabled={form.formState.isSubmitting}>Continue</Button>
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

export function ResetPasswordForm() {
  const router = useRouter()
  const params = useParams()

  const code = params.code as string

  const form = useForm({ resolver: zodResolver(resetPasswordSchema) })

  async function onSubmit(data: z.infer<typeof resetPasswordSchema>) {
    toast.loading('Resetting password...')
    const { error } = await authClient.resetPassword({
      newPassword: data.password,
      token: code
    })
    toast.dismiss()

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success('Password reset successfully.')
    router.push('/sign-in')
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-3 max-w-sm w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="text-lg font-semibold">Reset Password</h1>
        <DefaultField
          placeholder="New Password"
          name="password"
          type="password"
        />
        <DefaultField
          placeholder="Confirm New Password"
          name="confirm"
          type="password"
        />
        <Button disabled={form.formState.isSubmitting}>Reset Password</Button>
      </form>
    </Form>
  )
}
