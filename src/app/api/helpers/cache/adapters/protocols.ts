export interface CacheProtocol {
  get(key: string): Promise<string | null>
  save(key: string, data: string, ttl?: number): Promise<boolean>
  delete(key: string): Promise<boolean>
}
