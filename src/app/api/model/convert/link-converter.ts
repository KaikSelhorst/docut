import type { LinkModel } from '@api/model'
import { publicSeoToResponse } from '@api/model/convert'

export function publicLinkToResponse(link: LinkModel) {
  return {
    id: link.id,
    url: link.url,
    seo: publicSeoToResponse(link.seo)
  }
}

export function linkToResponse(link: LinkModel) {
  return {
    url: link.url,
    id: link.id,
    clicks: link.clicks,
    createdAt: link.createdAt,
    expiration: link.expiration,
    seo: link.seo,
    updatedAt: link.updatedAt
  }
}
