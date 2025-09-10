import { RouteBuilder } from '@kaikselhorst/route-builder'
import { env } from 'shared/env'

const link = {
  post: new RouteBuilder(`${env.BETTER_AUTH_URL}/api/dashboard/link`),
  delete: new RouteBuilder(`${env.BETTER_AUTH_URL}/api/dashboard/link/:id`),
  get: new RouteBuilder(`${env.BETTER_AUTH_URL}/api/dashboard/link/:id`),
  list: new RouteBuilder(`${env.BETTER_AUTH_URL}/api/dashboard/link`),
  put: new RouteBuilder(`${env.BETTER_AUTH_URL}/api/dashboard/link/:id`),
  postPublic: new RouteBuilder(`${env.BETTER_AUTH_URL}/api/link`),
  getPublic: new RouteBuilder(`${env.BETTER_AUTH_URL}/api/link/:id`)
}

export const routes = {
  link
}
