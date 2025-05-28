import { routeAdapter } from '@/app/api/route-adapter'
import { db } from 'server/db'
import { LinkRepository } from 'server/repository/link-repository'
import { GetLinkSeo } from 'server/services/public/link/get-link-seo'

const getLink = new GetLinkSeo(db, new LinkRepository())

export const GET = routeAdapter(getLink.execute.bind(getLink))
