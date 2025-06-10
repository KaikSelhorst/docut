import type dayjs from 'dayjs'
import { cn } from '@/lib/utils'

interface CalendarYearSelectProps {
  date: dayjs.Dayjs
  minDate: dayjs.Dayjs
  maxDate: dayjs.Dayjs
  onSelect: (date: dayjs.Dayjs) => void
}

export function CalendarYearSelect({
  date,
  minDate,
  maxDate,
  onSelect
}: CalendarYearSelectProps) {
  const startYear = minDate.year()
  const endYear = maxDate.year()
  const years: number[] = []
  for (let year = startYear; year <= endYear; year++) {
    years.push(year)
  }

  return (
    <div className="grid grid-cols-3 gap-2 text-center max-h-[340px] overflow-auto">
      {years.map((year) => {
        const yearDate = date.year(year)
        const isSelected = date.year() === year
        return (
          <button
            type="button"
            key={year}
            className={cn(
              'rounded considerably-md p-2 text-sm',
              isSelected
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-secondary'
            )}
            onClick={() => onSelect(yearDate)}
          >
            {year}
          </button>
        )
      })}
    </div>
  )
}
