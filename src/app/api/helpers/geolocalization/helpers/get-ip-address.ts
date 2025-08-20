import { IP_ADDRESS_HEADERS } from '@/common/constants'

export function getIpAddress(headers: Headers) {
  const header = IP_ADDRESS_HEADERS.find((name) => {
    return headers.get(name)
  })

  if (!header) return ''

  const ip = headers.get(header)

  if (!ip) return ''

  if (header === 'x-forwarded-for') {
    return ip?.split(',')?.[0]?.trim()
  }

  if (header === 'forwarded') {
    const match = ip.match(/for=(\[?[0-9a-fA-F:.]+\]?)/)

    if (match) {
      return match[1]
    }
  }

  return ip
}
