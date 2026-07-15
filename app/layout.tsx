import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import { CartProvider } from '@/lib/cart'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: 'BARKS Folierung | Digital Print · Beschriftung · Hamburg',
    template: '%s | BARKS Folierung',
  },
  description:
    'BARKS Folierung Hamburg – Ihr Spezialist für Fahrzeugfolierung, Beschriftung, Digitaldruck, Fensterfolie und Leuchtreklame. Professionell, kreativ, zuverlässig.',
  keywords: [
    'Fahrzeugfolierung Hamburg',
    'Beschriftung Hamburg',
    'Digitaldruck Hamburg',
    'Fensterfolie Hamburg',
    'Werbetechnik Hamburg',
    'Leuchtreklame Hamburg',
    'Neon Schrift Hamburg',
    'Folierung Hamburg',
    'BARKS Folierung',
  ],
  openGraph: {
    title: 'BARKS Folierung | Hamburg',
    description: 'Fahrzeugfolierung, Beschriftung, Digitaldruck & Leuchtreklame – Hamburg',
    locale: 'de_DE',
    type: 'website',
    siteName: 'BARKS Folierung',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={inter.variable}>
      <body className="font-sans bg-background text-white">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
        </CartProvider>
      </body>
    </html>
  )
}
