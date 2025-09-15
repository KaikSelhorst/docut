import { faker } from '@faker-js/faker'

export const SMTP_DEFAULT_CONFIG = {
  HOST: 'non-host',
  PORT: 0,
  SECURE: false,
  USER: 'non-user',
  PASSWORD: btoa(faker.finance.ethereumAddress())
}

export const APP_USER = {
  EMAIL: 'init-application@init.init',
  PASSWORD: btoa(faker.finance.ethereumAddress()),
  NAME: 'init-application'
}

export const DEFAULT_LIST_DAYS = 60

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
  'city',
  'visitors'
] as const

export const BROWSERS = {
  android: 'Android',
  aol: 'AOL',
  bb10: 'BlackBerry 10',
  beaker: 'Beaker',
  chrome: 'Chrome',
  'mobile-chrome': 'Chrome(mobile)',
  'chromium-webview': 'Chrome (webview)',
  crios: 'Chrome (iOS)',
  curl: 'Curl',
  edge: 'Edge',
  'edge-chromium': 'Edge (Chromium)',
  'edge-ios': 'Edge (iOS)',
  facebook: 'Facebook',
  firefox: 'Firefox',
  fxios: 'Firefox (iOS)',
  ie: 'IE',
  instagram: 'Instagram',
  ios: 'iOS',
  'ios-webview': 'iOS (webview)',
  kakaotalk: 'KakaoTalk',
  miui: 'MIUI',
  opera: 'Opera',
  'opera-mini': 'Opera Mini',
  phantomjs: 'PhantomJS',
  safari: 'Safari',
  'mobile-safari': 'Safari(mobile)',
  samsung: 'Samsung',
  searchbot: 'Searchbot',
  silk: 'Silk',
  yandexbrowser: 'Yandex',
  unknown: 'Unknown'
}
