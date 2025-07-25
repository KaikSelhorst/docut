import type { SeoModel } from '@api/model'

export function publicSeoToResponse(
  seo: SeoModel
): Omit<SeoModel, 'createdAt' | 'id' | 'linkId' | 'updatedAt'> {
  return {
    description: seo.description,
    title: seo.title
  }
}
