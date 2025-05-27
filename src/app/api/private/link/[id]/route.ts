import { routeAdapter } from '@/app/api/route-adapter'
import { LinkRepository } from '@/server/repository/link-repository'
import { DeleteLink } from '@/server/services/private/link/delete-link'
import { GetLink } from '@/server/services/private/link/get-link'
import { UpdateLink } from '@/server/services/private/link/update-link'

const getLink = new GetLink(new LinkRepository())

export const GET = routeAdapter(getLink.execute.bind(getLink))

const deleteLink = new DeleteLink(new LinkRepository())

export const DELETE = routeAdapter(deleteLink.execute.bind(deleteLink))

const updateLink = new UpdateLink(new LinkRepository())

export const PATCH = routeAdapter(updateLink.execute.bind(updateLink))
