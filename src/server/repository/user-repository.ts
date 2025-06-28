import { eq } from 'drizzle-orm'
import type { DBInstance } from 'server/db'
import { user } from 'server/db/schemas'
import type { UserRepositoryInterface } from './interfaces/user-repository'

export class UserRepository implements UserRepositoryInterface {
  async findByEmail(tx: DBInstance, email: string) {
    try {
      const query = await tx.select().from(user).where(eq(user.email, email))
      return query.length ? query[0] : null
    } catch {
      return null
    }
  }
}
