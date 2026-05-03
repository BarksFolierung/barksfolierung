import type { Metadata } from 'next'
import PortfolioGrid from '@/components/PortfolioGrid'

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Unsere Projekte: Fahrzeugfolierungen, Beschriftungen, Digitaldruck, Leuchtreklame und Fensterfolierungen in Hamburg und Umgebung.',
}

export default function PortfolioPage() {
  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-16">
        <p className="text-xs font-bold uppercase tracking-widest text-accent mb-4">Portfolio</p>
        <h1 className="text-5xl sm:text-6xl font-black tracking-tight">Unsere Arbeiten</h1>
        <p className="text-muted mt-4 max-w-2xl text-lg leading-relaxed">
          Von der Fahrzeugfolierung bis zur Leuchtreklame – hier sehen Sie eine Auswahl unserer
          abgeschlossenen Projekte in Hamburg und der Region.
        </p>
      </div>

      <PortfolioGrid />

      <div className="mt-20 p-8 bg-surface border border-border rounded-sm text-center">
        <p className="text-muted mb-2">Ihr Projekt fehlt hier?</p>
        <h3 className="text-2xl font-bold mb-4">Wir realisieren auch Ihr Vorhaben.</h3>
        <a
          href="/kontakt"
          className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-bold text-sm uppercase tracking-widest rounded-sm transition-colors"
        >
          Jetzt anfragen
        </a>
      </div>
    </div>
  )
}
