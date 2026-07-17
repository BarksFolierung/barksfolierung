import type { Metadata } from 'next'
import Link from 'next/link'
import ClearCartOnMount from '@/components/ClearCartOnMount'

export const metadata: Metadata = {
  title: 'Bestellung erhalten',
  robots: { index: false },
}

export default function DankePage({
  searchParams,
}: {
  searchParams: { order?: string; zahlung?: string; dateien?: string }
}) {
  const orderNo   = searchParams.order
  const vorkasse  = searchParams.zahlung === 'vorkasse'
  const filesSent = parseInt(searchParams.dateien ?? '0', 10) > 0

  return (
    <div className="pt-28 pb-24 max-w-2xl mx-auto px-4 sm:px-6 text-center">
      <ClearCartOnMount />

      <div className="w-16 h-16 rounded-full border-2 border-accent flex items-center justify-center mx-auto mb-8 text-accent text-2xl font-black">
        ✓
      </div>
      <p className="text-xs font-bold uppercase tracking-widest text-accent mb-4">Bestellung erhalten</p>
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
        Vielen Dank für Ihre Bestellung!
      </h1>
      {orderNo && (
        <p className="text-lg mb-2">
          Ihre Bestellnummer: <span className="font-black text-accent">{orderNo}</span>
        </p>
      )}
      <p className="text-muted leading-relaxed mb-4">
        {vorkasse
          ? 'Sie erhalten in Kürze eine Bestellbestätigung mit unseren Bankdaten per E-Mail. Nach Zahlungseingang starten wir die Produktion.'
          : 'Ihre Zahlung war erfolgreich. Sie erhalten in Kürze eine Bestellbestätigung per E-Mail.'}
      </p>
      <div className="bg-surface border border-border rounded-sm p-6 text-left mb-10">
        {filesSent ? (
          <>
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">Druckdaten erhalten ✓</p>
            <p className="text-sm text-muted leading-relaxed">
              Ihre hochgeladenen Druckdaten sind bei uns angekommen – Sie müssen nichts weiter tun.
              Falls wir Rückfragen zu den Daten haben, melden wir uns bei Ihnen.
            </p>
          </>
        ) : (
          <>
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">Nächster Schritt: Druckdaten</p>
            <p className="text-sm text-muted leading-relaxed">
              Bitte senden Sie uns Ihre Druckdaten (PDF, AI/EPS oder PNG/TIFF ab 150 dpi) als Antwort auf die
              Bestellbestätigung – mit Angabe Ihrer Bestellnummer. Sie haben keine fertigen Druckdaten?
              Kein Problem, wir unterstützen Sie gern beim Design.
            </p>
          </>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/shop"
          className="px-8 py-4 bg-accent hover:bg-accent-hover text-white font-bold text-sm uppercase tracking-widest rounded-sm transition-colors">
          Weiter einkaufen
        </Link>
        <Link href="/"
          className="px-8 py-4 border border-border text-muted hover:text-white hover:border-white/40 font-bold text-sm uppercase tracking-widest rounded-sm transition-colors">
          Zur Startseite
        </Link>
      </div>
    </div>
  )
}
