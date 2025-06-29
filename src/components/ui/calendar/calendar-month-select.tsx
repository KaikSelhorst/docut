import { cn } from '@/lib/utils'
import dayjs from 'dayjs'

interface CalendarMonthSelectProps {
  date: dayjs.Dayjs
  minDate: dayjs.Dayjs
  maxDate: dayjs.Dayjs
  locale: string
  onSelect: (date: dayjs.Dayjs) => void
}

export function CalendarMonthSelect({
  date,
  minDate,
  maxDate,
  onSelect
}: CalendarMonthSelectProps) {
  const months = dayjs.months()
  return (
    <div className="grid grid-cols-3 gap-2 text-center">
      {months.map((month, index) => {
        const monthDate = date.month(index)
        const isDisabled =
          (minDate && monthDate.isBefore(minDate, 'month')) ||
          (maxDate && monthDate.isAfter(maxDate, 'month'))
        const isSelected = date.month() === index
        return (
          <button
            type="button"
            key={month}
            className={cn(
              'rounded-md p-2 text-sm',
              isSelected
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-secondary',
              isDisabled && 'cursor-not-allowed opacity-50',
              'focus:outline-none focus:ring-2'
            )}
            onClick={() => !isDisabled && onSelect(monthDate)}
            disabled={isDisabled}
          >
            {month}
          </button>
        )
      })}
    </div>
  )
}
