'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  deleteAccountForm,
  updateDisplayNameSchema,
  updateEmailSchema
} from 'client/schemas/user-schema'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { authClient } from 'shared/lib/auth/client'
import { toast } from 'sonner'
import { DefaultField } from '@/components/form/fields'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'

interface UpdateDisplayNameProps {
  displayName: string
}

export function UpdateDisplayName({ displayName }: UpdateDisplayNameProps) {
  const form = useForm({ resolver: zodResolver(updateDisplayNameSchema) })

  return (
    <Form {...form}>
      <form
        className="border rounded-md not-first:mt-6"
        onSubmit={form.handleSubmit(async (data) => {
          toast.loading('Updating display name...')

          const { error } = await authClient.updateUser({
            name: data.name
          })
          toast.dismiss()
          if (error) {
            toast.error(error.message)
            return
          }
          toast.success('Display name updated.')
        })}
      >
        <div className="p-4 space-y-3 [&_input]:max-w-md">
          <h2 className="text-xl font-semibold">Display Name</h2>
          <p className="text-sm">
            Enter your full name or a display name you prefer.
          </p>
          <DefaultField
            placeholder="Joe Doe"
            name="name"
            defaultValue={displayName}
          />
        </div>
        <div className="flex justify-between border-t p-4 items-center">
          <p className="text-sm text-muted-foreground">
            Maximum 32 characters.
          </p>
          <Button
            size="sm"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}

interface UpdateEmailFormProps {
  email: string
}

export function UpdateEmailForm({ email }: UpdateEmailFormProps) {
  const form = useForm({ resolver: zodResolver(updateEmailSchema) })

  return (
    <Form {...form}>
      <form
        className="border rounded-md not-first:mt-6"
        onSubmit={form.handleSubmit(async (data) => {
          toast.loading('Updating email...')

          const { error } = await authClient.changeEmail({
            newEmail: data.email
          })
          toast.dismiss()
          if (error) {
            toast.error(error.message)
            return
          }
          toast.success('Email updated.')
        })}
      >
        <div className="p-4 space-y-3 [&_input]:max-w-md">
          <h2 className="text-xl font-semibold">Email</h2>
          <p className="text-sm">
            Enter the email address you want to use for logging into Docut.
          </p>
          <DefaultField
            type="email"
            name="email"
            placeholder="some-original@docut.xyz"
            defaultValue={email}
          />
        </div>
        <div className="flex justify-between border-t p-4 items-center">
          <p className="text-sm text-muted-foreground">
            A verification code will be sent to your new email address.
          </p>
          <Button size="sm" disabled={form.formState.isSubmitting}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}

export function DeleteAccount() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const form = useForm({
    resolver: zodResolver(deleteAccountForm)
  })

  return (
    <section className="border rounded-md not-first:mt-6 border-destructive/50">
      <div className="p-4 space-y-3">
        <h2 className="text-xl font-semibold">Delete Account</h2>
        <p className="text-sm">
          Permanently delete your account and all its contents from Docut. This
          action is irreversible, so please proceed with caution.
        </p>
      </div>
      <div className="flex justify-end border-t border-destructive/50 p-4 items-center bg-destructive/25">
        <Dialog
          open={open}
          onOpenChange={(b) => {
            form.reset()
            setOpen(b)
          }}
        >
          <DialogTrigger asChild>
            <Button size="sm" variant="destructive">
              Delete my account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Personal Account</DialogTitle>
              <DialogDescription>
                This will permanently delete your account and all associated
                data.
              </DialogDescription>
            </DialogHeader>
            <main>
              <Form {...form}>
                <form
                  id="delete-account-form"
                  className="space-y-3"
                  onSubmit={form.handleSubmit(async (data) => {
                    toast.loading('Deleting account!')
                    const { error } = await authClient.deleteUser({
                      password: data.password
                    })

                    toast.dismiss()
                    if (error) {
                      toast.error(error.message)
                      return
                    }

                    toast.success('Account deleted!')
                    router.push('/')
                    router.refresh()
                  })}
                >
                  <DefaultField
                    name="password"
                    placeholder="your-password"
                    label="Password"
                    type="password"
                  />
                  <Label onClick={() => form.setFocus('delete')}>
                    Type <b>DELETE</b> in the box below to confirm.
                  </Label>
                  <DefaultField name="delete" placeholder="DELETE" />
                </form>
              </Form>
            </main>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Back</Button>
              </DialogClose>
              <Button
                variant="destructive"
                type="submit"
                form="delete-account-form"
                disabled={
                  form.formState.isSubmitting || !form.formState.isValid
                }
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

export function UpdateAccountFormSkeleton() {
  return (
    <section className="border rounded-md not-first:mt-6">
      <div className="p-4 space-y-3 [&_input]:max-w-md">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-5 w-96" />
        <Skeleton className="h-7 invisible" />
      </div>
      <div className="flex justify-between border-t p-4 items-center">
        <Skeleton className="h-5 w-96" />
        <Skeleton className="h-9 w-16" />
      </div>
    </section>
  )
}
