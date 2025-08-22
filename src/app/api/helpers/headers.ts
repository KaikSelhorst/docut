export function decodeHeader<T extends string | undefined | null>(
  headerValue: T
) {
  if (headerValue === undefined || headerValue === null) {
    return headerValue
  }

  return Buffer.from(headerValue, 'latin1').toString('utf-8')
}
