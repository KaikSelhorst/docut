import { env } from '@/shared/env'
import type { Metadata } from 'next'
// import { redirect } from 'next/navigation'

interface PageProps {
  params: Promise<{ hash: string }>
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { hash } = await params

  const seo = await fetch(`${env.BETTER_AUTH_URL}/api/link/${hash}/seo`)

  if (seo.status !== 200) return {}
  const json = await seo.json()
  return { title: json.title, description: json.description }
}

export default async function Page({ params }: PageProps) {
  const { hash } = await params

  const link = await fetch(`${env.BETTER_AUTH_URL}/api/link/${hash}`)

  if (link.status !== 200) return <div>Not found!</div>

  const res = await link.json()
  console.log(res)
  // redirect(res.url)
  return null
}
