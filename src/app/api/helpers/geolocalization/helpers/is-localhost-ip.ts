export function isLocalhost(ip: string) {
  return ip.includes('127.0.0.1') || ip === '::1' || /^127\./.test(ip)
}
