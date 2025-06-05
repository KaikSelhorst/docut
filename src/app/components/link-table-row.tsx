'use client'
import { deleteLink } from '@/actions/private/delete-link'
import { getLink } from '@/actions/private/get-link'
import { updateLink } from '@/actions/private/update-link'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'
import { dateUtils } from '@/lib/date'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { UpdateLinkForm } from './update-link-form'
import { DeleteButton } from '@/components/buttons/delete-button'

interface LinkTableRowProps {
  url: string
  id: string
  expiration: string | null
  clicks: number
}

type AllLinkData = Awaited<ReturnType<typeof getLink>>
type LinkWithSeo = Extract<AllLinkData, { success: true }>['data']

export function LinkTableRow({
  clicks,
  expiration,
  id,
  url
}: LinkTableRowProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [onAction, setOnAction] = useTransition()
  const [open, setOpen] = useState(false)
  const [allLinkData, setAllLinkData] = useState<LinkWithSeo | null>(null)

  async function onSubmit(e: any) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    toast.loading('Updating link...')

    let expirationFormData = (formData.get('expiration') as string) || null

    if (expirationFormData && expiration) {
      expirationFormData += `T${expiration.split('T')[1]}`
    }

    const expirationDate = expirationFormData
      ? new Date(expirationFormData).toISOString()
      : expirationFormData

    const res = await updateLink(id, {
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

  async function onDeleteLink() {
    toast.loading('Deleting your link')
    const res = await deleteLink(id)

    toast.dismiss()

    if (!res.success) {
      toast.error(res.error)
      return
    }
    toast.success('Link deleted')
    setOpen(false)
    router.refresh()
  }

  useEffect(() => {
    if (!loading) return
    getLink(id).then((value) => {
      setLoading(false)
      if ('error' in value) {
        setOpen(false)
        toast.error(value.error)
        return
      }
      setAllLinkData(value.data)
    })
  }, [loading, id])

  return (
    <TableRow key={id}>
      <TableCell
        className="cursor-copy"
        onClick={() => {
          navigator.clipboard.writeText(`${location.origin}/${id}`)
          toast.success('Shorted link copied!')
        }}
      >
        {id}
      </TableCell>
      <TableCell
        className="max-w-80 overflow-ellipsis overflow-clip cursor-copy"
        onClick={() => {
          navigator.clipboard.writeText(url)
          toast.success('Full link copied!')
        }}
      >
        {url}
      </TableCell>
      <TableCell>
        {expiration ? dateUtils.fromNow(expiration) : 'Unlimited'}
      </TableCell>
      <TableCell>{clicks}</TableCell>
      <TableCell>
        <Sheet onOpenChange={setOpen} open={open}>
          <SheetTrigger
            onClick={() => setLoading(true)}
            className="cursor-pointer w-full text-right"
          >
            edit
          </SheetTrigger>
          <SheetContent className="max-sm:w-screen md:min-w-[520px]">
            <SheetHeader>
              <SheetTitle>Edit</SheetTitle>
            </SheetHeader>
            <form className="grid gap-3 px-4" onSubmit={onSubmit}>
              {loading || !allLinkData ? (
                <FormSkeleton />
              ) : (
                <>
                  <UpdateLinkForm
                    expiration={allLinkData.expiration}
                    seo={allLinkData.seo}
                    url={allLinkData.url}
                  />
                  <DeleteButton action={onDeleteLink}>Delete link</DeleteButton>
                </>
              )}
            </form>
          </SheetContent>
        </Sheet>
      </TableCell>
    </TableRow>
  )
}

export function LinkTableRowSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-5 w-[72px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-80" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-24" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-12" />
      </TableCell>
      <TableCell className="cursor-pointer text-right">
        <Skeleton className="h-5 w-12" />
      </TableCell>
    </TableRow>
  )
}

function FormSkeleton() {
  return (
    <>
      <fieldset className="space-y-3">
        <legend>General info</legend>
        <Skeleton className="h-9 px-3 py-1" />
        <Skeleton className="h-9 px-3 py-1" />
      </fieldset>
      <fieldset className="space-y-3">
        <legend>SEO</legend>
        <Skeleton className="h-9 px-3 py-1" />
        <Skeleton className="min-h-44 px-3 py-1" />
      </fieldset>
      <Skeleton className="h-9 px-4 py-2" />
      <Skeleton className="h-9 px-4 py-2" />
    </>
  )
}
