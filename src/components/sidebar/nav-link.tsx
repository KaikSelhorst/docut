import { Plus } from 'lucide-react'

import { useSidebar } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { CreateLinkSheet } from '../form/create-link-sheet'

export function NavLink() {
  const { open } = useSidebar()

  if (open) {
    return (
      <CreateLinkSheet>
        <Button className="cursor-pointer">Shorten link</Button>
      </CreateLinkSheet>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <CreateLinkSheet>
          <Button className="cursor-pointer max-h-8">
            <Plus size={4} />
          </Button>
        </CreateLinkSheet>
      </TooltipTrigger>
      <TooltipContent>Shorten link</TooltipContent>
    </Tooltip>
  )
}
