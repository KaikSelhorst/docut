import { MoreVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { deleteLink } from '@/actions/dashboard/link'
import { UpdateLinkSheet } from '@/components/form/update-link-sheet'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface DataTableActionsProps {
  id: string
}

export function DataTableActions({ id }: DataTableActionsProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const router = useRouter()

  function copyURL() {
    try {
      navigator.clipboard.writeText(`${location.origin}/${id}`)
      toast.success('Link copied!')
    } catch {
      toast.error('Failure to copy URL')
    }
  }

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
          size="icon"
        >
          <MoreVertical />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <UpdateLinkSheet setExternalOpen={setDropdownOpen} linkId={id}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            Edit
          </DropdownMenuItem>
        </UpdateLinkSheet>
        <DropdownMenuItem onClick={copyURL}>Copy URL</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={async () => {
            toast.loading('Deleting...')
            const res = await deleteLink(id)

            toast.dismiss()
            if (!res.success) {
              toast.error(res.error)
              return
            }
            toast.success('Delete succefully')
            router.refresh()
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DataTableActionsSkeleton() {
  return (
    <Button
      variant="ghost"
      className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
      size="icon"
      disabled
    >
      <MoreVertical />
      <span className="sr-only">Open menu</span>
    </Button>
  )
}
