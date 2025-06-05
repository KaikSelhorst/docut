'use client'

import { useRouter } from 'next/navigation'

export function RedirectTo({ path }: { path: string }) {
  const router = useRouter()
  router.push(path)
  return null
}
