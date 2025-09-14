import type { getDevice } from '@/actions/dashboard/link/analytic'
import Image from 'next/image'
import { ChartTable, ChartTableError } from './chart-table'

export function DeviceTable({
  data
}: {
  data: Awaited<ReturnType<typeof getDevice>>
}) {
  if (!data.success) return <ChartTableError message={data.error} />

  return (
    <ChartTable
      labelKey="device"
      totalKey="total"
      data={data.data.data}
      title="Devices"
      renderKey={({ device }) => {
        const deviceName = String(device ?? 'unknown').replace(/\W/g, '-')

        return (
          <div className="flex gap-2 items-center">
            <Image
              title={deviceName}
              src={`/images/device/${deviceName}.png`}
              width={16}
              height={16}
              alt=""
            />
            <span>{deviceName}</span>
          </div>
        )
      }}
    />
  )
}
