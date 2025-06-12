import { env } from 'shared/env'

export async function makeEmail() {
  switch (env.MAIL_ADAPTER) {
    case 'RESEND': {
      const { ResendAdapter } = await import('./adapters/resend-adapter')
      return new ResendAdapter()
    }
    default: {
      const { MockAdapter } = await import('./adapters/mock-adapter')
      return new MockAdapter()
    }
  }
}
