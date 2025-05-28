import { routeAdapter } from '@/app/api/route-adapter'
import { SeoRepository } from '@/server/repository/seo-repository'
import { db } from 'server/db'
import { LinkRepository } from 'server/repository/link-repository'
import { DeleteLink } from 'server/services/private/link/delete-link'
import { GetLink } from 'server/services/private/link/get-link'
import { UpdateLink } from 'server/services/private/link/update-link'

const getLink = new GetLink(db, new LinkRepository())

export const GET = routeAdapter(getLink.execute.bind(getLink))

const deleteLink = new DeleteLink(db, new LinkRepository(), new SeoRepository())

export const DELETE = routeAdapter(deleteLink.execute.bind(deleteLink))

const updateLink = new UpdateLink(db, new LinkRepository(), new SeoRepository())

export const PATCH = routeAdapter(updateLink.execute.bind(updateLink))
