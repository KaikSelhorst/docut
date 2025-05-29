import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const dateUtils = {
  format: (date: string | Date, format = 'DD/MM/YYYY') => {
    return dayjs(date).format(format)
  },
  fromNow: (date: string | Date) => {
    return dayjs(date).fromNow()
  }
}
