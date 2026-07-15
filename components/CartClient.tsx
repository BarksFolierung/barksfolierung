'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Trash2, ShoppingCart, Lock } from 'lucide-react'
import {
  getProduct, calcPrice, configLines, shippingNetto,
  fmtEur, VAT_RATE, FREE_SHIPPING_NETTO,
} from '@/lib/shop-products'
import { useCart } from '@/lib/cart'

type Delivery = 'versand' | 'abholung'
type Payment  = 'stripe' | 'vorkasse'

export default function CartClient() {
  const { items, removeItem, subtotalNetto } = useCart()
  const router = useRouter()

  const [delivery, setDelivery] = useState<Delivery>('versand')
  const [payment,  setPayment]  = useState<Payment>('stripe')
  const [sending,  setSending]  = useState(false)
  const [error,    setError]    = useState<string | null>(null)

  const shipNetto  = shippingNetto(subtotalNetto, delivery)
  const totalNetto = subtotalNetto + shipNetto
  const mwst       = totalNetto * VAT_RATE
  const brutto     = totalNetto * (1 + VAT_RATE)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (items.length === 0) return
    setSending(true)
    setError(null)

    const f = new FormData(e.currentTarget)
    const payload = {
      items: items.map(it => ({ productId: it.productId, sels: it.sels })),
      customer: {
        firma:   f.get('firma')?.toString() || undefined,
        name:    f.get('name')?.toString() ?? '',
        email:   f.get('email')?.toString() ?? '',
        phone:   f.get('phone')?.toString() || undefined,
        strasse: f.get('strasse')?.toString() ?? '',
        plz:     f.get('plz')?.toString() ?? '',
        ort:     f.get('ort')?.toString() ?? '',
      },
      delivery,
      payment,
      notes: f.get('notes')?.toString() || undefined,
    }

    try {
      if (payment === 'stripe') {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        const data = await res.json()
        if (!res.ok || !data.url) {
          throw new Error(data.error || 'Checkout fehlgeschlagen')
        }
        window.location.href = data.url  // Weiterleitung zu Stripe
      } else {
        const res = await fetch('/api/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        const data = await res.json()
        if (!res.ok || !data.success) throw new Error('Bestellung fehlgeschlagen')
        router.push(`/bestellung/danke?order=${data.orderNo}&zahlung=vorkasse`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.')
      setSending(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20 border border-border rounded-sm bg-surface">
        <ShoppingCart size={40} className="mx-auto mb-6 text-muted" />
        <h2 className="text-2xl font-black mb-3">Ihr Warenkorb ist leer</h2>
        <p className="text-muted mb-8">Konfigurieren Sie Ihre Produkte in unserem Shop.</p>
        <Link href="/shop"
          className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-bold text-sm uppercase tracking-widest rounded-sm transition-colors">
          Zum Shop →
        </Link>
      </div>
    )
  }

  const inputCls = 'w-full bg-background border border-border rounded-sm px-3 py-2.5 text-sm placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors'
  const labelCls = 'block text-[10px] uppercase tracking-widest text-muted mb-1.5'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

      {/* ── Artikel ── */}
      <div className="lg:col-span-3 space-y-3">
        {items.map(it => {
          const product = getProduct(it.productId)
          if (!product) return null
          const netto = calcPrice(product, it.sels)
          return (
            <div key={it.key} className="flex gap-4 bg-surface border border-border rounded-sm p-4">
              <img src={product.image} alt={product.name}
                className="w-20 h-20 object-cover rounded-sm shrink-0 hidden sm:block" />
              <div className="flex-1 min-w-0">
                <h3 className="font-black tracking-tight">{product.name}</h3>
                <ul className="mt-1 space-y-0.5">
                  {configLines(product, it.sels).map(line => (
                    <li key={line} className="text-xs text-muted">{line}</li>
                  ))}
                </ul>
              </div>
              <div className="text-right shrink-0 flex flex-col justify-between items-end">
                <div>
                  <div className="font-black">{fmtEur(netto * (1 + VAT_RATE))}</div>
                  <div className="text-[10px] text-muted">inkl. MwSt.</div>
                </div>
                <button onClick={() => removeItem(it.key)} aria-label="Entfernen"
                  className="p-1.5 text-muted hover:text-red-500 transition-colors">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          )
        })}
        {shipNetto > 0 && (
          <p className="text-xs text-muted px-1">
            Noch {fmtEur(FREE_SHIPPING_NETTO - subtotalNetto)} (netto) bis zum kostenlosen Versand.
          </p>
        )}
      </div>

      {/* ── Kasse ── */}
      <div className="lg:col-span-2">
        <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-sm p-6 space-y-5 sticky top-24">

          {/* Lieferung */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">Lieferung</p>
            <div className="grid grid-cols-2 gap-2">
              {([
                { id: 'versand',  label: 'Versand',  sub: shipNetto > 0 ? `${fmtEur(shipNetto * (1 + VAT_RATE))}` : 'Kostenlos' },
                { id: 'abholung', label: 'Abholung', sub: 'Appen, kostenlos' },
              ] as const).map(opt => (
                <button key={opt.id} type="button" onClick={() => setDelivery(opt.id)}
                  className={`p-3 text-left border rounded-sm transition-all ${
                    delivery === opt.id ? 'border-accent bg-accent/5' : 'border-border hover:border-white/30'
                  }`}>
                  <div className="text-sm font-bold">{opt.label}</div>
                  <div className={`text-xs mt-0.5 ${delivery === opt.id ? 'text-accent' : 'text-muted'}`}>{opt.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Zahlung */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">Zahlung</p>
            <div className="grid grid-cols-1 gap-2">
              {([
                { id: 'stripe',   label: 'Online bezahlen', sub: 'Karte, Klarna u. a. – sicher via Stripe' },
                { id: 'vorkasse', label: 'Vorkasse / Überweisung', sub: 'Bankdaten per E-Mail, Produktion nach Zahlungseingang' },
              ] as const).map(opt => (
                <button key={opt.id} type="button" onClick={() => setPayment(opt.id)}
                  className={`p-3 text-left border rounded-sm transition-all ${
                    payment === opt.id ? 'border-accent bg-accent/5' : 'border-border hover:border-white/30'
                  }`}>
                  <div className="text-sm font-bold">{opt.label}</div>
                  <div className={`text-xs mt-0.5 ${payment === opt.id ? 'text-accent' : 'text-muted'}`}>{opt.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Adresse */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
              {delivery === 'versand' ? 'Lieferadresse' : 'Rechnungsadresse'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className={labelCls}>Firma (optional)</label>
                <input name="firma" type="text" className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Name *</label>
                <input required name="name" type="text" placeholder="Max Mustermann" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>E-Mail *</label>
                <input required name="email" type="email" placeholder="mail@example.com" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Telefon</label>
                <input name="phone" type="tel" placeholder="+49 ..." className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Straße & Hausnummer *</label>
                <input required name="strasse" type="text" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>PLZ *</label>
                <input required name="plz" type="text" inputMode="numeric" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Ort *</label>
                <input required name="ort" type="text" className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Anmerkungen</label>
                <textarea name="notes" rows={2} placeholder="Besondere Wünsche, Hinweise zu Druckdaten..."
                  className={`${inputCls} resize-y`} />
              </div>
            </div>
          </div>

          {/* Summen */}
          <div className="space-y-1.5 pt-2 border-t border-border">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Zwischensumme (netto)</span>
              <span>{fmtEur(subtotalNetto)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">{delivery === 'versand' ? 'Versand' : 'Abholung'}</span>
              <span>{shipNetto === 0 ? 'Kostenlos' : fmtEur(shipNetto)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">zzgl. 19% MwSt.</span>
              <span>{fmtEur(mwst)}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-border">
              <span className="font-bold">Gesamt</span>
              <span className="text-2xl font-black text-accent">{fmtEur(brutto)}</span>
            </div>
          </div>

          {/* AGB */}
          <label className="flex items-start gap-3 text-xs text-muted cursor-pointer">
            <input required type="checkbox" name="agb" className="mt-0.5 accent-[#E53935]" />
            <span>
              Ich habe die{' '}
              <Link href="/agb" target="_blank" className="underline hover:text-white">AGB</Link> und die{' '}
              <Link href="/widerruf" target="_blank" className="underline hover:text-white">Widerrufsbelehrung</Link>{' '}
              gelesen und akzeptiere sie. Hinweis: Bei individuell angefertigten Produkten besteht kein Widerrufsrecht.
            </span>
          </label>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button type="submit" disabled={sending}
            className="w-full py-4 bg-accent hover:bg-accent-hover text-white font-black text-sm uppercase tracking-widest rounded-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            <Lock size={14} />
            {sending
              ? 'Wird verarbeitet…'
              : payment === 'stripe' ? 'Zahlungspflichtig bestellen & bezahlen' : 'Zahlungspflichtig bestellen'}
          </button>
          <p className="text-[10px] text-muted text-center">
            Alle Preise inkl. 19% MwSt. · Lieferzeit i. d. R. 5–10 Werktage nach Freigabe der Druckdaten
          </p>
        </form>
      </div>
    </div>
  )
}
