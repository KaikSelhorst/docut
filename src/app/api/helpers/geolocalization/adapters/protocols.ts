export interface Lookuper {
  lookup: (headers: Headers) => Promise<{ country: string | null; ip: string }>
}
