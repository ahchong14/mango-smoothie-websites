import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mangosmoothie.com'),
  title: 'Mango Smoothie | Fresh and Delicious Smoothies',
  description: 'Discover our delicious range of fresh smoothies and snacks. Order online for pickup or delivery.',
  openGraph: {
    title: 'Mango Smoothie | Fresh and Delicious Smoothies',
    description: 'Discover our delicious range of fresh smoothies and snacks. Order online for pickup or delivery.',
    url: 'https://www.mangosmoothie.com',
    siteName: 'Mango Smoothie',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with your verification code
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

