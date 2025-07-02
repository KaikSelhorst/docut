import { useSearchParams } from 'next/navigation'

export function useTableFilters<T extends string>(
  arr: readonly T[]
): Record<T, string | undefined> {
  const searchParams = useSearchParams()

  const obj = {} as Record<T, string | undefined>

  for (let i = 0; i < arr.length; i++) {
    const query = arr[i]
    const queryValue = searchParams.get(query) ?? undefined

    obj[query] = queryValue
  }

  return obj
}
