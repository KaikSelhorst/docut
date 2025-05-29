import { Inter, JetBrains_Mono } from 'next/font/google'

const fontSans = Inter({
  variable: '--font-sans',
  subsets: ['latin']
})

const fontMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin']
})

export { fontMono, fontSans }
