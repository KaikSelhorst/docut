import { CreateLink } from '@/server/services/private/link/create-link'
import { routeAdapter } from '@/app/api/route-adapter'
import { LinkRepository } from '@/server/repository/link-repository'
import { ListLinks } from '@/server/services/private/link/list-links'

const createLink = new CreateLink(new LinkRepository())

export const POST = routeAdapter(createLink.execute.bind(createLink))

const listLinks = new ListLinks(new LinkRepository())

export const GET = routeAdapter(listLinks.execute.bind(listLinks))
