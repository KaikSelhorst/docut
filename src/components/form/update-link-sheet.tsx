'use client'
import { DefaulTextAreaField, DefaultField } from '@/components/form/fields'
import { Form } from '@/components/ui/form'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const schema = z.object({})

type Schema = z.infer<typeof schema>

interface UpdateLinkSheetProps {
  side?: 'left' | 'right'
  children: React.ReactNode
  setExternalOpen: (b: boolean) => void
}

export function UpdateLinkSheet({
  children,
  side = 'right',
  setExternalOpen
}: UpdateLinkSheetProps) {
  const router = useRouter()
  const form = useForm()

  const [open, setOpen] = useState(false)

  async function onSubmit(data: Schema) {
    toast.loading('Updating link...')
    await new Promise((r) => setTimeout(r, 3000))
    toast.dismiss()

    toast.success('Link updated!')
    router.refresh()
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(b) => {
        if (form.formState.isSubmitting) return
        setOpen(b)
        if (setExternalOpen) setExternalOpen(b)
      }}
    >
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Update link</SheetTitle>
          <SheetDescription>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores
            ipsa.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-3 px-4"
          >
            <DefaultField name="url" placeholder="URL" label="Full URL" />
            <DefaultField
              name="expiration"
              label="Expiration date"
              type="datetime-local"
            />
            <h1 className="font-semibold">Metadata</h1>
            <DefaultField
              name="title"
              label="Title"
              placeholder="Simple original title"
            />

            <DefaulTextAreaField
              name="description"
              label="Description"
              placeholder="About your link"
            />

            <Button
              className="cursor-pointer"
              disabled={form.formState.isSubmitting}
            >
              Update link
            </Button>
            <SheetClose asChild>
              <Button
                disabled={form.formState.isSubmitting}
                type="button"
                variant="outline"
                className="cursor-pointer"
              >
                Back
              </Button>
            </SheetClose>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
