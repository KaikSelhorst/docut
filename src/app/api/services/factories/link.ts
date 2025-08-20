import { db } from '@api/db'
import { Logger, Session } from '@api/helpers'
import {
  ClickRepository,
  LinkRepository,
  SeoRepository,
  UserRepository
} from '@api/repositories'
import {
  CreateLinkPublicService,
  CreateLinkService,
  DeleteLinkService,
  GetLinkService,
  GetPublicLinkService,
  ListLinksService,
  UpdateLinkService
} from '../link'

export function createGetLinkService() {
  const logger = new Logger('get-link-service')
  const session = new Session(new Logger('Session'))
  const linkRepository = new LinkRepository()
  return new GetLinkService(logger, session, db, linkRepository)
}

export function createCreateLinkService() {
  const logger = new Logger('create-link-service')
  const session = new Session(new Logger('Session'))
  const linkRepository = new LinkRepository()
  const seoRepository = new SeoRepository()
  return new CreateLinkService(
    logger,
    session,
    db,
    linkRepository,
    seoRepository
  )
}

export function createListLinksService() {
  const logger = new Logger('list-link-service')
  const session = new Session(new Logger('Session'))
  const linkRepository = new LinkRepository()
  return new ListLinksService(logger, session, db, linkRepository)
}

export function createDeleteLinkService() {
  const logger = new Logger('delete-link-service')
  const session = new Session(new Logger('Session'))
  const linkRepository = new LinkRepository()
  return new DeleteLinkService(logger, session, db, linkRepository)
}

export function createUpdateLinkService() {
  const logger = new Logger('update-link-service')
  const session = new Session(new Logger('Session'))
  const linkRepository = new LinkRepository()
  const seoRepository = new SeoRepository()
  return new UpdateLinkService(
    logger,
    session,
    db,
    linkRepository,
    seoRepository
  )
}

export function createCreatePublicLinkService() {
  const logger = new Logger('create-public-link-service')
  const session = new Session(new Logger('Session'))
  const linkRepository = new LinkRepository()
  const seoRepository = new SeoRepository()
  const userRepository = new UserRepository()
  return new CreateLinkPublicService(
    logger,
    session,
    db,
    linkRepository,
    seoRepository,
    userRepository
  )
}

export function createGetPublicLinkService() {
  const logger = new Logger('get-public-link-service')
  const linkRepository = new LinkRepository()
  const clickRepository = new ClickRepository(new Logger('click-repository'))

  return new GetPublicLinkService(logger, db, linkRepository, clickRepository)
}
