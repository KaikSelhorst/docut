export function makeRequestQuery(
  value: Record<string, string | undefined> | string
) {
  if (typeof value === 'string') {
    const searchParams = new URLSearchParams(value)
    return `?${searchParams.toString()}`
  }

  const searchParams = new URLSearchParams()

  for (const [k, v] of Object.entries(value)) {
    if (!v) return
    searchParams.set(k, v)
  }

  return `?${searchParams.toString()}`
}
