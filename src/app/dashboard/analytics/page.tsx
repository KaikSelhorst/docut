import {
  getBrowsers,
  getCity,
  getCountry,
  getDevice,
  getOs,
  getVisitors
} from '@/actions/dashboard/link/analytic'
import { PageClient } from './page-client'

export default async function Page() {
  const [
    countryData,
    browsersData,
    cityData,
    osData,
    deviceData,
    visitorsData
  ] = await Promise.all([
    getCountry(),
    getBrowsers(),
    getCity(),
    getOs(),
    getDevice(),
    getVisitors()
  ])

  return (
    <>
      <PageClient
        visitorsData={visitorsData}
        countryData={countryData}
        browsersData={browsersData}
        cityData={cityData}
        deviceData={deviceData}
        osData={osData}
      />
    </>
  )
}
