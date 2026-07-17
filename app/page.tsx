import Link from 'next/link'
import Hero from '@/components/Hero'
import ServicesSection from '@/components/ServicesSection'
import PortfolioGrid from '@/components/PortfolioGrid'
import PriceCalculator from '@/components/PriceCalculator'
import ShopClient from '@/components/ShopClient'

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Kompletter Shop direkt auf der Startseite – zweiter Scroll */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-accent mb-4">Online-Shop</p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight">Alle Produkte direkt bestellen</h2>
          <p className="text-muted mt-4 max-w-xl mx-auto">
            Produkt wählen, konfigurieren, bestellen – Druckdaten einfach beim Checkout hochladen.
          </p>
        </div>
        <ShopClient />
      </section>

      <ServicesSection />

      <section className="py-24 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-4">Portfolio</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">Unsere Arbeiten</h2>
            <p className="text-muted mt-4 max-w-xl mx-auto">
              Eine Auswahl aktueller Projekte aus Hamburg und Umgebung.
            </p>
          </div>

          <PortfolioGrid limit={6} />

          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-bold text-sm uppercase tracking-widest rounded-sm transition-colors"
            >
              Alle Projekte ansehen
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-accent mb-4">
            Preisrechner
          </p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
            Kosten berechnen
          </h2>
          <p className="text-muted mt-4 max-w-xl mx-auto">
            Erhalten Sie eine schnelle Preisschätzung für Ihr Projekt – in nur 2 Schritten.
          </p>
        </div>

        <PriceCalculator />
      </section>

      <section className="py-24 bg-accent relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-6">
            Bereit für Ihr Projekt?
          </h2>
          <p className="text-white/80 text-lg mb-10">
            Kontaktieren Sie uns für eine kostenlose Beratung und ein unverbindliches Angebot.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-accent font-black text-sm uppercase tracking-widest rounded-sm hover:bg-white/90 transition-all duration-200 hover:scale-105"
          >
            Jetzt Angebot anfragen
          </Link>
        </div>
      </section>
    </>
  )
}
