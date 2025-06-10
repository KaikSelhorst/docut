'use client'
import { Plus, RefreshCcw, Search } from 'lucide-react'
import { CreateLinkSheet } from '../form/create-link-sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDebounce } from '@/hooks'

export function LinksTableFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const url = searchParams.get('url') || ''

  return (
    <div className="flex gap-3">
      <SearchURL />
      <Button variant="outline" size="icon" onClick={router.refresh}>
        <RefreshCcw />
      </Button>
      <CreateLinkSheet side="right">
        <Button className="cursor-pointer">
          <Plus />
          Shorten Link
        </Button>
      </CreateLinkSheet>
    </div>
  )
}

export function LinksTableFilterSkeleton() {
  return (
    <div className="flex gap-3">
      <SearchURL disabled />
      <Button variant="outline" size="icon" disabled>
        <RefreshCcw className="animate-spin" />
      </Button>
      <CreateLinkSheet side="right">
        <Button className="cursor-pointer" disabled>
          <Plus />
          Shorten Link
        </Button>
      </CreateLinkSheet>
    </div>
  )
}

export function SearchURL(props: React.ComponentProps<'input'>) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [url, setURL] = useState(searchParams.get('url') || '')

  const debouncedValue = useDebounce(url, 350)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if ((searchParams.get('url') || '') === debouncedValue) return
    router.push(`?url=${debouncedValue}`)
  }, [debouncedValue])

  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        autoFocus={!!url.length}
        {...props}
        placeholder="Search URL"
        className="pl-10"
        value={url}
        onChange={(e) => setURL(e.currentTarget.value)}
        onKeyUp={(e) => setURL(e.currentTarget.value)}
      />
    </div>
  )
}
