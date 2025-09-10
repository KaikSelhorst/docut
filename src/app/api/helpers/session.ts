import { unauthorized } from '@api/helpers/response'
import { APIError } from 'better-auth/api'
import { getSession } from 'shared/lib/auth/utils'
import type { Logger } from './logger'

class Session {
  constructor(private readonly logger: Logger) {}
  async validate() {
    try {
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
      console.log(session)
      return { session, error: unauthorized }
    } catch (error) {
      console.log(error)
      if (error instanceof APIError) {
        const message = error.body?.message
        console.log(error.body)
        if (message) this.logger.error(message)

        return { session: null, error: () => unauthorized(message) }
      }

      this.logger.error('Session not found!')

      return {
        session: null,
        error: () => unauthorized('internal validation session error')
      }
    }
  }
}

export { Session }
