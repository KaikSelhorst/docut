import { unauthorized } from '@api/helpers/response'
import { getSession } from 'shared/lib/auth/utils'
import type { Logger } from './logger'

class Session {
  constructor(private readonly logger: Logger) {}
  async validate() {
    const session = await getSession()
    if (session)
      return {
        session: {
          ...session.session,
          user: session.user
        },
        error: null
      }
    this.logger.error('Session not found!')
    return { session, error: unauthorized }
  }
}

export { Session }
