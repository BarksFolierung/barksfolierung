'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Car, PenTool, Layers, Printer, Lightbulb, Palette, type LucideIcon } from 'lucide-react'

type ServiceId = 'fahrzeug' | 'beschriftung' | 'fenster' | 'druck' | 'leuchtreklame' | 'grafikdesign'

interface ServiceOption {
  id: ServiceId
  label: string
  icon: LucideIcon
}

const serviceOptions: ServiceOption[] = [
  { id: 'fahrzeug', label: 'Fahrzeugfolierung', icon: Car },
  { id: 'beschriftung', label: 'Beschriftung & Schilder', icon: PenTool },
  { id: 'fenster', label: 'Fensterfolierung', icon: Layers },
  { id: 'druck', label: 'Digitaldruck', icon: Printer },
  { id: 'leuchtreklame', label: 'Leuchtreklame / Neon', icon: Lightbulb },
  { id: 'grafikdesign', label: 'Grafikdesign & Branding', icon: Palette },
]

const subOptions: Record<ServiceId, { id: string; label: string; min: number; max: number | null }[]> = {
  fahrzeug: [
    { id: 'pkw-voll', label: 'PKW Vollfolierung', min: 1500, max: 3500 },
    { id: 'pkw-teil', label: 'PKW Teilfolierung', min: 600, max: 1500 },
    { id: 'suv-voll', label: 'SUV / Kombi Vollfolierung', min: 2000, max: 4000 },
    { id: 'trans-voll', label: 'Transporter Vollfolierung', min: 2500, max: 5000 },
    { id: 'trans-beschr', label: 'Transporter Beschriftung', min: 400, max: 1200 },
    { id: 'lkw', label: 'LKW / Bus (auf Anfrage)', min: 4000, max: null },
  ],
  beschriftung: [
    { id: 'folie-s', label: 'Klebefolie klein (<1m²)', min: 50, max: 200 },
    { id: 'folie-m', label: 'Klebefolie mittel (1–5m²)', min: 200, max: 600 },
    { id: 'schild-alu', label: 'Firmenschild Alucobond', min: 300, max: 900 },
    { id: 'buchstaben-3d', label: '3D-Buchstaben', min: 500, max: 2500 },
    { id: 'leuchtkasten', label: 'Leuchtkasten (klassisch)', min: 600, max: 2500 },
  ],
  fenster: [
    { id: 'fenster-s', label: 'Fläche bis 5m²', min: 150, max: 400 },
    { id: 'fenster-m', label: 'Fläche 5–15m²', min: 400, max: 900 },
    { id: 'fenster-l', label: 'Fläche 15–30m²', min: 900, max: 2000 },
    { id: 'fenster-xl', label: 'Fläche >30m² (auf Anfrage)', min: 2000, max: null },
  ],
  druck: [
    { id: 'banner-s', label: 'Banner / Poster (bis 2m²)', min: 50, max: 150 },
    { id: 'banner-m', label: 'Großformatdruck (bis 10m²)', min: 150, max: 500 },
    { id: 'sticker', label: 'Aufkleber (individuell)', min: 30, max: 300 },
    { id: 'fahrzeugfolie', label: 'Druckfolierung (auf Anfrage)', min: 500, max: null },
  ],
  leuchtreklame: [
    { id: 'neon-s', label: 'LED-Neon klein', min: 300, max: 800 },
    { id: 'neon-l', label: 'LED-Neon groß', min: 800, max: 2500 },
    { id: 'leuchtkasten-led', label: 'LED-Leuchtkasten', min: 800, max: 3500 },
    { id: 'aussenreklame', label: 'Außenreklame individuell', min: 1000, max: null },
  ],
  grafikdesign: [
    { id: 'logo', label: 'Logo-Design', min: 250, max: 800 },
    { id: 'ci', label: 'Corporate Identity (Logo + Farben + Schrift)', min: 800, max: 2500 },
    { id: 'layout-einzel', label: 'Layout (Flyer, Visitenkarte, Schild)', min: 80, max: 300 },
    { id: 'layout-komplex', label: 'Layout komplex (Broschüre, Katalog)', min: 300, max: 1200 },
    { id: 'druckdaten', label: 'Druckdatenaufbereitung (bestehende Datei)', min: 50, max: 200 },
    { id: 'branding-komplett', label: 'Komplett-Branding (auf Anfrage)', min: 1500, max: null },
  ],
}

