import type { DBInstance } from 'server/db'
import type { User } from 'server/db/schemas'

export interface UserRepositoryInterface {
  findByEmail: (tx: DBInstance, email: string) => Promise<User | null>
}
