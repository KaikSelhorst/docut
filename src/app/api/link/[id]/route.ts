import { routeAdapter } from '@/app/api/route-adapter'
import { db } from 'server/db'
import { LinkRepository } from 'server/repository/link-repository'
import { GetLink } from 'server/services/public/link/get-link'

const getLink = new GetLink(db, new LinkRepository())

export const GET = routeAdapter(getLink.execute.bind(getLink))
