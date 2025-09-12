import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import dayjs, { type Dayjs } from 'dayjs'

const dataRange = [
  [
    { date: dayjs(), label: 'Today' },
    { date: dayjs().add(1, 'day'), label: 'Last 24 hours' }
  ],
  [
    { date: dayjs().add(2, 'day'), label: 'Last week' },
    { date: dayjs().add(3, 'day'), label: 'Last  7 days' }
  ],
  [
    { date: dayjs().add(4, 'day'), label: 'This month' },
    { date: dayjs().add(5, 'day'), label: 'Last 30 days' },
    { date: dayjs().add(6, 'day'), label: 'Last  90 days' }
  ]
]

export function SelectDateRange() {
  return (
    <Select defaultValue={dataRange[0][1].date.toISOString()}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {renderDataGroup(dataRange[0])}
        <SelectSeparator />
        {renderDataGroup(dataRange[1])}
        <SelectSeparator />
        {renderDataGroup(dataRange[2])}
      </SelectContent>
    </Select>
  )
}

function renderDataGroup(group: { date: Dayjs; label: string }[]) {
  return group.map(({ date, label }) => (
    <SelectItem key={label.toLowerCase()} value={date.toISOString()}>
      {label}
    </SelectItem>
  ))
}
