import { Plus, Search } from 'lucide-react'
import { CreateLinkSheet } from '../form/create-link-sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function LinksTableFilter() {
  return (
    <div className="flex gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search URL" className="pl-10" />
      </div>
      <CreateLinkSheet side="right">
        <Button className="cursor-pointer">
          <Plus />
          Shorten Link
        </Button>
      </CreateLinkSheet>
    </div>
  )
}
