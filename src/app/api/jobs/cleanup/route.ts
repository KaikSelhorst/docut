import { db } from 'server/db'
import { LinkRepository } from 'server/repository/link-repository'
import { ClearTrash } from 'server/services/private/trash/clear-trash'
import { routeAdapter } from '../../route-adapter'

const clearTrash = new ClearTrash(db, new LinkRepository())

export const GET = routeAdapter(clearTrash.execute.bind(clearTrash))
