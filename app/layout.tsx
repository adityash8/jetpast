import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JetPast - FastTrack VIP Services',
  description: 'Get VIP Fast Track access at 500+ airports. Book in 3 taps. Skip the queues and save time with our premium airport services.',
  keywords: 'airport fast track, VIP services, meet and greet, airport assistance, fast track security, airport lounge',
  authors: [{ name: 'JetPast Team' }],
  creator: 'JetPast',
  publisher: 'JetPast',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://jetpast.com'),
  openGraph: {
    title: 'JetPast - FastTrack VIP Services',
    description: 'Get VIP Fast Track access at 500+ airports. Book in 3 taps.',
    url: 'https://jetpast.com',
    siteName: 'JetPast',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'JetPast - FastTrack VIP Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JetPast - FastTrack VIP Services',
    description: 'Get VIP Fast Track access at 500+ airports. Book in 3 taps.',
    images: ['/og-image.jpg'],
    creator: '@jetpast',
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
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
