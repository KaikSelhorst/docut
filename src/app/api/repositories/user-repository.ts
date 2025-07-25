import type { DBInstance } from '@api/db'
import { user } from '@api/db/schemas'
import { eq } from 'drizzle-orm'

export class UserRepository {
  async findByEmail(tx: DBInstance, email: string) {
    try {
      const [query] = await tx.select().from(user).where(eq(user.email, email))
      return query
    } catch {
      return null
    }
  }
}
