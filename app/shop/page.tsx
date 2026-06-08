import type { Metadata } from 'next'
import Link from 'next/link'
import ShopClient from '@/components/ShopClient'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'BARKS Folierung Online-Shop – Flyer, Banner, T-Shirts, Aufkleber & mehr direkt konfigurieren und anfragen.',
}

export default function ShopPage() {
  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Page header */}
      <div className="mb-12">
        <p className="text-xs font-bold uppercase tracking-widest text-accent mb-4">Shop</p>
        <h1 className="text-5xl sm:text-6xl font-black tracking-tight">Produkte bestellen</h1>
        <p className="text-muted mt-4 max-w-2xl text-lg leading-relaxed">
          Produkt wählen, Format und Menge konfigurieren, Angebot anfragen –
          wir melden uns innerhalb von 24 Stunden.
        </p>
      </div>

      {/* Interactive product grid + configurator */}
      <ShopClient />

      {/* CTA banner */}
      <div className="p-10 bg-accent/5 border border-accent/20 rounded-sm text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">Individuell</p>
        <h2 className="text-3xl font-black mb-4">Kein passendes Produkt dabei?</h2>
        <p className="text-muted mb-8 max-w-xl mx-auto">
          Jedes Projekt ist einzigartig. Kontaktieren Sie uns für ein individuelles
          Angebot – kostenlos und unverbindlich.
        </p>
        <Link
          href="/kontakt"
          className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-bold text-sm uppercase tracking-widest rounded-sm transition-colors"
        >
          Angebot anfragen
        </Link>
      </div>

    </div>
  )
}
