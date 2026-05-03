'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Cookie, X, ChevronDown, ChevronUp, Check } from 'lucide-react'

interface CookieConsent {
  necessary: true
  analytics: boolean
  marketing: boolean
  timestamp: string
}

function loadConsent(): CookieConsent | null {
  try {
    const raw = localStorage.getItem('barks-cookie-consent')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveConsent(consent: CookieConsent) {
  localStorage.setItem('barks-cookie-consent', JSON.stringify(consent))
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    if (!loadConsent()) setVisible(true)
  }, [])

  const acceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true, timestamp: new Date().toISOString() })
    setVisible(false)
  }

  const acceptNecessary = () => {
    saveConsent({ necessary: true, analytics: false, marketing: false, timestamp: new Date().toISOString() })
    setVisible(false)
  }

  const saveSettings = () => {
    saveConsent({ necessary: true, analytics, marketing, timestamp: new Date().toISOString() })
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-end justify-center pointer-events-none">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 pointer-events-auto" />

      <div className="relative pointer-events-auto w-full max-w-2xl mx-4 mb-4 sm:mb-6 bg-surface border border-border rounded-sm shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start gap-3 mb-4">
            <Cookie size={20} strokeWidth={1.5} className="text-accent mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h2 className="text-base font-bold text-white mb-1">Datenschutz-Einstellungen</h2>
              <p className="text-xs text-muted leading-relaxed">
                Wir verwenden Cookies, um Ihnen die bestmögliche Nutzung unserer Website zu
                ermöglichen. Einige Cookies sind technisch notwendig, andere helfen uns, das
                Angebot zu verbessern. Weitere Informationen finden Sie in unserer{' '}
                <Link href="/datenschutz" className="text-accent hover:underline" onClick={() => setVisible(false)}>
                  Datenschutzerklärung
                </Link>.
              </p>
            </div>
          </div>

          {/* Settings panel */}
          {showSettings && (
            <div className="mb-4 border border-border rounded-sm divide-y divide-border text-sm">
              {/* Necessary */}
              <div className="flex items-center justify-between px-4 py-3 gap-4">
                <div>
                  <p className="font-medium text-white text-xs uppercase tracking-wider">Notwendige Cookies</p>
                  <p className="text-xs text-muted mt-0.5">Für den Betrieb der Website technisch erforderlich.</p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0 text-xs text-muted">
                  <Check size={13} className="text-accent" />
                  Immer aktiv
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-center justify-between px-4 py-3 gap-4">
                <div>
                  <p className="font-medium text-white text-xs uppercase tracking-wider">Analyse-Cookies</p>
                  <p className="text-xs text-muted mt-0.5">Helfen uns, die Nutzung der Website zu verstehen.</p>
                </div>
                <button
                  onClick={() => setAnalytics(!analytics)}
                  className={`relative flex-shrink-0 w-10 h-5 rounded-full transition-colors duration-200 ${
                    analytics ? 'bg-accent' : 'bg-border'
                  }`}
                  aria-checked={analytics}
                  role="switch"
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                      analytics ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Marketing */}
              <div className="flex items-center justify-between px-4 py-3 gap-4">
                <div>
                  <p className="font-medium text-white text-xs uppercase tracking-wider">Marketing-Cookies</p>
                  <p className="text-xs text-muted mt-0.5">Ermöglichen personalisierte Inhalte und Werbung.</p>
                </div>
                <button
                  onClick={() => setMarketing(!marketing)}
                  className={`relative flex-shrink-0 w-10 h-5 rounded-full transition-colors duration-200 ${
                    marketing ? 'bg-accent' : 'bg-border'
                  }`}
                  aria-checked={marketing}
                  role="switch"
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                      marketing ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={acceptAll}
              className="flex-1 px-4 py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-colors"
            >
              Alle akzeptieren
            </button>
            <button
              onClick={acceptNecessary}
              className="flex-1 px-4 py-2.5 border border-border hover:border-white/40 text-white text-xs font-medium rounded-sm transition-colors"
            >
              Nur notwendige
            </button>
            <button
              onClick={() => showSettings ? saveSettings() : setShowSettings(true)}
              className="flex-1 px-4 py-2.5 border border-border hover:border-white/40 text-muted hover:text-white text-xs font-medium rounded-sm transition-colors flex items-center justify-center gap-1.5"
            >
              {showSettings ? (
                <>Auswahl speichern <ChevronUp size={13} /></>
              ) : (
                <>Einstellungen <ChevronDown size={13} /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
