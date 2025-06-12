import { generateMetadata } from '@/helpers/generate-metadata'

export const metadata = generateMetadata()

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
