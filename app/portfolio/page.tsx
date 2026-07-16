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

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-8 bg-surface border border-border rounded-sm text-center">
          <p className="text-muted mb-2">Ihr Projekt fehlt hier?</p>
          <h3 className="text-2xl font-bold mb-4">Wir realisieren auch Ihr Vorhaben.</h3>
          <a
            href="/kontakt"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-bold text-sm uppercase tracking-widest rounded-sm transition-colors"
          >
            Jetzt anfragen
          </a>
        </div>

        <div className="p-8 bg-gradient-to-br from-[#833AB4]/20 via-[#FD1D1D]/15 to-[#FCAF45]/20 border border-border rounded-sm text-center">
          <p className="text-muted mb-2">Täglich neue Projekte</p>
          <h3 className="text-2xl font-bold mb-4">Folgen Sie uns auf Instagram</h3>
          <a
            href="https://www.instagram.com/barksfolierung"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 hover:border-white text-white font-bold text-sm uppercase tracking-widest rounded-sm transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            @barksfolierung
          </a>
        </div>
      </div>
    </div>
  )
}
