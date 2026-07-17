import type { MailAttachment } from '@/lib/mail'
import type { CheckoutPayload } from '@/lib/order'

// Netlify Functions erlauben max. ~6 MB Request-Body – Limit mit Puffer für
// Multipart-Overhead. Muss zum Client-Limit in CartClient.tsx passen.
export const MAX_UPLOAD_TOTAL_BYTES = 4 * 1024 * 1024
export const MAX_UPLOAD_FILES = 5

const ALLOWED_EXTENSIONS = ['pdf', 'ai', 'eps', 'png', 'tif', 'tiff', 'jpg', 'jpeg', 'svg', 'zip']

/** Validierungsfehler beim Datei-Upload – wird als 400 mit Meldung an den Client gegeben. */
export class UploadError extends Error {}

/**
 * Liest Bestell-Payload + Druckdateien aus einer Multipart-FormData-Anfrage.
 * Wirft bei ungültigen Dateien (Größe/Anzahl/Typ) einen Error.
 */
export async function parseOrderForm(req: Request): Promise<{
  payload: CheckoutPayload
  attachments: MailAttachment[]
}> {
  const form = await req.formData()
  const payload = JSON.parse(form.get('payload')?.toString() ?? '{}') as CheckoutPayload

  const files = form.getAll('files').filter(
    (f): f is File => f instanceof File && !!f.name && f.size > 0
  )

  if (files.length > MAX_UPLOAD_FILES) {
    throw new UploadError(`Maximal ${MAX_UPLOAD_FILES} Dateien möglich.`)
  }

  let total = 0
  const attachments: MailAttachment[] = []
  for (const f of files) {
    total += f.size
    if (total > MAX_UPLOAD_TOTAL_BYTES) {
      throw new UploadError('Die Dateien sind zusammen zu groß (max. 4 MB). Bitte senden Sie große Druckdaten nach der Bestellung per E-Mail.')
    }
    const ext = f.name.split('.').pop()?.toLowerCase() ?? ''
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      throw new UploadError(`Dateityp .${ext} wird nicht unterstützt. Erlaubt: PDF, AI, EPS, PNG, TIFF, JPG, SVG, ZIP.`)
    }
    attachments.push({
      filename: f.name.slice(0, 200),
      content: Buffer.from(await f.arrayBuffer()),
    })
  }

  return { payload, attachments }
}
