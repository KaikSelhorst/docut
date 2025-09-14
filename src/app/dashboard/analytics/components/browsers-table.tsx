import type { getBrowsers } from '@/actions/dashboard/link/analytic'
import { BROWSERS } from '@/common/constants'
import Image from 'next/image'
import { ChartTable, ChartTableError } from './chart-table'

export function BrowsersTable({
  data
}: {
  data: Awaited<ReturnType<typeof getBrowsers>>
}) {
  if (!data.success) return <ChartTableError message={data.error} />

  return (
    <ChartTable
      labelKey="browser"
      totalKey="total"
      data={data.data.data}
      title="Browsers"
      renderKey={({ browser }) => {
        const browserName = String(browser ?? 'unknown').replace(/\s/g, '-')

        return (
          <div className="flex gap-2 items-center">
            <Image
              src={`/images/browser/${browserName}.png`}
              width={16}
              height={16}
              alt=""
            />
            <span>{BROWSERS[browserName as keyof typeof BROWSERS]}</span>
          </div>
        )
      }}
    />
  )
}
