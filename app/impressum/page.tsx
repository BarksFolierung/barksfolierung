import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum der BARKS Folierung – Angaben gemäß § 5 DDG.',
}

export default function ImpressumPage() {
  return (
    <div className="pt-28 pb-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black tracking-tight mb-10">Impressum</h1>

      <section className="space-y-8 text-sm text-muted leading-relaxed">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">
            Angaben gemäß § 5 DDG
          </h2>
          <p>
            <strong className="text-white">Barks Folierung</strong><br />
            Inhaber: Labinot Danez<br />
            Appener Str. 34<br />
            25482 Appen<br />
            Deutschland
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">Kontakt</h2>
          <p>
            Telefon:{' '}
            <a href="tel:+491722868584" className="hover:text-white transition-colors">
              +49 1722868584
            </a>
            <br />
            E-Mail:{' '}
            <a href="mailto:info@barksfolierung.de" className="hover:text-white transition-colors">
              info@barksfolierung.de
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">
            Umsatzsteuer-ID
          </h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:<br />
            DE342279835
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </h2>
          <p>
            Labinot Danez<br />
            Appener Str. 34<br />
            25482 Appen<br />
            Deutschland
          </p>
        </div>
      </section>
    </div>
  )
}
