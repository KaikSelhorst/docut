import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from '@/hooks'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

interface PerPageProps {
  paramName?: string
  defaultValue?: number
  options?: number[]
}

/**
 * Component for selecting the number of items per page, with support for URL parameters and debounce.
 * @param paramName - Name of the parameter in the URL (default: 'per_page')
 * @param defaultValue - Default value for items per page (default: 16)
 * @param options - List of available options for selection (default: [16, 24, 32, 48, 64])
 */
export function PerPage({
  paramName = 'per_page',
  defaultValue = 16,
  options = [16, 24, 32, 48, 64]
}: PerPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const perPageQuery = Number(searchParams.get(paramName)) || defaultValue

  const [perPage, setPerPage] = useState(
    options.includes(perPageQuery) ? perPageQuery : defaultValue
  )

  const debouncedValue = useDebounce(perPage, 350)

  useEffect(() => {
    if (perPageQuery === debouncedValue) return

    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set(paramName, String(debouncedValue))

    router.replace(`?${newSearchParams.toString()}`)
  }, [debouncedValue, perPageQuery, searchParams, router, paramName])

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="rows-per-page" className="text-sm font-medium">
        Rows per page
      </Label>
      <Select
        value={`${perPage}`}
        onValueChange={(value) => setPerPage(Number(value))}
      >
        <SelectTrigger
          size="sm"
          className="w-20"
          id="rows-per-page"
          aria-label="Select number of rows per page"
        >
          <SelectValue placeholder={perPage} />
        </SelectTrigger>
        <SelectContent side="top">
          {options.map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
