import Link from 'next/link'
import { Car, PenTool, Layers, Printer, Lightbulb, Building2 } from 'lucide-react'

const services = [
  {
    icon: Car,
    title: 'Fahrzeugfolierung',
    description:
      'Vollfolierung, Teilfolierung oder Beschriftung – vom PKW über Transporter bis zum LKW. Hochwertige Folien für jeden Bedarf.',
    href: '/leistungen#fahrzeug',
  },
  {
    icon: PenTool,
    title: 'Beschriftung & Schilder',
    description:
      '3D-Buchstaben, Leuchtkästen, Alucobond-Schilder und Schaufensterbeschriftung für Gastronomie, Einzelhandel & Unternehmen.',
    href: '/leistungen#beschriftung',
  },
  {
    icon: Layers,
    title: 'Fensterfolierung',
    description:
      'Milchglas, Sichtschutz, Sonnenschutz und dekorative Glasfolien für Büros, Gastronomie und Privaträume.',
    href: '/leistungen#fenster',
  },
  {
    icon: Printer,
    title: 'Digitaldruck',
    description:
      'Großformatdruck für Banner, Plakate, Fahrzeugfolien und Messewände. Brillante Farben, UV-beständig und langlebig.',
    href: '/leistungen#druck',
  },
  {
    icon: Lightbulb,
    title: 'Leuchtreklame & Neon',
    description:
      'LED-Leuchtkästen, Neonschriften und beleuchtete Außenschilder, die Ihre Marke bei Tag und Nacht sichtbar machen.',
    href: '/leistungen#leuchtreklame',
  },
  {
    icon: Building2,
    title: 'Innenraumgestaltung',
    description:
      'Wandfolien, Raumkonzepte und Interior-Grafiken für Büros, Empfangsbereiche, Restaurants und Fitnessstudios.',
    href: '/leistungen#innenraum',
  },
]

export default function ServicesSection() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-accent mb-4">Leistungen</p>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
          Was wir für Sie machen
        </h2>
        <p className="text-muted mt-4 max-w-xl mx-auto">
          Von der Idee bis zur Montage – alles aus einer Hand.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => {
          const Icon = service.icon
          return (
            <Link
              key={service.title}
              href={service.href}
              className="group p-8 bg-surface border border-border rounded-sm hover:border-accent/60 transition-all duration-300 hover:bg-surface-2"
            >
              <div className="mb-4 w-10 h-10 flex items-center justify-center text-accent">
                <Icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold mb-3 group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{service.description}</p>
              <div className="mt-4 text-accent text-sm font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Mehr erfahren <span>→</span>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/leistungen"
          className="inline-flex items-center gap-2 px-8 py-4 border border-border hover:border-white/40 text-white font-bold text-sm uppercase tracking-widest rounded-sm transition-all duration-200 hover:bg-white/5"
        >
          Alle Leistungen ansehen
        </Link>
      </div>
    </section>
  )
}
