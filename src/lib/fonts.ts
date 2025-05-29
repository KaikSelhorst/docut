import { Inter, Geist_Mono } from 'next/font/google'

const fontSans = Inter({
  variable: '--font-sans',
  subsets: ['latin']
})

const fontMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin']
})

export { fontMono, fontSans }
