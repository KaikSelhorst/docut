import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

export const dateUtils = {
  format: (date: string | Date, format = 'DD/MM/YYYY') => {
    return dayjs(date).format(format)
  },
  fromNow: (date: string | Date) => {
    return dayjs(date).fromNow()
  }
}
