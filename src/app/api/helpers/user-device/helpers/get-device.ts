import { DESKTOP_OS, MOBILE_OS } from '@/common/constants'

function isDesktop(os: string | null): os is (typeof DESKTOP_OS)[number] {
  return DESKTOP_OS.includes(os as any)
}

function isMobile(os: string | null): os is (typeof MOBILE_OS)[number] {
  return MOBILE_OS.includes(os as any)
}

export function getDevice(os: string | null) {
  if (!os) return null

  if (isDesktop(os)) {
    if (os === 'Chrome OS') {
      return 'laptop'
    }
    return 'desktop'
  }

  if (isMobile(os)) {
    if (os === 'Amazon OS') return 'tablet'
    return 'mobile'
  }

  return null
}
