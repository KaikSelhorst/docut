import { db } from 'server/db'
import { LinkRepository } from 'server/repository/link-repository'
import { SeoRepository } from 'server/repository/seo-repository'
import { UserRepository } from 'server/repository/user-repository'
import { CreateLink } from 'server/services/public/link/create-link'
import { routeAdapter } from '../route-adapter'

const createLink = new CreateLink(
  db,
  new UserRepository(),
  new LinkRepository(),
  new SeoRepository()
)

export const POST = routeAdapter(createLink.execute.bind(createLink))
