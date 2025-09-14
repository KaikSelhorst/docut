import { cn } from '@/lib/utils'
import type { JSX } from 'react'

interface ChartTable {
  title: string
  totalKey: string
  labelKey: string
  data: Record<string, string | number | null>[]
  renderKey?: (data: Record<string, string | number | null>) => JSX.Element
}

function getPercentage(total: number, itemTotal: number) {
  return (itemTotal / total) * 100
}

export function ChartTable({
  data,
  title = '',
  renderKey,
  totalKey,
  labelKey
}: ChartTable) {
  const total = data.reduce((acc, curr) => acc + Number(curr[totalKey]), 0)

  return (
    <div className="p-4 max-h-[400px] overflow-y-auto">
      <table className="table-fixed w-full">
        <thead>
          <tr className="leading-10 [&_th]:px-1">
            <th className="font-semibold text-left ">{title}</th>
            <th className="w-36 font-semibold">Visitors</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const percent = getPercentage(total, Number(item.total))

            return (
              <tr
                key={String(index)}
                className="text-sm [&_td]:px-1 [&_td]:pb-1 rounded-md leading-7 hover:bg-secondary/40"
              >
                <td className="text-ellipsis overflow-hidden text-nowrap">
                  {renderKey ? renderKey(item) : item[labelKey]}
                </td>
                <td className="text-right">
                  <div className="font-semibold text-right pr-2 inline-block mr-1 border-r">
                    {item[totalKey]}
                  </div>
                  <div className="relative w-14 inline-block text-muted-foreground">
                    <span className="p-1 relative z-10">
                      {percent.toFixed(2)}%
                    </span>
                    <span
                      className="absolute bg-muted h-full left-[2px]"
                      style={{ width: 56 * (percent / 100) }}
                    />
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export function ChartTableError({
  message = 'Error',
  className
}: { message?: string; className?: string }) {
  return (
    <div
      className={cn(
        'p-4 max-h-[400px] overflow-y-auto bg-destructive/2 min-h-[330px]',
        className
      )}
    >
      <div className="flex justify-center items-center h-full">
        <p className="text-destructive">{message}</p>
      </div>
    </div>
  )
}
