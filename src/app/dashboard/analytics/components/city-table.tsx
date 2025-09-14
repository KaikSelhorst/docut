import type { getCity } from '@/actions/dashboard/link/analytic'
import Image from 'next/image'
import enUS from '../../../../../public/intl/country/en-US.json'
import { ChartTable, ChartTableError } from './chart-table'

export function CityTable({
  data
}: {
  data: Awaited<ReturnType<typeof getCity>>
}) {
  if (!data.success) return <ChartTableError message={data.error} />

  return (
    <ChartTable
      labelKey="city"
      totalKey="total"
      data={data.data.data}
      title="Cities"
      renderKey={({ country, city }) => {
        const countryName = String(country ?? 'unknown').replace(/\W/g, '-')

        return (
          <div className="flex gap-2 items-center">
            <Image
              src={`/images/country/${countryName.toLowerCase()}.png`}
              width={16}
              height={16}
              alt=""
            />
            <span>
              {city ? city : 'Unknown'},{' '}
              {country ? enUS[country as keyof typeof enUS] : 'Unknown'}
            </span>
          </div>
        )
      }}
    />
  )
}
