'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  type UpdateLinkSchema,
  updateLinkSchema
} from 'client/schemas/link-schema'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { type ListLinkUnit, updateLink } from '@/actions/dashboard/link'
import {
  DefaulTextAreaField,
  DefaultField,
  ExpirationDatePicker
} from '@/components/form/fields'
import { Button } from '@/components/ui/button'
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
import { createLinkModal } from '@/hooks'

interface UpdateLinkSheetProps {
  side?: 'left' | 'right'
  children: React.ReactNode
  setExternalOpen: (b: boolean) => void
  link: ListLinkUnit
}

export function UpdateLinkSheet({
  children,
  side = 'right',
  link,
  setExternalOpen
}: UpdateLinkSheetProps) {
  const router = useRouter()
  const form = useForm({ resolver: zodResolver(updateLinkSchema) })

  const [open, setOpen] = useState(false)

  async function onSubmit(data: UpdateLinkSchema) {
    toast.loading('Updating link...')
    const res = await updateLink(link.id, data)

    toast.dismiss()
    if (!res.success) {
      toast.error(res.error)
      return
    }

    toast.success('Link updated!')
    router.refresh()

    const shortedUrl = new URL(res.data.id, location.origin)

    createLinkModal({
      originalUrl: res.data.url,
      shortedUrl: shortedUrl.toString()
    })
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
            <DefaultField
              name="url"
              placeholder="URL"
              label="Full URL"
              defaultValue={link.url || ''}
            />
            <ExpirationDatePicker
              name="expiration"
              label="Expiration date"
              defaultValue={link.expiration || ''}
            />
            <h2 className="font-semibold">Metadata</h2>
            <DefaultField
              defaultValue={link.seo.title || ''}
              name="seo.title"
              label="Title"
              placeholder="Simple original title"
            />

            <DefaulTextAreaField
              defaultValue={link.seo.description || ''}
              name="seo.description"
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
