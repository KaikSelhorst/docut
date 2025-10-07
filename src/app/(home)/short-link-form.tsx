'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { createLinkSchema } from 'client/schemas/link-schema'
import dayjs from 'dayjs'
import { Settings, Zap } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSession } from 'shared/lib/auth/client'
import { toast } from 'sonner'
import { createLink } from '@/actions/public/create-link'
import {
  DefaulTextAreaField,
  DefaultField,
  ExpirationDatePicker
} from '@/components/form/fields'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createLinkModal } from '@/hooks'

export function ShortLinkForm() {
  const { data: session } = useSession()

  const form = useForm({
    resolver: zodResolver(createLinkSchema),
    defaultValues: { expiration: dayjs().add(1, 'day').toISOString() }
  })

  return (
    <Form {...form}>
      <form
        className="flex flex-col sm:flex-row gap-2 max-w-xl mx-auto"
        onSubmit={form.handleSubmit(async (data) => {
          toast.loading('Shortening link...')
          const res = await createLink(data)
          toast.dismiss()

          if (!res.success) {
            toast.error(res.error)
            return
          }

          toast.success('Link shortened successfully.')
          const shortedURL = new URL(res.data.id, location.origin)
          navigator.clipboard.writeText(shortedURL.toString())
          toast.success('Shortened link saved to your clipboard', {
            action: {
              label: 'Copy',
              onClick: () =>
                navigator.clipboard.writeText(shortedURL.toString())
            }
          })

          form.reset()

          createLinkModal({
            originalUrl: data.url,
            shortedUrl: shortedURL.toString()
          })
        })}
      >
        <FormField
          name="url"
          control={form.control}
          defaultValue=""
          render={({ field }) => (
            <FormItem className="relative w-full">
              <FormControl>
                <Input
                  placeholder="https://youtu.be/dQw4w9WgXcQ?si=e04RvkW_ko38ETkG"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="absolute right-0 top-0 rounded-l-none"
                  >
                    <Settings size={16} />
                    <span className="sr-only">Configure link</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
                  <DialogHeader className="contents space-y-0 text-left">
                    <DialogTitle className="border-b px-6 py-4 text-base">
                      Link Shortening Options
                    </DialogTitle>
                  </DialogHeader>
                  <div className="overflow-y-auto">
                    <div className="px-6 pt-4 pb-6">
                      <form className="space-y-4">
                        <ExpirationDatePicker
                          maxDate={
                            session ? undefined : dayjs().add(7, 'day').toDate()
                          }
                          name="expiration"
                          label="Expiration Date"
                          description="Your link will stop redirecting on this date. Leave
                        blank for no expiration."
                        />
                        <DefaultField
                          name="seo.title"
                          label="Preview Title"
                          placeholder="Matt"
                          description="Also known as Open Graph (og) Title: this is the title
                        for the link preview on services like Twitter or
                        iMessage. Aim for less than 60 characters."
                        />
                        <DefaulTextAreaField
                          name="seo.description"
                          label="Preview Description"
                          placeholder="Matt"
                          description="Also known as Open Graph (og) Description: this is the
                        description for the link preview on services like
                        Twitter or iMessage. Aim for less than 200 characters."
                        />
                      </form>
                    </div>
                  </div>
                  <DialogFooter className="border-t px-6 py-4">
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button type="button">Save Options</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </FormItem>
          )}
        />
        <Button>
          <Zap size={16} /> Shorten
        </Button>
      </form>
    </Form>
  )
}
