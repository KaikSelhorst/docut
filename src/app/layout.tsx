import RootProviders from '@/components/providers'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import './globals.css'

interface Layout {
  children: React.ReactNode
}

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
