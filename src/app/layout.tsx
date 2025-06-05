import RootProviders from '@/components/providers'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'doshort',
  description: 'doshort app'
}

interface Layout {
  children: React.ReactNode
}

export default function RootLayout({ children }: Layout) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-mono antialiased',
          fontSans.variable,
          fontMono.variable
        )}
      >
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  )
}
