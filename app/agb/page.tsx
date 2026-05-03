import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AGB',
  description: 'Allgemeine Geschäftsbedingungen der BARKS Folierung.',
}

export default function AgbPage() {
  return (
    <div className="pt-28 pb-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black tracking-tight mb-10">Allgemeine Geschäftsbedingungen</h1>

      <section className="space-y-8 text-sm text-muted leading-relaxed">

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">§ 1 Geltungsbereich</h2>
          <p>
            Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen
            Barks Folierung, Inhaber Labinot Danez, Appener Str. 34, 25482 Appen (nachfolgend
            „Auftragnehmer") und dem Auftraggeber über die Erbringung von Leistungen im Bereich
            Folierung, Beschriftung, Digitaldruck, Leuchtreklame und Grafikdesign.
          </p>
          <p className="mt-2">
            Abweichende Bedingungen des Auftraggebers werden nicht anerkannt, es sei denn, der
            Auftragnehmer stimmt ihrer Geltung ausdrücklich schriftlich zu.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">§ 2 Angebot und Vertragsschluss</h2>
          <p>
            Angebote des Auftragnehmers sind freibleibend und unverbindlich. Ein Vertrag kommt
            erst durch die schriftliche Auftragsbestätigung des Auftragnehmers oder durch Beginn
            der Leistungserbringung zustande. Mündliche Vereinbarungen bedürfen der schriftlichen
            Bestätigung, um wirksam zu sein.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">§ 3 Preise und Zahlung</h2>
          <p>
            Alle Preise verstehen sich zuzüglich der gesetzlichen Umsatzsteuer. Rechnungen sind
            innerhalb von 14 Tagen nach Rechnungsstellung ohne Abzug zu begleichen, sofern nicht
            anders vereinbart.
          </p>
          <p className="mt-2">
            Bei Zahlungsverzug ist der Auftragnehmer berechtigt, Verzugszinsen in Höhe von 9
            Prozentpunkten über dem Basiszinssatz zu berechnen. Die Geltendmachung eines weiteren
            Schadens bleibt vorbehalten.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">§ 4 Lieferung und Ausführung</h2>
          <p>
            Liefer- und Ausführungsfristen sind unverbindlich, sofern sie nicht ausdrücklich als
            verbindlich vereinbart wurden. Teillieferungen sind zulässig. Verzögerungen durch
            höhere Gewalt, Materialengpässe oder sonstige nicht vom Auftragnehmer zu vertretende
            Umstände verlängern die Fristen entsprechend.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">§ 5 Mitwirkungspflichten des Auftraggebers</h2>
          <p>
            Der Auftraggeber ist verpflichtet, alle für die Auftragsausführung erforderlichen
            Informationen, Materialien und Druckdaten rechtzeitig und in der vereinbarten Qualität
            zu liefern. Verzögerungen, die aus mangelhafter oder verspäteter Mitwirkung des
            Auftraggebers entstehen, gehen nicht zu Lasten des Auftragnehmers.
          </p>
          <p className="mt-2">
            Der Auftraggeber versichert, dass die übergebenen Dateien und Inhalte frei von Rechten
            Dritter sind und keine gesetzlichen Bestimmungen verletzen.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">§ 6 Eigentumsvorbehalt</h2>
          <p>
            Alle gelieferten Waren bleiben bis zur vollständigen Bezahlung Eigentum des
            Auftragnehmers. Der Auftraggeber ist nicht berechtigt, die Vorbehaltsware zu
            verpfänden oder zur Sicherheit zu übereignen.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">§ 7 Gewährleistung und Haftung</h2>
          <p>
            Der Auftragnehmer gewährleistet die mangelfreie Ausführung der vereinbarten Leistungen.
            Mängel sind unverzüglich, spätestens innerhalb von 5 Werktagen nach Abnahme, schriftlich
            anzuzeigen. Die Gewährleistungsfrist beträgt 12 Monate.
          </p>
          <p className="mt-2">
            Farbabweichungen, die durch unterschiedliche Displaykalibrierungen oder
            drucktechnisch bedingte Toleranzen entstehen, gelten nicht als Mangel, sofern sie im
            branchenüblichen Rahmen liegen.
          </p>
          <p className="mt-2">
            Die Haftung des Auftragnehmers für leichte Fahrlässigkeit ist ausgeschlossen, soweit
            keine wesentlichen Vertragspflichten oder Schäden aus der Verletzung des Lebens, des
            Körpers oder der Gesundheit betroffen sind.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">§ 8 Urheberrecht und Nutzungsrechte</h2>
          <p>
            Entwürfe, Gestaltungen und Druckdaten, die vom Auftragnehmer erstellt werden, bleiben
            urheberrechtlich geschützt. Der Auftraggeber erhält nach vollständiger Bezahlung ein
            einfaches Nutzungsrecht für den vereinbarten Zweck. Eine Weitergabe an Dritte oder
            Nutzung für andere Zwecke bedarf der ausdrücklichen schriftlichen Zustimmung.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">§ 9 Datenschutz</h2>
          <p>
            Der Auftragnehmer verarbeitet personenbezogene Daten des Auftraggebers ausschließlich
            im Rahmen der Vertragserfüllung. Näheres regelt die{' '}
            <a href="/datenschutz" className="hover:text-white transition-colors underline underline-offset-2">
              Datenschutzerklärung
            </a>.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">§ 10 Schlussbestimmungen</h2>
          <p>
            Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit gesetzlich
            zulässig, der Sitz des Auftragnehmers. Sollten einzelne Bestimmungen dieser AGB
            unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
          </p>
        </div>

        <p className="text-xs text-muted/60 pt-4 border-t border-border">
          Stand: Mai 2026 · Barks Folierung, Inhaber Labinot Danez, Appener Str. 34, 25482 Appen
        </p>
      </section>
    </div>
  )
}
