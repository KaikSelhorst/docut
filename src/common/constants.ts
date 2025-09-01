export const IP_ADDRESS_HEADERS = [
  'x-forwarded-for',
  'cf-connecting-ip',
  'x-client-ip',
  'do-connecting-ip',
  'fastly-client-ip',
  'true-client-ip',
  'x-real-ip',
  'x-cluster-client-ip',
  'x-forwarded',
  'forwarded',
  'x-appengine-user-ip'
]

export const DESKTOP_OS = [
  'BeOS',
  'Chrome OS',
  'Linux',
  'Mac OS',
  'Open BSD',
  'OS/2',
  'QNX',
  'Sun OS',
  'Windows',
  'Windows 10',
  'Windows 2000',
  'Windows 3.11',
  'Windows 7',
  'Windows 8',
  'Windows 8.1',
  'Windows 95',
  'Windows 98',
  'Windows ME',
  'Windows Server 2003',
  'Windows Vista',
  'Windows XP'
] as const

export const MOBILE_OS = [
  'Amazon OS',
  'Android OS',
  'BlackBerry OS',
  'iOS',
  'Windows Mobile'
] as const

export const METRIC_TYPES = [
  'country',
  'os',
  'device',
  'browser',
  'city'
] as const
