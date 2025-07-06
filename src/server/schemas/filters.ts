import { z } from 'shared/lib/zod'

export const perPageSchema = (defaultPerPage: number) => {
  return z
    .string()
    .transform((v) => {
      const number = Number(v)

      // Number('undefined') => NaN
      // Number(undefined) => NaN
      // Number(joe-doe) => NaN
      // Number('null') => NaN

      if (Number.isNaN(number)) return defaultPerPage

      // Number(null) => 0
      // Number('') => 0
      if (!v) return defaultPerPage

      return number
    })
    .default(defaultPerPage)
}

export const pageSchema = (defaultPage: number) => {
  return z
    .string()
    .transform((v) => {
      const number = Number(v)

      // Number('undefined') => NaN
      // Number(undefined) => NaN
      // Number(joe-doe) => NaN
      // Number('null') => NaN

      if (Number.isNaN(number)) return defaultPage

      // Number(null) => 0
      // Number('') => 0
      if (!v) return defaultPage

      return number
    })
    .default(defaultPage)
}

const sortDirectionOptions = ['asc', 'desc'] as const

export const sortDirection = (
  defaultSortDirection: (typeof sortDirectionOptions)[number]
) => {
  return z
    .string()
    .transform((v) => {
      if (sortDirectionOptions.some((d) => d === v))
        return v as (typeof sortDirectionOptions)[number]
      return defaultSortDirection
    })
    .default(defaultSortDirection)
}

export const sortBy = (defaultSortBy: string) =>
  z.string().default(defaultSortBy)
