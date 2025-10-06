import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

export const dateUtils = {
  format: (date: string | Date, format = 'DD/MM/YYYY') => {
    return dayjs(date).format(format)
  },
  fromNow: (date: string | Date) => {
    return dayjs(date).fromNow()
  },
  addDays: (date: string | Date, days: number) => {
    return dayjs(date).add(days, 'day')
  }
}
