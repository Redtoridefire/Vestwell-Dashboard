import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vestwell CPO Dashboard | Security & People Risk Analytics',
  description: 'Comprehensive dashboard showcasing the partnership between Information Security and People Operations at Vestwell. Monitor security culture, identity governance, insider risk, and regulatory compliance.',
  keywords: ['security', 'compliance', 'people operations', 'fintech', 'vestwell', 'CISO', 'CPO'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
