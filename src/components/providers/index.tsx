'use client'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { RootProvider } from 'fumadocs-ui/provider'
import { LinkModalRoot } from '@/components/link-modal'
import { ThemeProvider } from '@/components/theme/provider'
import { Toaster } from '@/components/ui/sonner'

export default function RootProviders({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <RootProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <SpeedInsights />
        <Toaster position="top-right" />
        <LinkModalRoot />
        {children}
      </ThemeProvider>
    </RootProvider>
  )
}
