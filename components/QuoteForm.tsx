'use client'

import { useState, FormEvent, useRef, useCallback } from 'react'
import { Upload, X, FileText, Image as ImageIcon, File, Check, AlertCircle } from 'lucide-react'

const serviceOptions = [
  'Fahrzeugfolierung',
  'Beschriftung & Schilder',
  'Fensterfolierung',
  'Digitaldruck',
  'Leuchtreklame / Neon',
  'Innenraumgestaltung',
  'Sonstiges',
]

const ACCEPTED_EXTENSIONS = '.pdf,.ai,.eps,.png,.jpg,.jpeg,.svg,.tif,.tiff,.psd,.cdr,.zip,.indd'
const MAX_FILE_SIZE_MB = 15
const MAX_FILES = 5
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024

type FormState = 'idle' | 'submitting' | 'success' | 'error'

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function FileTypeIcon({ file }: { file: File }) {
  if (file.type.startsWith('image/'))
    return <ImageIcon size={15} className="text-blue-400 flex-shrink-0" />
  if (file.type === 'application/pdf')
    return <FileText size={15} className="text-red-400 flex-shrink-0" />
  return <File size={15} className="text-muted flex-shrink-0" />
}

function getFileExt(name: string) {
  return name.split('.').pop()?.toUpperCase() ?? ''
}

function validateFiles(incoming: File[], existing: File[]): { valid: File[]; errors: string[] } {
  const errors: string[] = []
  const valid: File[] = []

  for (const file of incoming) {
    const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
    const allowed = ['pdf','ai','eps','png','jpg','jpeg','svg','tif','tiff','psd','cdr','zip','indd']
    if (!allowed.includes(ext)) {
      errors.push(`"${file.name}" – Dateiformat nicht unterstützt.`)
      continue
    }
    if (file.size > MAX_FILE_SIZE) {
      errors.push(`"${file.name}" – Datei zu groß (max. ${MAX_FILE_SIZE_MB} MB).`)
      continue
    }
    if (existing.length + valid.length >= MAX_FILES) {
      errors.push(`Maximal ${MAX_FILES} Dateien erlaubt.`)
      break
    }
    valid.push(file)
  }

  return { valid, errors }
}

