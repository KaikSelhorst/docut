import Image from 'next/image'
import type { getOs } from '@/actions/dashboard/link/analytic'
import { ChartTable, ChartTableError } from './chart-table'

export function OSTable({ data }: { data: Awaited<ReturnType<typeof getOs>> }) {
  if (!data.success) return <ChartTableError message={data.error} />

  return (
    <ChartTable
      labelKey="os"
      totalKey="total"
      data={data.data.data}
      title="OS"
      renderKey={({ os }) => {
        const deviceName = String(os ?? 'unknown').replace(/\W/g, '-')

        return (
          <div className="flex gap-2 items-center">
            <Image
              src={`/images/os/${deviceName.toLowerCase()}.png`}
              width={16}
              height={16}
              alt=""
            />
            <span>{os ?? 'Unknown'}</span>
          </div>
        )
      }}
    />
  )
}
