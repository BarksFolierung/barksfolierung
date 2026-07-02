'use client'

import { useState } from 'react'

export default function QuoteForm() {
  const [done, setDone] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    setError(false)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: new FormData(e.currentTarget),
      })
      if (!res.ok) throw new Error('send failed')
      setDone(true)
    } catch {
      setError(true)
    } finally {
      setSending(false)
    }
  }

  if (done) {
    return (
      <div className="p-10 bg-surface border border-border rounded-sm text-center">
        <div className="w-14 h-14 rounded-full border-2 border-accent flex items-center justify-center mx-auto mb-5 text-accent text-xl font-black">✓</div>
        <h3 className="text-2xl font-black text-accent mb-2">Anfrage gesendet!</h3>
        <p className="text-sm text-muted max-w-sm mx-auto leading-relaxed">
          Vielen Dank! Wir melden uns innerhalb von 24 Stunden mit einem persönlichen Angebot.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-muted mb-1.5">Name *</label>
          <input required name="name" type="text" placeholder="Max Mustermann"
            className="w-full bg-surface border border-border rounded-sm px-4 py-3 text-sm placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors" />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-muted mb-1.5">E-Mail *</label>
          <input required name="email" type="email" placeholder="mail@example.com"
            className="w-full bg-surface border border-border rounded-sm px-4 py-3 text-sm placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors" />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-muted mb-1.5">Telefon / WhatsApp</label>
          <input name="phone" type="tel" placeholder="+49 ..."
            className="w-full bg-surface border border-border rounded-sm px-4 py-3 text-sm placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors" />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-muted mb-1.5">Leistung</label>
          <select name="service" className="w-full bg-surface border border-border rounded-sm px-4 py-3 text-sm text-muted focus:outline-none focus:border-accent transition-colors">
            <option value="">Bitte wählen</option>
            <option>Fahrzeugfolierung</option>
            <option>Autobeschriftung</option>
            <option>Fensterfolie / Sonnenschutz</option>
            <option>Fensterbeschriftung</option>
            <option>Schilder & Beschriftung</option>
            <option>Digitaldruck</option>
            <option>Lichtwerbung</option>
            <option>Textilien</option>
            <option>Werbeartikel</option>
            <option>Sonstiges</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-[10px] uppercase tracking-widest text-muted mb-1.5">Nachricht *</label>
        <textarea required name="message" rows={5} placeholder="Beschreiben Sie kurz Ihr Projekt..."
          className="w-full bg-surface border border-border rounded-sm px-4 py-3 text-sm placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors resize-y" />
      </div>
      {error && (
        <p className="text-sm text-red-500">
          Leider konnte die Anfrage nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an{' '}
          <a href="mailto:info@barksfolierung.de" className="underline">info@barksfolierung.de</a>.
        </p>
      )}
      <button type="submit" disabled={sending}
        className="w-full py-4 bg-accent hover:bg-accent-hover text-white font-black text-sm uppercase tracking-widest rounded-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
        {sending ? 'Wird gesendet…' : 'Anfrage senden →'}
      </button>
    </form>
  )
}
