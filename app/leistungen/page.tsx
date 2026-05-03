import type { Metadata } from 'next'
import Link from 'next/link'
import { Car, PenTool, Layers, Printer, Lightbulb, Building2, Check } from 'lucide-react'
import PriceCalculator from '@/components/PriceCalculator'

export const metadata: Metadata = {
  title: 'Leistungen',
  description:
    'BARKS Folierung Hamburg – Fahrzeugfolierung, Beschriftung, Fensterfolierung, Digitaldruck, Leuchtreklame und Innenraumgestaltung.',
}

const services = [
  {
    id: 'fahrzeug',
    icon: Car,
    title: 'Fahrzeugfolierung',
    description:
      'Wir folieren Fahrzeuge aller Art – PKW, SUV, Transporter und LKW. Ob Vollfolierung, Teilfolierung oder reine Beschriftung: Wir arbeiten mit hochwertigen Folien von 3M, Avery und Hexis für maximale Haltbarkeit und brillante Farben.',
    features: [
      'Vollfolierung & Teilfolierung',
      'Mattfolien, Glanzfolien, Carbon & Chrom',
      'Unternehmens- und Flottenbeklebung',
      'Individuelle Designs auf Anfrage',
      'Professionelle Montage & Abnahme',
    ],
  },
  {
    id: 'beschriftung',
    icon: PenTool,
    title: 'Beschriftung & Schilder',
    description:
      'Von der Schaufensterschrift bis zum beleuchteten Außenschild: Wir entwerfen und produzieren Beschriftungen und Schilder für Gastronomie, Einzelhandel und Unternehmen – professionell und langlebig.',
    features: [
      '3D-Buchstaben aus Acryl, Aluminium oder PVC',
      'Alucobond-Firmenschilder',
      'Leuchtkästen & LED-Schilder',
      'Schaufensterbeschriftung',
      'Montage und Installation inklusive',
    ],
  },
  {
    id: 'fenster',
    icon: Layers,
    title: 'Fensterfolierung',
    description:
      'Sichtschutz, Sonnenschutz, dekorative Glasgestaltung oder Branding im Büro – wir folieren Glasflächen aller Größen. Perfekt für Büros, Restaurants, Hotels und Praxen.',
    features: [
      'Milchglas- / Sandstrahloptik',
      'Sicht- und Sonnenschutzfolien',
      'Bedruckte Glasfolien mit individuellem Motiv',
      'Dekor- und Designfolien',
      'Zuschnitt und Montage durch Fachpersonal',
    ],
  },
  {
    id: 'druck',
    icon: Printer,
    title: 'Digitaldruck',
    description:
      'Unser Großformatdruck liefert brillante Ergebnisse für Banner, Plakate, Messewände, Klebefolien und vieles mehr. UV-beständige Tinten und Premium-Materialien für Innen- und Außenbereich.',
    features: [
      'Großformat bis über 3m Breite',
      'UV-beständige, wetterfeste Drucke',
      'Poster, Banner, Messewände',
      'Fahrzeugfolien als Digitaldruck',
      'Schnelle Lieferzeiten',
    ],
  },
  {
    id: 'leuchtreklame',
    icon: Lightbulb,
    title: 'Leuchtreklame & Neon',
    description:
      'LED-Neonschriften, beleuchtete Leuchtkästen und individuelle Lichtinstallationen, die Ihre Marke Tag und Nacht sichtbar machen. Wir planen, produzieren und montieren alles aus einer Hand.',
    features: [
      'LED-Neonschriften (individuell)',
      'Leuchtkästen mit Digitaldruck',
      'Beleuchtete 3D-Buchstaben',
      'Außenreklame & Fassadenwerbung',
      'Planung, Produktion & Montage',
    ],
  },
  {
    id: 'innenraum',
    icon: Building2,
    title: 'Innenraumgestaltung',
    description:
      'Wir gestalten Büros, Empfangsbereiche, Restaurants und Fitnessstudios mit Wandfolien, Raumgrafiken und Interior-Branding. Vom Concept bis zur fertigen Umsetzung.',
    features: [
      'Wandfolien & Wandaufkleber',
      'Raumgrafiken & Motivwände',
      'Empfangsbereich & Corporate Design',
      'Türbeschriftung & Raumkennzeichnung',
      'Individuelle Konzepte auf Anfrage',
    ],
  },
]

export default function LeistungenPage() {
  return (
    <div className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <p className="text-xs font-bold uppercase tracking-widest text-accent mb-4">Leistungen</p>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight max-w-3xl">
            Alles aus einer Hand – für Ihren professionellen Auftritt.
          </h1>
          <p className="text-muted mt-6 max-w-2xl text-lg leading-relaxed">
            Von der Fahrzeugfolierung bis zur Leuchtreklame: Wir sind Ihr Komplettanbieter für
            Werbetechnik und Mediengestaltung in Hamburg.
          </p>
        </div>

        <div className="space-y-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.id}
                id={service.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 bg-surface border border-border rounded-sm"
              >
                <div>
                  <div className="mb-4 w-12 h-12 flex items-center justify-center text-accent border border-border rounded-sm">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h2 className="text-2xl font-black mb-4">{service.title}</h2>
                  <p className="text-muted leading-relaxed">{service.description}</p>
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-bold text-sm uppercase tracking-wider rounded-sm transition-colors"
                  >
                    Angebot anfragen
                  </Link>
                </div>
                <div>
                  <ul className="space-y-3">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <Check size={16} strokeWidth={2.5} className="mt-0.5 flex-shrink-0 text-accent" />
                        <span className="text-muted">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-accent mb-4">Preisrechner</p>
          <h2 className="text-4xl font-black tracking-tight">Kosten schätzen</h2>
          <p className="text-muted mt-4 max-w-xl mx-auto">
            Wählen Sie Ihre gewünschte Leistung und erhalten Sie sofort eine Preisschätzung.
          </p>
        </div>
        <PriceCalculator />
      </div>
    </div>
  )
}
