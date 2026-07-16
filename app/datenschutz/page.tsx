import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung der BARKS Folierung.',
}

export default function DatenschutzPage() {
  return (
    <div className="pt-28 pb-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black tracking-tight mb-10">Datenschutzerklärung</h1>

      <section className="space-y-8 text-sm text-muted leading-relaxed">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">
            1. Allgemeine Hinweise
          </h2>
          <p>
            Der Schutz Ihrer persönlichen Daten ist uns sehr wichtig. Wir behandeln Ihre
            personenbezogenen Daten vertraulich und entsprechend der gesetzlichen
            Datenschutzvorschriften (DSGVO, BDSG) sowie dieser Datenschutzerklärung.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">
            2. Verantwortliche Stelle
          </h2>
          <p>
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br /><br />
            <strong className="text-white">Barks Folierung</strong><br />
            Inhaber: Labinot Danez<br />
            Appener Str. 34<br />
            25482 Appen<br />
            Deutschland<br /><br />
            E-Mail:{' '}
            <a href="mailto:info@barksfolierung.de" className="hover:text-white transition-colors">
              info@barksfolierung.de
            </a>
            <br />
            Telefon:{' '}
            <a href="tel:+491722868584" className="hover:text-white transition-colors">
              +49 1722868584
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">
            3. Hosting (Netlify)
          </h2>
          <p>
            Unsere Website wird bei Netlify, Inc., 512 2nd Street, Suite 200, San Francisco,
            CA 94107, USA gehostet. Beim Besuch der Website erfasst Netlify automatisch
            Informationen in sogenannten Server-Logfiles (z. B. IP-Adresse, Browsertyp,
            Datum und Uhrzeit des Zugriffs). Diese Daten dienen ausschließlich der
            Sicherstellung eines störungsfreien Betriebs der Website und werden nicht mit
            anderen Datenquellen zusammengeführt.
          </p>
          <p className="mt-2">
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der
            sicheren und effizienten Bereitstellung der Website). Netlify ist unter dem
            EU-U.S. Data Privacy Framework zertifiziert. Weitere Informationen:{' '}
            <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white transition-colors">
              netlify.com/privacy
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">
            4. Kontaktformular und Anfragen
          </h2>
          <p>
            Wenn Sie uns per Kontaktformular oder Produkt-Konfigurator Anfragen senden, werden
            Ihre Angaben inklusive der von Ihnen angegebenen Kontaktdaten zwecks Bearbeitung
            der Anfrage und für mögliche Anschlussfragen bei uns gespeichert. Der Versand der
            Anfrage an uns erfolgt per E-Mail über den Dienst Gmail der Google Ireland Limited,
            Gordon House, Barrow Street, Dublin 4, Irland.
          </p>
          <p className="mt-2">
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Durchführung vorvertraglicher
            Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO. Diese Daten geben wir nicht ohne Ihre
            Einwilligung weiter.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">
            5. Bestellungen im Online-Shop
          </h2>
          <p>
            Bei einer Bestellung in unserem Online-Shop verarbeiten wir die von Ihnen
            angegebenen Daten (Name, ggf. Firma, Anschrift, E-Mail-Adresse, Telefonnummer
            sowie die Bestelldaten) zur Abwicklung des Vertrags, zur Lieferung der Ware und
            zur Rechnungsstellung. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
            (Vertragserfüllung).
          </p>
          <p className="mt-2">
            Bestell- und Rechnungsdaten bewahren wir im Rahmen der handels- und
            steuerrechtlichen Aufbewahrungspflichten (§ 147 AO, § 257 HGB) auf. Eine
            Weitergabe an Dritte erfolgt nur, soweit dies zur Vertragsabwicklung erforderlich
            ist (z. B. an das mit der Lieferung beauftragte Versandunternehmen oder den
            Zahlungsdienstleister).
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">
            6. Zahlungsabwicklung (Stripe)
          </h2>
          <p>
            Für die Online-Zahlung in unserem Shop nutzen wir den Zahlungsdienstleister Stripe
            Payments Europe, Ltd., 1 Grand Canal Street Lower, Grand Canal Dock, Dublin,
            Irland. Wenn Sie die Zahlungsart „Online bezahlen" wählen, werden die für die
            Zahlungsabwicklung erforderlichen Daten (z. B. Name, E-Mail-Adresse,
            Rechnungsbetrag und Ihre Zahlungsdaten wie Kartennummer) direkt an Stripe
            übermittelt. Ihre Zahlungsdaten werden dabei nicht auf unseren Servern
            gespeichert.
          </p>
          <p className="mt-2">
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung). Stripe kann
            Daten an die Stripe, Inc. in den USA übermitteln; Stripe ist unter dem EU-U.S.
            Data Privacy Framework zertifiziert. Weitere Informationen in der
            Datenschutzerklärung von Stripe:{' '}
            <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white transition-colors">
              stripe.com/de/privacy
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">
            7. Cookies und Local Storage
          </h2>
          <p>
            Unsere Website verwendet technisch notwendige Cookies und den sogenannten Local
            Storage Ihres Browsers, z. B. um den Inhalt Ihres Warenkorbs und Ihre
            Cookie-Einstellungen zu speichern. Diese Speicherung ist für den Betrieb des Shops
            erforderlich (Art. 6 Abs. 1 lit. f DSGVO bzw. § 25 Abs. 2 TDDDG) und enthält keine
            Tracking- oder Werbefunktionen. Nicht notwendige Cookies setzen wir nur mit Ihrer
            Einwilligung über den Cookie-Banner ein.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">
            8. Ihre Rechte
          </h2>
          <p>Sie haben jederzeit das Recht auf:</p>
          <ul className="mt-3 space-y-1 list-disc list-inside">
            <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
            <li>Berichtigung (Art. 16 DSGVO) oder Löschung (Art. 17 DSGVO)</li>
            <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          </ul>
          <p className="mt-3">
            Außerdem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu
            beschweren (Art. 77 DSGVO). Für uns zuständig ist das Unabhängige Landeszentrum
            für Datenschutz Schleswig-Holstein (ULD), Holstenstraße 98, 24103 Kiel.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">
            9. SSL-/TLS-Verschlüsselung
          </h2>
          <p>
            Diese Seite nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung.
            Eine verschlüsselte Verbindung erkennen Sie am „https://" in der Adresszeile
            Ihres Browsers.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">
            10. Änderungen
          </h2>
          <p>
            Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den
            aktuellen rechtlichen Anforderungen entspricht.
          </p>
        </div>

        <p className="text-xs text-muted/60 pt-4 border-t border-border">
          Stand: Juli 2026 · Barks Folierung, Inhaber Labinot Danez, Appener Str. 34, 25482 Appen
        </p>
      </section>
    </div>
  )
}
