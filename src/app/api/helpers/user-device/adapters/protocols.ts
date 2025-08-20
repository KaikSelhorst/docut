export interface Detecter {
  detect: (
    userAgent: string
  ) => Promise<{ browser: { name: string }; os: { name: string } }>
}
