import RootProviders from '@/components/providers'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import './globals.css'
import type { Metadata } from 'next'
import { generateMetadata } from '@/helpers/generate-metadata'

interface Layout {
  children: React.ReactNode
}

export const metadata: Metadata = generateMetadata()

export default function RootLayout({ children }: Layout) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-svh bg-background font-sans antialiased',
          fontSans.variable,
          fontMono.variable
        )}
      >
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  )
}
