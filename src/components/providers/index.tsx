import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from '@/components/theme/provider'
import { Toaster } from '@/components/ui/sonner'

export default function RootProviders({
  children
}: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <SpeedInsights />
      <Toaster position="top-right" />
      {children}
    </ThemeProvider>
  )
}
