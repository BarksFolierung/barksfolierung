import type { Metadata } from 'next'
import CartClient from '@/components/CartClient'

export const metadata: Metadata = {
  title: 'Warenkorb',
  description: 'Ihr Warenkorb bei BARKS Folierung – Produkte prüfen und sicher bestellen.',
  robots: { index: false },
}

export default function WarenkorbPage() {
  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12">
        <p className="text-xs font-bold uppercase tracking-widest text-accent mb-4">Kasse</p>
        <h1 className="text-5xl sm:text-6xl font-black tracking-tight">Warenkorb</h1>
      </div>
      <CartClient />
    </div>
  )
}