export default function QuoteForm() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [files, setFiles] = useState<File[]>([])
  const [fileErrors, setFileErrors] = useState<string[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const addFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return
    const { valid, errors } = validateFiles(Array.from(incoming), files)
    setFileErrors(errors)
    if (valid.length) setFiles((prev) => [...prev, ...valid])
  }, [files])

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    setFileErrors([])
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    addFiles(e.dataTransfer.files)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState('submitting')

    try {
      const formData = new FormData(e.currentTarget)
      files.forEach((file) => formData.append('files', file))

      const response = await fetch('/', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setFormState('success')
        setForm({ name: '', email: '', phone: '', service: '', message: '' })
        setFiles([])
        setFileErrors([])
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  if (formState === 'success') {
    return (
      <div className="bg-surface border border-border rounded-sm p-12 text-center">
        <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-4">
          <Check size={22} strokeWidth={2.5} className="text-accent" />
        </div>
        <h3 className="text-2xl font-bold mb-3">Anfrage gesendet!</h3>
        <p className="text-muted mb-6">
          Vielen Dank für Ihre Anfrage. Wir melden uns in der Regel innerhalb von 24 Stunden bei Ihnen.
        </p>
        <button
          onClick={() => setFormState('idle')}
          className="px-6 py-2.5 border border-border hover:border-white/40 text-sm text-white rounded-sm transition-colors"
        >
          Neue Anfrage senden
        </button>
      </div>
    )
  }

  return (
    <form
      name="anfrage"
      method="POST"
      encType="multipart/form-data"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="bg-surface border border-border rounded-sm p-8 space-y-5"
    >
      <input type="hidden" name="form-name" value="anfrage" />
      <p className="hidden">
        <label>Don't fill this out: <input name="bot-field" onChange={handleChange} /></label>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
            Name *
          </label>
          <input
            id="name" name="name" type="text" required
            value={form.name} onChange={handleChange}
            placeholder="Ihr vollständiger Name"
            className="w-full px-4 py-3 bg-background border border-border rounded-sm text-white placeholder-muted/50 focus:outline-none focus:border-accent transition-colors text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
            E-Mail *
          </label>
          <input
            id="email" name="email" type="email" required
            value={form.email} onChange={handleChange}
            placeholder="ihre@email.de"
            className="w-full px-4 py-3 bg-background border border-border rounded-sm text-white placeholder-muted/50 focus:outline-none focus:border-accent transition-colors text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
            Telefon
          </label>
          <input
            id="phone" name="phone" type="tel"
            value={form.phone} onChange={handleChange}
            placeholder="+49 40 123 456"
            className="w-full px-4 py-3 bg-background border border-border rounded-sm text-white placeholder-muted/50 focus:outline-none focus:border-accent transition-colors text-sm"
          />
        </div>
        <div>
          <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
            Leistung *
          </label>
          <select
            id="service" name="service" required
            value={form.service} onChange={handleChange}
            className="w-full px-4 py-3 bg-background border border-border rounded-sm text-white focus:outline-none focus:border-accent transition-colors text-sm appearance-none cursor-pointer"
          >
            <option value="" disabled>Leistung auswählen</option>
            {serviceOptions.map((s) => (
              <option key={s} value={s} className="bg-surface">{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
          Projektbeschreibung *
        </label>
        <textarea
          id="message" name="message" required rows={5}
          value={form.message} onChange={handleChange}
          placeholder="Beschreiben Sie Ihr Projekt: Fahrzeugtyp, Größe, gewünschtes Design, Deadline usw."
          className="w-full px-4 py-3 bg-background border border-border rounded-sm text-white placeholder-muted/50 focus:outline-none focus:border-accent transition-colors text-sm resize-none"
        />
      </div>

      {/* File upload */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
          Projektdateien <span className="text-muted/50 normal-case font-normal tracking-normal">(optional)</span>
        </label>

        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-sm px-6 py-8 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-accent bg-accent/5'
              : 'border-border hover:border-white/30 hover:bg-white/[0.02]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            name="files"
            multiple
            accept={ACCEPTED_EXTENSIONS}
            className="hidden"
            onChange={(e) => addFiles(e.target.files)}
          />
          <Upload
            size={22}
            strokeWidth={1.5}
            className={`mx-auto mb-3 transition-colors ${isDragging ? 'text-accent' : 'text-muted'}`}
          />
          <p className="text-sm text-white font-medium mb-1">
            Dateien hierher ziehen oder <span className="text-accent">auswählen</span>
          </p>
          <p className="text-xs text-muted">
            PDF, AI, EPS, PSD, SVG, PNG, JPG, TIFF, CDR, INDD, ZIP · max. {MAX_FILE_SIZE_MB} MB pro Datei · max. {MAX_FILES} Dateien
          </p>
        </div>

        {/* File list */}
        {files.length > 0 && (
          <ul className="mt-3 space-y-2">
            {files.map((file, i) => (
              <li
                key={i}
                className="flex items-center gap-3 px-3 py-2.5 bg-background border border-border rounded-sm text-sm"
              >
                <FileTypeIcon file={file} />
                <span className="flex-1 text-white truncate">{file.name}</span>
                <span className="text-xs text-muted/60 flex-shrink-0 font-mono">
                  {getFileExt(file.name)}
                </span>
                <span className="text-xs text-muted flex-shrink-0">{formatBytes(file.size)}</span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="flex-shrink-0 text-muted hover:text-white transition-colors ml-1"
                  aria-label="Datei entfernen"
                >
                  <X size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Validation errors */}
        {fileErrors.length > 0 && (
          <ul className="mt-2 space-y-1">
            {fileErrors.map((err, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-red-400">
                <AlertCircle size={13} className="flex-shrink-0" />
                {err}
              </li>
            ))}
          </ul>
        )}
      </div>

      {formState === 'error' && (
        <p className="text-red-400 text-sm flex items-center gap-2">
          <AlertCircle size={15} />
          Fehler beim Senden. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt per E-Mail.
        </p>
      )}

      <button
        type="submit"
        disabled={formState === 'submitting'}
        className="w-full px-8 py-4 bg-accent hover:bg-accent-hover disabled:opacity-60 text-white font-bold text-sm uppercase tracking-widest rounded-sm transition-all duration-200 hover:scale-[1.01] active:scale-100"
      >
        {formState === 'submitting' ? 'Wird gesendet...' : 'Angebot anfragen'}
      </button>

      <p className="text-xs text-muted/60 text-center">
        Kostenlos & unverbindlich · Wir antworten innerhalb von 24h
      </p>
    </form>
  )
}
