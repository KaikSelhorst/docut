'use client'
import { MoreVertical } from 'lucide-react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { TableCell, TableRow } from '../ui/table'
import { dateUtils } from '@/lib/date'
import { Skeleton } from '../ui/skeleton'
import { toast } from 'sonner'
import { UpdateLinkSheet } from '../form/update-link-sheet'
import { useState } from 'react'

interface LinksTableRowProps {
  id: string
  expiration: string
  url: string
  lastAccess: string
  clicks: number
}

export function LinksTableRow(props: LinksTableRowProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <TableRow>
      <TableCell className="font-medium">{props.id}</TableCell>
      <TableCell className="max-w-80 overflow-ellipsis relative overflow-clip">
        {props.url}
      </TableCell>
      <TableCell>{dateUtils.fromNow(props.expiration)}</TableCell>
      <TableCell>{dateUtils.fromNow(props.lastAccess)}</TableCell>
      <TableCell>{props.clicks}</TableCell>
      <TableCell className="w-[40px]">
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
            <UpdateLinkSheet setExternalOpen={setDropdownOpen}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Edit
              </DropdownMenuItem>
            </UpdateLinkSheet>
            <DropdownMenuItem>Copy URL</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={async () => {
                toast.loading('Deleting...')
                await new Promise((r) => setTimeout(r, 3000))
                toast.dismiss()
                toast.success('Delete succefully')
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}

export function LinksTableRowSkeleton() {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <Skeleton className="h-5 w-[72px]" />
      </TableCell>
      <TableCell className="max-w-80 overflow-ellipsis relative overflow-clip">
        <Skeleton className="h-5 w-64" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-24" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-16" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-12" />
      </TableCell>
      <TableCell className="w-[40px]">
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
          size="icon"
        >
          <MoreVertical />
          <span className="sr-only">Open menu</span>
        </Button>
      </TableCell>
    </TableRow>
  )
}
