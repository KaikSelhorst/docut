export function safeDecodeURIComponent<T extends string | undefined | null>(
  uri: T
) {
  if (uri === undefined || uri === null) {
    return uri
  }

  try {
    return decodeURIComponent(uri)
  } catch {
    return uri
  }
}
