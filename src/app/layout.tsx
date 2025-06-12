import RootProviders from '@/components/providers'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import './globals.css'
import { generateMetadata } from '@/helpers/generate-metadata'

export const metadata = generateMetadata()

interface Layout {
  children: React.ReactNode
}

export default function RootLayout({ children }: Layout) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          fontMono.variable
        )}
      >
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  )
}
