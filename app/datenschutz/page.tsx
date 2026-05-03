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
            Datenschutzvorschriften sowie dieser Datenschutzerklärung.
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
            <a href="mailto:barkssinfo@gmail.com" className="hover:text-white transition-colors">
              barkssinfo@gmail.com
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
            3. Erhebung und Speicherung personenbezogener Daten
          </h2>
          <p>
            Beim Besuch unserer Website werden automatisch Informationen durch den Hosting-Anbieter
            erfasst (z. B. IP-Adresse, Browser, Uhrzeit). Diese Daten dienen ausschließlich zur
            Sicherstellung eines störungsfreien Betriebs der Website.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">
            4. Kontaktformular
          </h2>
          <p>
            Wenn Sie uns per Kontaktformular Anfragen senden, werden Ihre Angaben inklusive der
            Kontaktdaten zwecks Bearbeitung der Anfrage gespeichert. Diese Daten geben wir nicht
            ohne Ihre Einwilligung weiter.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">
            5. Verwendung von Cookies
          </h2>
          <p>
            Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem
            Endgerät gespeichert werden. Sie dienen dazu, unser Angebot nutzerfreundlicher und
            sicherer zu machen.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">
            6. Ihre Rechte
          </h2>
          <p>Sie haben jederzeit das Recht auf:</p>
          <ul className="mt-3 space-y-1 list-disc list-inside">
            <li>Auskunft über Ihre gespeicherten Daten</li>
            <li>Berichtigung oder Löschung</li>
            <li>Einschränkung der Verarbeitung</li>
            <li>Widerspruch gegen die Verarbeitung</li>
            <li>Datenübertragbarkeit</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">
            7. Hosting
          </h2>
          <p>
            Unsere Website wird bei einem externen Dienstleister gehostet. Die personenbezogenen
            Daten werden auf den Servern des Hosters gespeichert.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">
            8. SSL-/TLS-Verschlüsselung
          </h2>
          <p>Diese Seite nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung.</p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">
            9. Änderungen
          </h2>
          <p>
            Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den
            aktuellen rechtlichen Anforderungen entspricht.
          </p>
        </div>
      </section>
    </div>
  )
}
