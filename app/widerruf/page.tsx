import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Widerrufsbelehrung',
  description: 'Widerrufsbelehrung der BARKS Folierung.',
}

export default function WiderrufPage() {
  return (
    <div className="pt-28 pb-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black tracking-tight mb-10">Widerrufsbelehrung</h1>

      <section className="space-y-8 text-sm text-muted leading-relaxed">

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">Widerrufsrecht</h2>
          <p>
            Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag
            zu widerrufen.
          </p>
          <p className="mt-2">
            Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen
            benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben
            bzw. hat.
          </p>
          <p className="mt-2">
            Um Ihr Widerrufsrecht auszuüben, müssen Sie uns:
          </p>
          <div className="mt-3 pl-4 border-l border-border">
            <p>
              <strong className="text-white">Barks Folierung</strong><br />
              Inhaber: Labinot Danez<br />
              Appener Str. 34<br />
              25482 Appen<br />
              Deutschland<br />
              E-Mail:{' '}
              <a href="mailto:info@barksfolierung.de" className="hover:text-white transition-colors">
                info@barksfolierung.de
              </a>
            </p>
          </div>
          <p className="mt-3">
            mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder
            eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.
          </p>
          <p className="mt-2">
            Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die
            Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">Folgen des Widerrufs</h2>
          <p>
            Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen
            erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten,
            die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns
            angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens
            binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren
            Widerruf dieses Vertrags bei uns eingegangen ist.
          </p>
          <p className="mt-2">
            Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der
            ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich
            etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte
            berechnet.
          </p>
          <p className="mt-2">
            Wir können die Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten haben
            oder bis Sie den Nachweis erbracht haben, dass Sie die Waren zurückgesandt haben, je
            nachdem, welches der frühere Zeitpunkt ist.
          </p>
          <p className="mt-2">
            Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen
            ab dem Tag, an dem Sie uns über den Widerruf dieses Vertrags unterrichten, an uns
            zurückzusenden oder zu übergeben. Die Frist ist gewahrt, wenn Sie die Waren vor
            Ablauf der Frist von vierzehn Tagen absenden.
          </p>
          <p className="mt-2">
            Sie tragen die unmittelbaren Kosten der Rücksendung der Waren.
          </p>
          <p className="mt-2">
            Sie müssen für einen etwaigen Wertverlust der Waren nur aufkommen, wenn dieser
            Wertverlust auf einen zur Prüfung der Beschaffenheit, Eigenschaften und
            Funktionsweise der Waren nicht notwendigen Umgang mit ihnen zurückzuführen ist.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">Ausschluss des Widerrufsrechts</h2>
          <p>
            Das Widerrufsrecht besteht nicht bei Verträgen zur Lieferung von Waren, die nicht
            vorgefertigt sind und für deren Herstellung eine individuelle Auswahl oder Bestimmung
            durch den Verbraucher maßgeblich ist oder die eindeutig auf die persönlichen
            Bedürfnisse des Verbrauchers zugeschnitten sind (§ 312g Abs. 2 Nr. 1 BGB).
          </p>
          <p className="mt-2">
            Dies betrifft insbesondere individuell angefertigte Folierungen, maßgefertigte
            Schilder, Sonderanfertigungen im Digitaldruck sowie individuell gestaltete
            Grafikdesign-Leistungen, die nach Kundenvorgaben umgesetzt wurden.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">Muster-Widerrufsformular</h2>
          <p>
            Wenn Sie den Vertrag widerrufen wollen, können Sie das folgende Formular ausfüllen
            und an uns zurücksenden (die Verwendung ist nicht verpflichtend – eine formlose
            E-Mail genügt ebenfalls):
          </p>
          <div className="mt-4 p-5 bg-surface border border-border rounded-sm space-y-3">
            <p>
              An:<br />
              Barks Folierung, Inhaber Labinot Danez<br />
              Appener Str. 34, 25482 Appen, Deutschland<br />
              E-Mail: info@barksfolierung.de
            </p>
            <p>
              Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über
              den Kauf der folgenden Waren (*) / die Erbringung der folgenden Dienstleistung (*):
            </p>
            <p>_______________________________________________</p>
            <p>Bestellt am (*) / erhalten am (*): _______________________</p>
            <p>Name des/der Verbraucher(s): _______________________</p>
            <p>Anschrift des/der Verbraucher(s): _______________________</p>
            <p>
              Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier):
              _______________________
            </p>
            <p>Datum: _______________________</p>
            <p className="text-xs text-muted/60">(*) Unzutreffendes streichen.</p>
          </div>
        </div>

        <p className="text-xs text-muted/60 pt-4 border-t border-border">
          Stand: Juli 2026 · Barks Folierung, Inhaber Labinot Danez, Appener Str. 34, 25482 Appen
        </p>
      </section>
    </div>
  )
}
