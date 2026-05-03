import Link from 'next/link'

const services = [
  'Fahrzeugfolierung',
  'Beschriftung & Schilder',
  'Fensterfolierung',
  'Digitaldruck',
  'Leuchtreklame',
  'Innenraumgestaltung',
]

const legalLinks = [
  { href: '/impressum', label: 'Impressum' },
  { href: '/datenschutz', label: 'Datenschutz' },
  { href: '/agb', label: 'AGB' },
  { href: '/widerruf', label: 'Widerrufsbelehrung' },
  { href: '/versand-zahlung', label: 'Versand & Zahlung' },
]

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-black tracking-tight">
                BARKS<span className="text-accent">.</span>
              </span>
            </Link>
            <p className="text-sm text-muted leading-relaxed">
              Digital Print · Beschriften<br />
              Medientechnologiehandwerk
            </p>
            <p className="text-xs text-muted/60 mt-4 italic">
              "We wrap it. We print it. You love it."
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted mb-5">Navigation</h4>
            <ul className="space-y-3">
              {[
                ['/', 'Startseite'],
                ['/leistungen', 'Leistungen'],
                ['/portfolio', 'Portfolio'],
                ['/shop', 'Shop'],
                ['/kontakt', 'Kontakt'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-muted hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted mb-5">Leistungen</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <Link href="/leistungen" className="text-sm text-muted hover:text-white transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted mb-5">Kontakt</h4>
            <address className="not-italic text-sm text-muted space-y-2 leading-relaxed">
              <p>Appener Str. 34<br />25482 Appen</p>
              <p className="pt-1">
                <a href="mailto:barkssinfo@gmail.com" className="hover:text-white transition-colors">
                  barkssinfo@gmail.com
                </a>
              </p>
              <p>
                <a
                  href="https://www.instagram.com/barksfolierung"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-xs text-muted">
              © {new Date().getFullYear()} BARKS Folierung · Ali Sadiki
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
              {legalLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
