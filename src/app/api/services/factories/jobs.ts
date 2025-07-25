import { db } from '@api/db'
import { Logger } from '@api/helpers'
import { LinkRepository } from '@api/repositories'
import { CleanupLinksService } from '../jobs/cleanup'

export function createCleanupLinksService() {
  const logger = new Logger('cleanup-links-service')
  const linkRepository = new LinkRepository()
  return new CleanupLinksService(logger, db, linkRepository)
}
