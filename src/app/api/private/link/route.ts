import { CreateLink } from 'server/services/private/link/create-link'
import { SeoRepository } from 'server/repository/seo-repository'
import { routeAdapter } from '@/app/api/route-adapter'
import { LinkRepository } from 'server/repository/link-repository'
import { ListLinks } from 'server/services/private/link/list-links'
import { db } from 'server/db'

const createLink = new CreateLink(db, new LinkRepository(), new SeoRepository())

export const POST = routeAdapter(createLink.execute.bind(createLink))

const listLinks = new ListLinks(db, new LinkRepository())

export const GET = routeAdapter(listLinks.execute.bind(listLinks))
