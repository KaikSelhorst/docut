'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { getLink, updateLink } from '@/actions/dashboard/link'
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
import { z } from '@/shared/lib/zod'
import {
  descriptionValidator,
  expirationValidator,
  titleValidator,
  urlValidator
} from '@/shared/validators'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'

const schema = z.object({
  url: urlValidator(),
  expiration: expirationValidator(),

  seo: z.object({
    title: titleValidator(),
    description: descriptionValidator()
  })
})

type Schema = z.infer<typeof schema>

type getLinkValue = Awaited<ReturnType<typeof getLink>>

type LinkWithSeo = Extract<getLinkValue, { success: true }>['data']

interface UpdateLinkSheetProps {
  side?: 'left' | 'right'
  children: React.ReactNode
  setExternalOpen: (b: boolean) => void
  linkId: string
}

export function UpdateLinkSheet({
  children,
  side = 'right',
  linkId,
  setExternalOpen
}: UpdateLinkSheetProps) {
  const router = useRouter()
  const form = useForm({ resolver: zodResolver(schema) })

  const [link, setLink] = useState<LinkWithSeo | null>(null)

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function onSubmit(data: Schema) {
    toast.loading('Updating link...')
    const res = await updateLink(linkId, data)

    toast.dismiss()
    if (!res.success) {
      toast.error(res.error)
      return
    }

    toast.success('Link updated!')
    router.refresh()
  }

  useEffect(() => {
    if (!loading) return
    setLoading(true)
    getLink(linkId)
      .then((v) => {
        if (v.success) {
          setLink(v.data)
          return
        }
        toast.error(v.error)
        setOpen(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [loading, linkId])

  return (
    <Sheet
      open={open}
      onOpenChange={(b) => {
        if (form.formState.isSubmitting) return
        setOpen(b)
        if (setExternalOpen) setExternalOpen(b)
      }}
    >
      <SheetTrigger asChild onClick={() => setLoading(true)}>
        {children}
      </SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Update link</SheetTitle>
          <SheetDescription>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores
            ipsa.
          </SheetDescription>
        </SheetHeader>
        {loading ? (
          <FormSkeleton />
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-3 px-4"
            >
              <DefaultField
                name="url"
                placeholder="URL"
                label="Full URL"
                defaultValue={link?.url || ''}
              />
              <ExpirationDatePicker
                name="expiration"
                label="Expiration date"
                defaultValue={link?.expiration || ''}
              />
              <h2 className="font-semibold">Metadata</h2>
              <DefaultField
                defaultValue={link?.seo.title || ''}
                name="seo.title"
                label="Title"
                placeholder="Simple original title"
              />

              <DefaulTextAreaField
                defaultValue={link?.seo.description || ''}
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
        )}
      </SheetContent>
    </Sheet>
  )
}

function FormSkeleton() {
  return (
    <div className="grid gap-3 px-4">
      <Skeleton className="h-6 w-12" />
      <Skeleton className="h-10 w-full" />

      <Skeleton className="h-6 w-12" />
      <Skeleton className="h-10 w-full" />

      <Skeleton className="h-6 w-16" />
      <Skeleton className="h-6 w-12" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-6 w-12" />
      <Skeleton className="h-56 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  )
}
