'use client'
import { createLink } from '@/actions/dashboard/link'
import {
  DefaulTextAreaField,
  DefaultField,
  ExpirationDatePicker
} from '@/components/form/fields'
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
import type { z } from '@/shared/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createLinkSchema } from 'client/schemas/link-schema'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '../ui/button'

type Schema = z.infer<typeof createLinkSchema>

interface CreateLinkSheetProps {
  side?: 'left' | 'right'
  children: React.ReactNode
}

export function CreateLinkSheet({
  children,
  side = 'left'
}: CreateLinkSheetProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const form = useForm({ resolver: zodResolver(createLinkSchema) })

  async function onSubmit(data: Schema) {
    toast.loading('Creating link...')
    const res = await createLink(data)

    toast.dismiss()
    if (!res.success) {
      toast.error(res.error)
      return
    }

    setOpen(false)
    toast.success('Link created!')
    router.refresh()
    form.reset()
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(b) => {
        if (form.formState.isSubmitting) return
        setOpen(b)
      }}
    >
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side={side}
        onFocusOutside={(e) => {
          e.preventDefault()
        }}
      >
        <SheetHeader>
          <SheetTitle>Shorten link</SheetTitle>
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
            <ExpirationDatePicker
              name="expiration"
              label="Expiration date"
              description="If you leave no expiration data, the link will be permanent."
            />
            <h2 className="font-semibold">Metadata</h2>
            <DefaultField
              name="seo.title"
              label="Title"
              placeholder="Simple original title"
            />

            <DefaulTextAreaField
              name="seo.description"
              label="Description"
              placeholder="About your link"
            />

            <Button
              className="cursor-pointer"
              disabled={form.formState.isSubmitting}
            >
              Shorten link
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
