import Image from 'next/image'
import type { getCountry } from '@/actions/dashboard/link/analytic'
import enUS from '../../../../../public/intl/country/en-US.json'
import { ChartTable, ChartTableError } from './chart-table'

export function CountryTable({
  data
}: {
  data: Awaited<ReturnType<typeof getCountry>>
}) {
  if (!data.success) return <ChartTableError message={data.error} />

  return (
    <ChartTable
      labelKey="country"
      totalKey="total"
      data={data.data.data}
      title="Countries"
      renderKey={({ country }) => (
        <div className="flex gap-2 items-center">
          <Image
            src={`/images/country/${country ? String(country).toLowerCase() : 'unknown'}.png`}
            width={16}
            height={16}
            alt=""
          />
          <span>{enUS[country as keyof typeof enUS] ?? 'Unknown'}</span>
        </div>
      )}
    />
  )
}
