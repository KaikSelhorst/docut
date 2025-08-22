export interface Lookuper {
  lookup: (
    headers: Headers
  ) => Promise<{ country: string | null; city: string | null; ip: string }>
}
