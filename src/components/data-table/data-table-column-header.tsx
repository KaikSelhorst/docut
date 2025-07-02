import { cn } from '@/lib/utils'
import type { Column } from '@tanstack/react-table'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) return <div className={cn(className)}>{title}</div>

  return (
    <div
      className={cn(
        column.getCanSort() &&
          'flex h-full cursor-pointer items-center justify-between gap-2 select-none'
      )}
      onClick={column.getToggleSortingHandler()}
      onKeyDown={(e) => {
        // Enhanced keyboard handling for sorting
        if (column.getCanSort() && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          column.getToggleSortingHandler()?.(e)
        }
      }}
      tabIndex={column.getCanSort() ? 0 : undefined}
    >
      {title}
      {{
        asc: (
          <ChevronUpIcon
            className="shrink-0 opacity-60"
            size={16}
            aria-hidden="true"
          />
        ),
        desc: (
          <ChevronDownIcon
            className="shrink-0 opacity-60"
            size={16}
            aria-hidden="true"
          />
        )
      }[column.getIsSorted() as string] ?? null}
    </div>
  )
}
