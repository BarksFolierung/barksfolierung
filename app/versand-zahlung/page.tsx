import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Versand- und Zahlungsbedingungen',
  description: 'Versand- und Zahlungsbedingungen der BARKS Folierung.',
}

export default function VersandZahlungPage() {
  return (
    <div className="pt-28 pb-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black tracking-tight mb-10">Versand- und Zahlungsbedingungen</h1>

      <section className="space-y-8 text-sm text-muted leading-relaxed">

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">Zahlungsarten</h2>
          <p>Wir bieten folgende Zahlungsmöglichkeiten an:</p>
          <ul className="mt-3 space-y-2 list-disc list-inside">
            <li>Online-Zahlung im Shop (Kreditkarte, Klarna u. a. – Abwicklung über Stripe)</li>
            <li>Banküberweisung (Vorkasse)</li>
            <li>Barzahlung bei Abholung oder Montage vor Ort</li>
            <li>Rechnung (für Geschäftskunden nach Vereinbarung)</li>
          </ul>
          <p className="mt-3">
            Rechnungen sind innerhalb von 14 Tagen nach Rechnungsstellung ohne Abzug zu
            begleichen, sofern nicht schriftlich anders vereinbart. Bei Überschreitung der
            Zahlungsfrist behalten wir uns vor, Mahngebühren sowie Verzugszinsen gemäß § 288 BGB
            zu berechnen.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">Preise</h2>
          <p>
            Alle angegebenen Preise verstehen sich als Nettopreise zuzüglich der jeweils gültigen
            gesetzlichen Umsatzsteuer. Für Privatkunden werden Bruttopreise inkl. MwSt. ausgewiesen.
          </p>
          <p className="mt-2">
            Preisschätzungen auf der Website und im Preisrechner sind unverbindlich. Der
            endgültige Preis wird nach individueller Beratung und Auftragserteilung schriftlich
            bestätigt.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">Versand & Lieferung</h2>
          <p>
            Standardprodukte (z. B. Druckerzeugnisse, Aufkleber) werden per DHL, DPD oder UPS
            versandt. Im Online-Shop gilt eine Versandkostenpauschale von 8,90 € netto
            (10,59 € brutto) pro Bestellung; ab einem Warenwert von 150 € netto liefern wir
            versandkostenfrei. Alternativ ist eine kostenlose Abholung an unserem Standort in
            Appen möglich.
          </p>
          <p className="mt-2">
            Für individuelle Großaufträge (z. B. Fahrzeugfolierungen, Leuchtkasten, Wandfolien)
            erfolgt die Montage ausschließlich durch unser Team vor Ort. Montagezeiten und
            -konditionen werden im Angebot individuell vereinbart.
          </p>
          <p className="mt-2">
            Lieferzeiten für Standardprodukte betragen in der Regel 5–10 Werktage nach
            Auftragsbestätigung und vollständiger Bereitstellung der Druckdaten. Für
            Sonderanfertigungen gelten gesondert vereinbarte Fristen.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">Abholung</h2>
          <p>
            Eine Abholung fertiger Produkte ist nach vorheriger Terminvereinbarung an unserem
            Standort möglich:
          </p>
          <div className="mt-3 pl-4 border-l border-border">
            <p>
              Barks Folierung<br />
              Appener Str. 34<br />
              25482 Appen<br />
              Deutschland
            </p>
          </div>
          <p className="mt-3">
            Bitte vereinbaren Sie einen Termin vorab per E-Mail an{' '}
            <a href="mailto:info@barksfolierung.de" className="hover:text-white transition-colors">
              info@barksfolierung.de
            </a>{' '}
            oder telefonisch unter{' '}
            <a href="tel:+491722868584" className="hover:text-white transition-colors">
              +49 1722868584
            </a>.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">Druckdaten & Dateiübergabe</h2>
          <p>
            Druckdaten können per E-Mail oder über das Kontaktformular auf unserer Website
            übermittelt werden. Wir empfehlen folgende Formate für druckfertige Dateien:
          </p>
          <ul className="mt-3 space-y-1 list-disc list-inside">
            <li>PDF (druckfertig, mit Beschnittzugabe 3 mm)</li>
            <li>AI oder EPS (Vektordaten, Schriften in Pfade umgewandelt)</li>
            <li>TIFF oder PNG (min. 150 dpi im Endformat)</li>
          </ul>
          <p className="mt-3">
            Für Kunden ohne fertige Druckdaten bieten wir Grafikdesign-Leistungen an. Weitere
            Informationen finden Sie in unserem{' '}
            <a href="/leistungen" className="hover:text-white transition-colors">
              Leistungsbereich
            </a>.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">Reklamationen</h2>
          <p>
            Mängel an gelieferten Produkten sind unverzüglich, spätestens innerhalb von 5
            Werktagen nach Erhalt, schriftlich anzuzeigen. Bitte fügen Sie aussagekräftige Fotos
            des Mangels bei. Näheres regeln unsere{' '}
            <a href="/agb" className="hover:text-white transition-colors">
              AGB
            </a>.
          </p>
        </div>

        <p className="text-xs text-muted/60 pt-4 border-t border-border">
          Stand: Mai 2026 · Barks Folierung, Inhaber Labinot Danez, Appener Str. 34, 25482 Appen
        </p>
      </section>
    </div>
  )
}
