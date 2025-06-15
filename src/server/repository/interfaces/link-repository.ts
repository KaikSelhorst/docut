import type { DBInstance } from '@/server/db'
import type { Link } from '@/server/db/schemas'

export interface LinkRepositoryInterface {
  create: (tx: DBInstance, lk: Link) => Promise<Link | null>
  deleteById: (tx: DBInstance, id: string) => Promise<Link | null>
  update: (tx: DBInstance, lk: Link) => Promise<Link | null>
  findById: (tx: DBInstance, id: string) => Promise<Link | null>
  findManyByUserId: (
    tx: DBInstance,
    id: string,
    filters: { page: number; url: string; per_page: number }
  ) => Promise<{
    links: Link[]
    total: number
    per_page: number
    total_pages: number
  } | null>
  deleteAllExpiredLinks: (tx: DBInstance) => Promise<boolean>
}
