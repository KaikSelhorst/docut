import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

import { cn } from '@/lib/utils'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

interface CalendarDaySelectProps {
  date: dayjs.Dayjs
  minDate: dayjs.Dayjs
  maxDate: dayjs.Dayjs
  locale: string
  onSelect: (date: dayjs.Dayjs) => void
}

export function CalendarDaySelect({
  date,
  minDate,
  maxDate,
  onSelect
}: CalendarDaySelectProps) {
  const startOfMonth = date.startOf('month')
  const endOfMonth = date.endOf('month')
  const startDay = startOfMonth.startOf('week')
  const endDay = endOfMonth.endOf('week')
  const days: dayjs.Dayjs[] = []
  let currentDay = startDay

  while (currentDay.isBefore(endDay)) {
    days.push(currentDay)
    currentDay = currentDay.add(1, 'day')
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
        {dayjs.weekdaysShort(true).map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {days.map((day) => {
          const isSelected = day.isSame(date, 'day')
          const isDisabled =
            (minDate && day.isBefore(minDate, 'day')) ||
            (maxDate && day.isAfter(maxDate, 'day'))
          const isCurrentMonth = day.isSame(date, 'month')

          return (
            <button
              type="button"
              key={day.toString()}
              className={cn(
                'rounded-md p-2',
                isSelected
                  ? 'bg-background text-foreground'
                  : isCurrentMonth
                    ? 'text-foreground hover:bg-secondary'
                    : 'text-muted-foreground',
                isDisabled && 'cursor-not-allowed opacity-50',
                'focus:outline-none'
              )}
              onClick={() => !isDisabled && onSelect(day)}
              disabled={isDisabled}
            >
              {day.date()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
