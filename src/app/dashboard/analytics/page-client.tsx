'use client'
import type {
  getBrowsers,
  getCity,
  getCountry,
  getDevice,
  getOs,
  getVisitors
} from '@/actions/dashboard/link/analytic'
import { DEFAULT_LIST_DAYS } from '@/common/constants'
import { cn } from '@/lib/utils'
import { BrowsersTable } from './components/browsers-table'
import { CityTable } from './components/city-table'
import { CountryTable } from './components/country-table'
import { DeviceTable } from './components/device-table'
import { OSTable } from './components/os-table'
import { VisitorsChart } from './components/visitors-chart'

interface PageClientProps {
  countryData: Awaited<ReturnType<typeof getCountry>>
  browsersData: Awaited<ReturnType<typeof getBrowsers>>
  osData: Awaited<ReturnType<typeof getOs>>
  cityData: Awaited<ReturnType<typeof getCity>>
  deviceData: Awaited<ReturnType<typeof getDevice>>
  visitorsData: Awaited<ReturnType<typeof getVisitors>>
}

export function PageClient({
  countryData,
  browsersData,
  cityData,
  deviceData,
  osData,
  visitorsData
}: PageClientProps) {
  return (
    <main className="px-4 container mx-auto my-6">
      <header className="py-3 my-1 flex justify-between items-center">
        <div>
          <h1 className="font-medium text-2xl">Total Visitors & Views</h1>
          <p className="text-muted-foreground text-sm">
            Data from the last {DEFAULT_LIST_DAYS} days
          </p>
        </div>
        {/* <SelectDateRange /> */}
      </header>
      <VisitorsChart data={visitorsData} />
      <section
        className={cn(
          // to much complex
          'grid mt-12',
          '[&>*]:border-t',
          'md:[&>*]:border-l md:grid-cols-2 md:[&>*]:odd:border-l-0',
          'lg:grid-cols-3 lg:[&>*]:first:border-l-none lg:[&>*]:odd:border-l lg:[&>*]:nth-[3n+1]:border-l-0'
        )}
      >
        <BrowsersTable data={browsersData} />
        <OSTable data={osData} />
        <DeviceTable data={deviceData} />
      </section>
      <section className="grid md:grid-cols-2 border-t max-md:divide-y md:divide-x">
        <CountryTable data={countryData} />
        <CityTable data={cityData} />
      </section>
    </main>
  )
}
