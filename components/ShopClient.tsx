'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X, ChevronRight, ChevronLeft, ShoppingCart } from 'lucide-react'
import {
  PRODUCTS, CATS, STEP_TITLES, STEP_LABELS,
  calcPrice, fmtPrice, fmtBrutto, fmtMwSt,
  type Product,
} from '@/lib/shop-products'
import { useCart } from '@/lib/cart'

export default function ShopClient() {
  const [filter,     setFilter]     = useState('all')
  const [activeProd, setActiveProd] = useState<Product | null>(null)
  const [step,       setStep]       = useState(0)
  const [sels,       setSels]       = useState<Record<number, string>>({})
  const [done,       setDone]       = useState(false)
  const [added,      setAdded]      = useState(false)
  const [askQuote,   setAskQuote]   = useState(false)
  const [sending,    setSending]    = useState(false)
  const [error,      setError]      = useState(false)
  const { addItem } = useCart()

  const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter)
  const catLabel = (id: string) => CATS.find(c => c.id === id)?.label ?? id

  function openProduct(prod: Product) {
    setActiveProd(prod)
    setStep(0)
    setSels(Object.fromEntries(prod.steps.map((s, i) => [i, s.opts[0].id])))
    setDone(false)
    setAdded(false)
    setAskQuote(false)
    setError(false)
    document.body.style.overflow = 'hidden'
  }

  function handleAddToCart() {
    if (!activeProd) return
    addItem(activeProd.id, sels)
    setAdded(true)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!activeProd) return
    setSending(true)
    setError(false)

    const f = new FormData(e.currentTarget)
    const config = activeProd.steps
      .map((s, i) => `${STEP_LABELS[i]}: ${s.opts.find(o => o.id === sels[i])?.label ?? '—'}`)
      .join('\n')

    const data = new FormData()
    data.set('name',    f.get('name')?.toString()  ?? '')
    data.set('email',   f.get('email')?.toString() ?? '')
    data.set('phone',   f.get('phone')?.toString() ?? '')
    data.set('service', `Shop: ${activeProd.name}`)
    data.set('message',
      `Produkt: ${activeProd.name}\n${config}\n\n` +
      `Richtpreis netto: ${fmtPrice(price)}\n` +
      `Brutto (inkl. 19% MwSt.): ${fmtBrutto(price)}\n\n` +
      `Wunschtermin: ${f.get('deadline')?.toString() || '–'}\n\n` +
      `Anmerkungen:\n${f.get('notes')?.toString() || '–'}`)

    try {
      const res = await fetch('/api/contact', { method: 'POST', body: data })
      if (!res.ok) throw new Error('send failed')
      setDone(true)
    } catch {
      setError(true)
    } finally {
      setSending(false)
    }
  }

  function closeModal() {
    setActiveProd(null)
    document.body.style.overflow = ''
  }

  const isLastStep = activeProd ? step === activeProd.steps.length : false
  const price      = activeProd ? calcPrice(activeProd, sels) : 0
  // Kauf-Flow für versandfähige Produkte, Anfrage-Flow für Montage-Services
  const buyFlow    = activeProd ? activeProd.purchasable && !askQuote : false

  function optCols(count: number) {
    if (count <= 2) return 'grid-cols-2'
    if (count === 4) return 'grid-cols-2 sm:grid-cols-4'
    return 'grid-cols-2 sm:grid-cols-3'
  }

  return (
    <>
      {/* Category filter */}
      <div className="flex gap-2 flex-wrap mb-8">
        {CATS.map(cat => (
          <button key={cat.id} onClick={() => setFilter(cat.id)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-sm border transition-colors ${
              filter === cat.id
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-border text-muted hover:border-white/40 hover:text-white'
            }`}>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {filtered.map(prod => (
          <div key={prod.id} onClick={() => openProduct(prod)}
            className="bg-surface border border-border rounded-sm overflow-hidden cursor-pointer hover:border-accent/50 transition-all duration-300 group flex flex-col">
            <div className="relative w-full h-48 overflow-hidden bg-surface-2">
              <img src={prod.image} alt={prod.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-widest text-white/80 bg-black/40 px-2 py-1 rounded-sm">
                {catLabel(prod.cat)}
              </div>
              {prod.purchasable && (
                <div className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest text-white bg-accent px-2 py-1 rounded-sm">
                  Online bestellbar
                </div>
              )}
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-lg font-black tracking-tight mb-3 group-hover:text-accent transition-colors">
                {prod.name}
              </h3>
              <ul className="flex-1 mb-4 space-y-1">
                {prod.specs.map(s => (
                  <li key={s} className="text-xs text-muted flex gap-1.5">
                    <span className="text-accent shrink-0">–</span><span>{s}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted">ab (netto)</div>
                  <div className="text-2xl font-black">{fmtPrice(prod.basePrice)}</div>
                  <div className="text-[10px] text-white/60">
                    inkl. 19% MwSt. <span className="text-white font-bold">{fmtBrutto(prod.basePrice)}</span>
                  </div>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  Konfigurieren →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Configurator modal */}
      {activeProd && (
        <div className="fixed inset-0 bg-black/92 z-50 overflow-y-auto p-4 flex items-start justify-center"
          onClick={e => { if (e.target === e.currentTarget) closeModal() }}>
          <div className="w-full max-w-3xl bg-surface border border-border rounded-sm my-4">

            {/* Header */}
            <div className="relative h-36 overflow-hidden">
              <img src={activeProd.image} alt={activeProd.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30 flex items-end p-6">
                <div>
                  <h2 className="text-3xl font-black tracking-tight">{activeProd.name}</h2>
                  <p className="text-xs text-white/60 mt-1 uppercase tracking-widest">
                    {activeProd.purchasable
                      ? 'Produkt konfigurieren & bestellen'
                      : 'Produkt konfigurieren & Angebot anfragen'}
                  </p>
                </div>
              </div>
              <button onClick={closeModal}
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-black/50 border border-white/20 text-white hover:bg-black/70 rounded-sm transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Step bar */}
            <div className="flex border-b border-border overflow-x-auto">
              {[...STEP_LABELS.slice(0, activeProd.steps.length), activeProd.purchasable ? 'Bestellen' : 'Anfrage'].map((label, i) => (
                <div key={i}
                  className={`flex-1 min-w-[72px] py-3 px-2 text-center text-[10px] font-bold uppercase tracking-wider border-r border-border last:border-r-0 relative ${
                    i === step ? 'text-accent' : i < step ? 'text-white/40' : 'text-muted'
                  }`}>
                  {i < step ? '✓ ' : ''}{label}
                  {i === step && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
                </div>
              ))}
            </div>

            {/* Body */}
            <div className="p-6 min-h-[220px]">
              {!isLastStep ? (
                <>
                  <p className="text-xs font-bold uppercase tracking-widest text-accent mb-4">
                    {STEP_TITLES[step] ?? `Schritt ${step + 1}`}
                  </p>
                  <div className={`grid gap-2 ${optCols(activeProd.steps[step].opts.length)}`}>
                    {activeProd.steps[step].opts.map(opt => (
                      <button key={opt.id}
                        onClick={() => setSels(prev => ({ ...prev, [step]: opt.id }))}
                        className={`p-3 text-left border rounded-sm transition-all ${
                          sels[step] === opt.id ? 'border-accent bg-accent/5' : 'border-border hover:border-white/30'
                        }`}>
                        <div className="text-sm font-bold">{opt.label}</div>
                        <div className={`text-xs mt-0.5 ${sels[step] === opt.id ? 'text-accent' : 'text-muted'}`}>
                          {opt.sub}{opt.p > 0 ? ` (+${fmtPrice(opt.p)})` : ''}
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              ) : added ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-full border-2 border-accent flex items-center justify-center mx-auto mb-5 text-accent">
                    <ShoppingCart size={22} />
                  </div>
                  <h3 className="text-2xl font-black text-accent mb-2">Im Warenkorb!</h3>
                  <p className="text-sm text-muted max-w-sm mx-auto leading-relaxed mb-8">
                    {activeProd.name} wurde Ihrem Warenkorb hinzugefügt.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/warenkorb"
                      className="px-8 py-4 bg-accent hover:bg-accent-hover text-white font-bold text-sm uppercase tracking-widest rounded-sm transition-colors">
                      Zur Kasse →
                    </Link>
                    <button onClick={closeModal}
                      className="px-8 py-4 border border-border text-muted hover:text-white hover:border-white/40 font-bold text-sm uppercase tracking-widest rounded-sm transition-colors">
                      Weiter einkaufen
                    </button>
                  </div>
                </div>
              ) : done ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-full border-2 border-accent flex items-center justify-center mx-auto mb-5 text-accent text-xl font-black">✓</div>
                  <h3 className="text-2xl font-black text-accent mb-2">Anfrage gesendet!</h3>
                  <p className="text-sm text-muted max-w-sm mx-auto leading-relaxed">
                    Vielen Dank! Wir melden uns innerhalb von 24 Stunden mit Ihrem persönlichen Angebot.
                  </p>
                </div>
              ) : buyFlow ? (
                <>
                  <p className="text-xs font-bold uppercase tracking-widest text-accent mb-4">
                    Zusammenfassung
                  </p>
                  <div className="bg-background border border-border rounded-sm p-4 mb-5 space-y-1.5">
                    <div className="flex justify-between text-sm pb-1.5 border-b border-border">
                      <span className="text-muted">Produkt</span>
                      <span className="font-medium">{activeProd.name}</span>
                    </div>
                    {activeProd.steps.map((s, i) => {
                      const opt = s.opts.find(o => o.id === sels[i])
                      return (
                        <div key={i} className="flex justify-between text-sm py-1 border-b border-border/60 last:border-0">
                          <span className="text-muted">{STEP_LABELS[i]}</span>
                          <span className="font-medium">{opt?.label ?? '—'}</span>
                        </div>
                      )
                    })}
                    <div className="flex justify-between items-center pt-2 border-t border-border">
                      <span className="text-sm text-muted">Netto</span>
                      <span className="text-sm font-medium">{fmtPrice(price)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted">+ 19% MwSt.</span>
                      <span className="text-sm font-medium">{fmtMwSt(price)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-1 border-t border-border">
                      <span className="text-sm font-bold">Gesamt (brutto)</span>
                      <span className="text-2xl font-black text-accent">{fmtBrutto(price)}</span>
                    </div>
                  </div>
                  <button onClick={handleAddToCart}
                    className="w-full py-4 bg-accent hover:bg-accent-hover text-white font-black text-sm uppercase tracking-widest rounded-sm transition-colors flex items-center justify-center gap-2">
                    <ShoppingCart size={16} /> In den Warenkorb
                  </button>
                  <button onClick={() => setAskQuote(true)}
                    className="w-full mt-3 py-3 text-xs text-muted hover:text-white uppercase tracking-widest font-bold transition-colors">
                    Lieber unverbindlich anfragen?
                  </button>
                </>
              ) : (
                <>
                  <p className="text-xs font-bold uppercase tracking-widest text-accent mb-4">
                    Zusammenfassung & Anfrage
                  </p>
                  <div className="bg-background border border-border rounded-sm p-4 mb-5 space-y-1.5">
                    <div className="flex justify-between text-sm pb-1.5 border-b border-border">
                      <span className="text-muted">Produkt</span>
                      <span className="font-medium">{activeProd.name}</span>
                    </div>
                    {activeProd.steps.map((s, i) => {
                      const opt = s.opts.find(o => o.id === sels[i])
                      return (
                        <div key={i} className="flex justify-between text-sm py-1 border-b border-border/60 last:border-0">
                          <span className="text-muted">{STEP_LABELS[i]}</span>
                          <span className="font-medium">{opt?.label ?? '—'}</span>
                        </div>
                      )
                    })}
                    <div className="flex justify-between items-center pt-2 border-t border-border">
                      <span className="text-sm text-muted">Netto</span>
                      <span className="text-sm font-medium">{fmtPrice(price)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted">+ 19% MwSt.</span>
                      <span className="text-sm font-medium">{fmtMwSt(price)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-1 border-t border-border">
                      <span className="text-sm font-bold">Gesamt (brutto)</span>
                      <span className="text-2xl font-black text-accent">{fmtBrutto(price)}</span>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-muted mb-1.5">Name *</label>
                      <input required name="name" type="text" placeholder="Max Mustermann"
                        className="w-full bg-background border border-border rounded-sm px-3 py-2.5 text-sm placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-muted mb-1.5">E-Mail *</label>
                      <input required name="email" type="email" placeholder="mail@example.com"
                        className="w-full bg-background border border-border rounded-sm px-3 py-2.5 text-sm placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-muted mb-1.5">Telefon / WhatsApp</label>
                      <input name="phone" type="tel" placeholder="+49 ..."
                        className="w-full bg-background border border-border rounded-sm px-3 py-2.5 text-sm placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-muted mb-1.5">Wunschtermin</label>
                      <input name="deadline" type="text" placeholder="z.B. bis 20. Juli"
                        className="w-full bg-background border border-border rounded-sm px-3 py-2.5 text-sm placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] uppercase tracking-widest text-muted mb-1.5">Anmerkungen</label>
                      <textarea name="notes" rows={3} placeholder="Besondere Wünsche, Logofarben, Dateiformat..."
                        className="w-full bg-background border border-border rounded-sm px-3 py-2.5 text-sm placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors resize-y" />
                    </div>
                    {error && (
                      <p className="sm:col-span-2 text-sm text-red-500">
                        Leider konnte die Anfrage nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an{' '}
                        <a href="mailto:info@barksfolierung.de" className="underline">info@barksfolierung.de</a>.
                      </p>
                    )}
                    <div className="sm:col-span-2">
                      <button type="submit" disabled={sending}
                        className="w-full py-4 bg-accent hover:bg-accent-hover text-white font-black text-sm uppercase tracking-widest rounded-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                        {sending ? 'Wird gesendet…' : 'Angebot anfragen →'}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>

            {/* Footer */}
            {!done && !added && (
              <div className="flex items-center justify-between p-5 border-t border-border bg-background flex-wrap gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted mb-1">
                    {activeProd.purchasable ? 'Preis' : 'Richtpreis'}
                  </div>
                  <div className="text-[11px] text-muted">Netto: {fmtPrice(price)}</div>
                  <div className="text-[11px] text-muted">+ 19% MwSt.: {fmtMwSt(price)}</div>
                  <div className="text-2xl font-black text-accent leading-tight mt-0.5">{fmtBrutto(price)}</div>
                  <div className="text-[10px] text-muted">Brutto (inkl. MwSt.)</div>
                </div>
                <div className="flex gap-2">
                  {step > 0 && (
                    <button onClick={() => setStep(s => s - 1)}
                      className="px-5 py-2.5 border border-border text-muted text-xs font-bold uppercase tracking-wider rounded-sm hover:border-white/40 hover:text-white transition-colors flex items-center gap-1.5">
                      <ChevronLeft size={14} /> Zurück
                    </button>
                  )}
                  {!isLastStep && (
                    <button onClick={() => setStep(s => s + 1)}
                      className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-colors flex items-center gap-1.5">
                      Weiter <ChevronRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
