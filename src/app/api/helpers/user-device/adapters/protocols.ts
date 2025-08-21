export interface Detecter {
  detect: (userAgent: string) => Promise<{
    browser: { name: string | null }
    os: { name: string | null }
  }>
}
