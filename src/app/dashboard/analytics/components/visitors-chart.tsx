import type { getVisitors } from '@/actions/dashboard/link/analytic'
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import dayjs from 'dayjs'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { ChartTableError } from './chart-table'

const chartConfig = {
  visitors: {
    label: 'Visitors',
    color: 'var(--chart-1)'
  },
  views: {
    label: 'Views',
    color: 'var(--chart-3)'
  }
} satisfies ChartConfig

export function VisitorsChart({
  data
}: {
  data: Awaited<ReturnType<typeof getVisitors>>
}) {
  if (!data.success)
    return (
      <ChartTableError
        message={data.error}
        className="flex justify-center items-center"
      />
    )

  return (
    <ChartContainer config={chartConfig} className="h-[320px] w-full">
      <BarChart accessibilityLayer data={data.data.data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => {
            const date = dayjs(value)
            return date.format('MMM D')
          }}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(value) => {
                const date = dayjs(value)
                return date.format('LL')
              }}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          stackId="a"
          dataKey="visitors"
          fill="var(--color-visitors)"
          radius={1}
          width={24}
        />
        <Bar
          dataKey="views"
          stackId="a"
          fill="var(--color-views)"
          radius={1}
          width={24}
        />
      </BarChart>
    </ChartContainer>
  )
}

function generateStackedData(days: number) {
  return new Array(days).fill(null).map((_, i) => {
    return {
      date: dayjs()
        .add(i + 1, 'day')
        .toISOString()
        .split('T')[0],
      views: Math.ceil(Math.random() * i + 4),
      visitors: Math.ceil(Math.random() * i + 2)
    }
  })
}

const stackedData = generateStackedData(60)
