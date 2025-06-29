'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks'
import { Plus, RefreshCcw, Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CreateLinkSheet } from '../form/create-link-sheet'

export function LinksTableFilter() {
  const router = useRouter()

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

  const urlQuery = searchParams.get('url') || ''

  const [url, setURL] = useState(urlQuery)

  const debouncedValue = useDebounce(url, 350)

  useEffect(() => {
    if (urlQuery === debouncedValue) return
    router.replace(`?url=${debouncedValue}`)
  }, [debouncedValue, urlQuery, router])

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
