'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signIn, signUp } from '@/shared/lib/auth/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

export function SignInForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useTransition()

  async function onSubmit(e: any) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const email = formData.get('email') || ''
    const password = formData.get('password') || ''

    toast.loading('Signing....')

    const { error } = await signIn.email({
      email: email as string,
      password: password as string
    })

    toast.dismiss()
    if (error) {
      toast.error(error.message)
      return
    }
    toast.success('Sign in completed!')

    router.push('/')
  }

  return (
    <form
      className="grid gap-3 max-w-sm w-full"
      onSubmit={(e) => setIsLoading(async () => await onSubmit(e))}
    >
      <h1 className="text-lg font-semibold">Sign in</h1>
      <Input placeholder="Email" type="email" name="email" />
      <Input placeholder="Password" type="password" name="password" />
      <Button disabled={isLoading}>Continuar</Button>
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
  )
}

export function SignUpForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useTransition()

  async function onSubmit(e: any) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const email = formData.get('email') || ''
    const password = formData.get('password') || ''
    const name = formData.get('name') || ''

    const { error } = await signUp.email({
      name: name as string,
      email: email as string,
      password: password as string
    })

    if (error) {
      toast.error(error.message)
      return
    }
    router.push('/')
  }

  return (
    <form
      className="grid gap-3 max-w-sm w-full"
      onSubmit={(e) => setIsLoading(async () => await onSubmit(e))}
    >
      <h1 className="text-lg font-semibold">Sign up</h1>
      <Input placeholder="Name" name="name" />
      <Input placeholder="Email" type="email" name="email" />
      <Input placeholder="Password" type="password" name="password" />
      <Button disabled={isLoading}>Continuar</Button>
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
  )
}
