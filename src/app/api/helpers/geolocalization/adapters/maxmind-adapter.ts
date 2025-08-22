import path from 'node:path'
import maxmind from 'maxmind'
import { getIpAddress, isLocalhost } from '../helpers'
import type { Lookuper } from './protocols'

const MAXMIND_GLOBAL_KEY = 'maxmind'

export class MaxmindAdapter implements Lookuper {
  async lookup(h: Headers) {
    const rawIP = getIpAddress(h)
    const ip = isLocalhost(rawIP) ? '127.0.0.1' : rawIP
    const defaultLookup = { country: null, city: null, ip: ip }

    // Cloudflare headers
    if (h.get('cf-ipcountry')) {
      const country = h.get('cf-ipcountry')
      const city = h.get('cf-ipcity')
      return { country, city, ip }
    }

    // Vercel headers
    if (h.get('x-vercel-ip-country')) {
      const country = h.get('x-vercel-ip-country')
      const city = h.get('x-vercel-ip-city')

      return { country, city, ip }
    }

    if (!global[MAXMIND_GLOBAL_KEY]) {
      const dirFolder = path.join(process.cwd(), 'src/app/api/data')
      const dirFile = path.resolve(dirFolder, 'GeoLite2-City.mmdb')

      global[MAXMIND_GLOBAL_KEY] = await maxmind.open(dirFile)
    }

    const res = global[MAXMIND_GLOBAL_KEY].get(ip)

    if (res)
      return {
        country: res.country.iso_code as string,
        city: res.city?.names?.en || null,
        ip
      }

    return defaultLookup
  }
}