export default function PriceCalculator() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<ServiceId | null>(null)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const currentOptions = selectedService ? subOptions[selectedService] : []
  const selectedPriceOption = currentOptions.find((o) => o.id === selectedOption)

  const handleServiceSelect = (id: ServiceId) => {
    setSelectedService(id)
    setSelectedOption(null)
    setStep(2)
  }

  const handleOptionSelect = (id: string) => {
    setSelectedOption(id)
    setStep(3)
  }

  const reset = () => {
    setStep(1)
    setSelectedService(null)
    setSelectedOption(null)
  }

  return (
    <div className="bg-surface border border-border rounded-sm p-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-3">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                s <= step ? 'bg-accent text-white' : 'bg-surface-2 text-muted border border-border'
              }`}
            >
              {s}
            </div>
            {s < 3 && (
              <div className={`flex-1 h-px w-12 ${s < step ? 'bg-accent' : 'bg-border'}`} />
            )}
          </div>
        ))}
        <span className="ml-2 text-xs text-muted uppercase tracking-wider">
          {step === 1 && 'Leistung wählen'}
          {step === 2 && 'Option wählen'}
          {step === 3 && 'Preisschätzung'}
        </span>
      </div>

      {step === 1 && (
        <div>
          <h3 className="text-lg font-bold mb-6">Welche Leistung benötigen Sie?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {serviceOptions.map((s) => (
              <button
                key={s.id}
                onClick={() => handleServiceSelect(s.id)}
                className="flex items-center gap-3 p-4 border border-border rounded-sm hover:border-accent/60 hover:bg-surface-2 transition-all text-left group"
              >
                <s.icon size={20} strokeWidth={1.5} className="text-accent flex-shrink-0" />
                <span className="font-medium group-hover:text-accent transition-colors">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && selectedService && (
        <div>
          <h3 className="text-lg font-bold mb-6">
            {serviceOptions.find((s) => s.id === selectedService)?.label} – Variante wählen:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {subOptions[selectedService].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleOptionSelect(opt.id)}
                className="flex items-center justify-between p-4 border border-border rounded-sm hover:border-accent/60 hover:bg-surface-2 transition-all text-left group"
              >
                <span className="font-medium text-sm group-hover:text-accent transition-colors">
                  {opt.label}
                </span>
                <span className="text-xs text-muted ml-2 whitespace-nowrap">
                  ab {opt.min.toLocaleString('de-DE')} €
                </span>
              </button>
            ))}
          </div>
          <button onClick={reset} className="mt-4 text-xs text-muted hover:text-white transition-colors">
            ← Zurück
          </button>
        </div>
      )}

      {step === 3 && selectedPriceOption && (
        <div className="text-center">
          <div className="mb-2 text-sm text-muted uppercase tracking-widest">Geschätzter Preisrahmen</div>
          <div className="text-5xl font-black text-accent mb-2">
            {selectedPriceOption.max
              ? `${selectedPriceOption.min.toLocaleString('de-DE')} – ${selectedPriceOption.max.toLocaleString('de-DE')} €`
              : `ab ${selectedPriceOption.min.toLocaleString('de-DE')} €`}
          </div>
          <p className="text-sm text-muted mb-8 max-w-md mx-auto">
            Dies ist eine unverbindliche Schätzung. Der genaue Preis hängt von Material, Aufwand und
            individuellen Anforderungen ab.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/kontakt"
              className="px-8 py-3 bg-accent hover:bg-accent-hover text-white font-bold text-sm uppercase tracking-wider rounded-sm transition-colors"
            >
              Jetzt Angebot anfragen
            </Link>
            <button
              onClick={reset}
              className="px-8 py-3 border border-border hover:border-white/40 text-white text-sm font-medium rounded-sm transition-colors"
            >
              Neu berechnen
            </button>
          </div>
        </div>
      )}

      <p className="text-xs text-muted/60 mt-8 text-center">
        * Alle Preise inkl. MwSt. · Endpreise auf Anfrage · Kostenlose Beratung
      </p>
    </div>
  )
}
