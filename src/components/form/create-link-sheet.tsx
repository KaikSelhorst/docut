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
import { Separator } from '../ui/separator'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const schema = z.object({})

type Schema = z.infer<typeof schema>

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
  const form = useForm()

  async function onSubmit(data: Schema) {
    toast.loading('Creating link...')
    await new Promise((r) => setTimeout(r, 3000))
    toast.dismiss()

    toast.success('Link created!')
    router.refresh()
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
            <DefaultField
              name="expiration"
              label="Expiration date"
              type="datetime-local"
            />
            <Separator />
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
