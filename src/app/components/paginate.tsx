'use client'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

export function Paginate({ totalPages }: { totalPages: number }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const page = useMemo(
    () => Number(searchParams.get('page')) || 1,
    [searchParams]
  )

  const canPrev = page > 1
  const canNext = page < totalPages

  function next() {
    router.push(setParams('page', String(page + 1)))
  }

  function prev() {
    router.push(setParams('page', String(page + -1)))
  }

  function setParams(key: string, value: string) {
    const query = new URLSearchParams(searchParams)
    query.set(key, value)
    return `?${query.toString()}`
  }

  return (
    <nav className="flex gap-2">
      <Button
        variant="outline"
        className="cursor-pointer"
        disabled={!canPrev}
        onClick={prev}
      >
        <ChevronLeft />
      </Button>
      <Button
        variant="outline"
        className="cursor-pointer"
        disabled={!canNext}
        onClick={next}
      >
        <ChevronRight />
      </Button>
    </nav>
  )
}
