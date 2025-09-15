import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import { ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../button'
import { CalendarDaySelect } from './calendar-day-select'
import { CalendarMonthSelect } from './calendar-month-select'
import { CalendarYearSelect } from './calendar-year-select'

dayjs.extend(localeData)

export interface CalendarProps {
  date?: Date | dayjs.Dayjs | string
  minDate?: Date | dayjs.Dayjs
  maxDate?: Date | dayjs.Dayjs
  locale?: string
  onChange: (date: dayjs.Dayjs) => void
}

const DAY = 'day'
const MONTH = 'month'
const YEAR = 'year'

export function Calendar(props: CalendarProps) {
  const {
    date = dayjs(),
    minDate = dayjs('1900-01-01'),
    maxDate = dayjs('2100-12-31'),
    locale = 'de',
    onChange
  } = props

  const selectedDate = dayjs.isDayjs(date) ? date : dayjs(date || new Date())
  const minDateDayjs = dayjs.isDayjs(minDate) ? minDate : dayjs(minDate)
  const maxDateDayjs = dayjs.isDayjs(maxDate) ? maxDate : dayjs(maxDate)

  const [select, setSelect] = useState(DAY)
  const month = selectedDate.locale(locale).format('MMM')
  const year = selectedDate.year()

  function handleSelect(value: string) {
    setSelect((state) => (state !== value ? value : DAY))
  }

  function handleChange(value: dayjs.Dayjs) {
    setSelect(DAY)
    if (value?.isValid()) {
      onChange(value)
    }
  }

  const handlePrevMonth = () => {
    onChange(selectedDate.subtract(1, 'month'))
  }

  const handleNextMonth = () => {
    onChange(selectedDate.add(1, 'month'))
  }

  return (
    <div className="w-[290px] rounded-md border bg-popover p-3">
      <div className="mb-4 flex items-center justify-between">
        <Button
          size="icon"
          variant="outline"
          type="button"
          className="size-8"
          onClick={handlePrevMonth}
          disabled={
            minDate &&
            selectedDate.startOf('month').isSameOrBefore(minDate, 'month')
          }
        >
          <ChevronLeft size={16} />
        </Button>
        <Button
          type="button"
          variant="outline"
          className={cn('h-8 text-sm')}
          onKeyUp={() => handleSelect(MONTH)}
          onClick={() => handleSelect(MONTH)}
        >
          {month}
          <span className="ml-1 text-muted-foreground">
            {select === MONTH ? <X size={16} /> : <ChevronDown size={16} />}
          </span>
        </Button>
        <Button
          type="button"
          className={cn('text-sm h-8')}
          variant="outline"
          onKeyUp={() => handleSelect(YEAR)}
          onClick={() => handleSelect(YEAR)}
        >
          {year}
          <span className="ml-1  text-muted-foreground">
            {select === YEAR ? <X size={16} /> : <ChevronDown size={16} />}
          </span>
        </Button>
        <Button
          variant="outline"
          type="button"
          size="icon"
          onClick={handleNextMonth}
          className="size-8"
          disabled={
            maxDate &&
            selectedDate.endOf('month').isSameOrAfter(maxDate, 'month')
          }
        >
          <ChevronRight size={16} className="text-muted-foreground" />
        </Button>
      </div>
      <div>
        {select === DAY && (
          <CalendarDaySelect
            date={selectedDate}
            minDate={minDateDayjs}
            maxDate={maxDateDayjs}
            locale={locale}
            onSelect={handleChange}
          />
        )}
        {select === MONTH && (
          <CalendarMonthSelect
            date={selectedDate}
            minDate={minDateDayjs}
            maxDate={maxDateDayjs}
            locale={locale}
            onSelect={handleChange}
          />
        )}
        {select === YEAR && (
          <CalendarYearSelect
            date={selectedDate}
            minDate={minDateDayjs}
            maxDate={maxDateDayjs}
            onSelect={handleChange}
          />
        )}
      </div>
    </div>
  )
}
