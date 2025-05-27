import type { Metadata } from 'next'
import type React from 'react'
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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
