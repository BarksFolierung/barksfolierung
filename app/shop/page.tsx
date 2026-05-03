import type { Metadata } from 'next'
import Link from 'next/link'
import { ShoppingBag, Tag, Printer, Car, PenTool, Layers } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'BARKS Folierung Online-Shop – Standardprodukte, Folien und Druckerzeugnisse direkt bestellen.',
}

const categories = [
  {
    icon: Car,
    title: 'Fahrzeugfolierung',
    description: 'Standardfolierungen für PKW, Transporter & Flotten – Auswahl nach Fahrzeugtyp.',
  },
  {
    icon: PenTool,
    title: 'Schilder & Beschriftung',
    description: 'Standardschilder, Aufkleber und Beschriftungssets für Unternehmen und Privatpersonen.',
  },
  {
    icon: Layers,
    title: 'Fenster- & Glasfolien',
    description: 'Milchglas-, Sichtschutz- und Dekorfolien in Standardgrößen.',
  },
  {
    icon: Printer,
    title: 'Druckprodukte',
    description: 'Banner, Poster, Flyer und Großformatdrucke in gängigen Standardformaten.',
  },
  {
    icon: Tag,
    title: 'Werbemittel',
    description: 'Aufkleber, Magnetschilder und kleine Werbemittel für Events und Messen.',
  },
  {
    icon: ShoppingBag,
    title: 'Pakete & Bundles',
    description: 'Komplettpakete für Gründer, Startups und kleine Unternehmen.',
  },
]

export default function ShopPage() {
  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-16">
        <p className="text-xs font-bold uppercase tracking-widest text-accent mb-4">Shop</p>
        <h1 className="text-5xl sm:text-6xl font-black tracking-tight">Produkte & Leistungen</h1>
        <p className="text-muted mt-4 max-w-2xl text-lg leading-relaxed">
          Standardprodukte direkt anfragen oder konfigurieren. Für individuelle Projekte erstellen
          wir Ihnen gerne ein persönliches Angebot.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <div
              key={cat.title}
              className="p-8 bg-surface border border-border rounded-sm hover:border-accent/40 transition-all duration-300 group"
            >
              <div className="mb-4 w-10 h-10 flex items-center justify-center text-accent">
                <Icon size={26} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors">
                {cat.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{cat.description}</p>
            </div>
          )
        })}
      </div>

      <div className="p-10 bg-accent/5 border border-accent/20 rounded-sm text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">Individuell</p>
        <h2 className="text-3xl font-black mb-4">Kein passendes Produkt dabei?</h2>
        <p className="text-muted mb-8 max-w-xl mx-auto">
          Jedes Projekt ist einzigartig. Kontaktieren Sie uns für ein individuelles Angebot –
          kostenlos und unverbindlich.
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
