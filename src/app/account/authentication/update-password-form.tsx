'use client'
import { DefaultField } from '@/components/form/fields'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updatePasswordSchema } from 'client/schemas/user-schema'
import { SquareArrowOutUpRight } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { authClient } from 'shared/lib/auth/client'
import { toast } from 'sonner'

export function UpdatePassword() {
  const form = useForm({ resolver: zodResolver(updatePasswordSchema) })
  return (
    <Form {...form}>
      <form
        className="border rounded-md not-first:mt-6"
        onSubmit={form.handleSubmit(async (data) => {
          toast.loading('Updating password...')
          const { error } = await authClient.changePassword({
            currentPassword: data.current,
            newPassword: data.password,
            revokeOtherSessions: true
          })
          toast.dismiss()

          if (error) {
            toast.error(error.message)
            return
          }
          toast.success('Password updated.')
        })}
      >
        <div className="p-4 space-y-3 i **:data-input-container:max-w-md">
          <h2 className="text-xl font-semibold">Password</h2>
          <p className="text-sm">
            Enter your current password and a new password for your Docut
            account.
          </p>
          <DefaultField
            name="current"
            type="password"
            label="Current Password"
            placeholder="ymAthpLqpYQX9gsG"
          />
          <DefaultField
            name="password"
            type="password"
            label="New Password"
            placeholder="ymAthpLqpYQX9gsG"
          />
          <DefaultField
            name="confirm"
            label="Confirm New Password"
            type="password"
            placeholder="ymAthpLqpYQX9gsG"
          />
        </div>
        <div className="flex justify-between border-t p-4 items-center">
          <p className="text-sm text-muted-foreground">
            Check your password strength using an{' '}
            <Link
              href="https://bitwarden.com/password-strength/#Password-Strength-Testing-Tool"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-[2px]"
            >
              external validator <SquareArrowOutUpRight size={12} />
            </Link>
          </p>
          <Button size="sm" type="submit">
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}
