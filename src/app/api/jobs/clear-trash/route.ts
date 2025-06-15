import { ClearTrash } from 'server/services/private/trash/clear-trash'
import { routeAdapter } from '../../route-adapter'
import { db } from 'server/db'
import { LinkRepository } from 'server/repository/link-repository'

const clearTrash = new ClearTrash(db, new LinkRepository())

export const GET = routeAdapter(clearTrash.execute.bind(clearTrash))
