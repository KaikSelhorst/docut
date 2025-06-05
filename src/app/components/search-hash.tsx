'use client'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function SearchHash() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [hash, setHash] = useState(searchParams.get('hash') || '')

  const debouncedValue = useDebounce(hash, 500)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if ((searchParams.get('hash') || '') === debouncedValue) return
    router.push(`?hash=${debouncedValue}`)
  }, [debouncedValue])

  return (
    <Input
      placeholder="Find by id"
      value={hash}
      onChange={(e) => {
        setHash(e.currentTarget.value)
      }}
      onKeyUp={(e) => {}}
    />
  )
}
