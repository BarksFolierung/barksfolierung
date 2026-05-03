import type { Metadata } from 'next'
import { MapPin, Phone, Mail, Globe, Zap, type LucideIcon } from 'lucide-react'
import QuoteForm from '@/components/QuoteForm'

export const metadata: Metadata = {
  title: 'Kontakt & Angebot',
  description:
    'Kontaktieren Sie BARKS Folierung Hamburg für ein kostenloses Angebot. Fahrzeugfolierung, Beschriftung, Digitaldruck & mehr.',
}

const contactInfo: { icon: LucideIcon; label: string; value: string; href?: string }[] = [
  {
    icon: MapPin,
    label: 'Adresse',
    value: 'Appener Str. 34, 25482 Appen',
  },
  {
    icon: Phone,
    label: 'Telefon',
    value: '+49 1722868584',
    href: 'tel:+491722868584',
  },
  {
    icon: Mail,
    label: 'E-Mail',
    value: 'barkssinfo@gmail.com',
    href: 'mailto:barkssinfo@gmail.com',
  },
  {
    icon: Globe,
    label: 'Website',
    value: 'www.barksfolierung.de',
    href: 'https://www.barksfolierung.de',
  },
]

export default function KontaktPage() {
  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-16">
        <p className="text-xs font-bold uppercase tracking-widest text-accent mb-4">Kontakt</p>
        <h1 className="text-5xl sm:text-6xl font-black tracking-tight">Angebot anfragen</h1>
        <p className="text-muted mt-4 max-w-xl text-lg leading-relaxed">
          Beschreiben Sie uns Ihr Projekt und wir melden uns innerhalb von 24 Stunden mit einem
          individuellen Angebot.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <QuoteForm />
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-surface border border-border rounded-sm">
            <h3 className="font-bold mb-5 text-sm uppercase tracking-widest text-muted">
              Kontaktdaten
            </h3>
            <div className="space-y-4">
              {contactInfo.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-start gap-3">
                    <Icon size={16} strokeWidth={1.5} className="mt-0.5 flex-shrink-0 text-accent" />
                    <div>
                      <div className="text-xs text-muted uppercase tracking-wider mb-0.5">
                        {item.label}
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm text-white hover:text-accent transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-sm text-white">{item.value}</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="p-6 bg-surface border border-border rounded-sm">
            <h3 className="font-bold mb-3 text-sm uppercase tracking-widest text-muted">
              Öffnungszeiten
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Mo – Fr</span>
                <span>09:00 – 18:00 Uhr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Sa</span>
                <span>Nach Vereinbarung</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">So</span>
                <span className="text-muted">Geschlossen</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-accent/10 border border-accent/30 rounded-sm">
            <Zap size={22} strokeWidth={1.5} className="text-accent mb-3" />
            <h3 className="font-bold mb-2">Schnelle Antwort</h3>
            <p className="text-sm text-muted">
              Wir antworten in der Regel innerhalb von 24 Stunden auf Ihre Anfrage.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
