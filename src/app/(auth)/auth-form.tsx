'use client'

import { DefaultField } from '@/components/form/fields'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema, signUpForm } from 'client/schemas/auth-schema'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { signIn, signUp } from 'shared/lib/auth/client'
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
        toast.error('Please verify your email address to continue.')
        return
      }
      toast.error(error.message)
      return
    }
    toast.success('Signed in successfully!')
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
      toast.warning('Please verify your email address to continue.')
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
