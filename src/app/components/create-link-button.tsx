'use client'
import { createLink } from '@/actions/private/create-link'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { UpdateLinkForm } from './update-link-form'
export function CreateLinkButton() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  async function onSubmit(e: any) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    toast.loading('Updating link...')

    const expirationFormData = (formData.get('expiration') as string) || null

    const expirationDate = expirationFormData
      ? new Date(expirationFormData).toUTCString()
      : expirationFormData

    const res = await createLink({
      expiration: expirationDate,
      seo: {
        description: (formData.get('seo.description') as string) || null,
        title: (formData.get('seo.title') as string) || null
      },
      url: formData.get('url') as string
    })

    toast.dismiss()

    if (!res.success) {
      toast.error(res.error)
      return
    }

    toast.success('Link updated!')
    setOpen(false)
    router.refresh()
  }

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button className="cursor-pointer">Create link</Button>
      </SheetTrigger>
      <SheetContent className="max-sm:w-screen md:min-w-[520px]">
        <SheetHeader>
          <SheetTitle>Create your link</SheetTitle>
        </SheetHeader>
        <form className="grid gap-3 px-4" onSubmit={onSubmit}>
          <UpdateLinkForm
            expiration=""
            seo={{ description: '', title: '' }}
            url=""
          />
          <Button
            className="cursor-pointer"
            variant="outline"
            type="reset"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
