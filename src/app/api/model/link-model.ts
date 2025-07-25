import type { Link, Seo } from '@api/db/schemas'

export interface LinkModel extends Link {
  seo: Seo
}
