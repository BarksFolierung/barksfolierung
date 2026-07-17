import nodemailer from 'nodemailer'
import { fmtEur } from '@/lib/shop-products'

export const SHOP_EMAIL = 'barkssinfo@gmail.com'

export function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })
}

// ─── Bestellungen ─────────────────────────────────────────────────────────────

export type OrderCustomer = {
  firma?: string
  name: string
  email: string
  phone?: string
  strasse: string
  plz: string
  ort: string
}

export type OrderInfo = {
  orderNo: string
  items: { name: string; config: string[]; netto: number }[]
  subtotalNetto: number
  shippingNetto: number
  mwst: number
  brutto: number
  delivery: 'versand' | 'abholung'
  payment: 'stripe' | 'vorkasse'
  paid: boolean
  customer: OrderCustomer
  notes?: string
  /** Anzahl der beim Checkout hochgeladenen Druckdateien (0 = keine). */
  filesCount?: number
}

export type MailAttachment = { filename: string; content: Buffer }

const DELIVERY_LABEL = { versand: 'Versand', abholung: 'Abholung in Appen' }
const PAYMENT_LABEL  = { stripe: 'Online-Zahlung (Stripe)', vorkasse: 'Vorkasse / Überweisung' }

function bankDetailsHtml(): string {
  const holder = process.env.SHOP_BANK_HOLDER
  const iban   = process.env.SHOP_BANK_IBAN
  if (!holder || !iban) {
    return `<p>Unsere Bankverbindung erhalten Sie in Kürze mit der Rechnung per E-Mail.</p>`
  }
  return `
    <table style="border-collapse: collapse;">
      <tr><td style="padding: 4px 16px 4px 0; color: #666;">Kontoinhaber</td><td style="padding: 4px 0;">${holder}</td></tr>
      <tr><td style="padding: 4px 16px 4px 0; color: #666;">IBAN</td><td style="padding: 4px 0;"><strong>${iban}</strong></td></tr>
      ${process.env.SHOP_BANK_BIC  ? `<tr><td style="padding: 4px 16px 4px 0; color: #666;">BIC</td><td style="padding: 4px 0;">${process.env.SHOP_BANK_BIC}</td></tr>` : ''}
      ${process.env.SHOP_BANK_NAME ? `<tr><td style="padding: 4px 16px 4px 0; color: #666;">Bank</td><td style="padding: 4px 0;">${process.env.SHOP_BANK_NAME}</td></tr>` : ''}
    </table>`
}

function itemsTableHtml(order: OrderInfo): string {
  const rows = order.items.map(it => `
    <tr>
      <td style="padding: 10px 12px; border-bottom: 1px solid #eee; vertical-align: top;">
        <strong>${it.name}</strong><br>
        <span style="color: #666; font-size: 13px;">${it.config.join('<br>')}</span>
      </td>
      <td style="padding: 10px 12px; border-bottom: 1px solid #eee; text-align: right; white-space: nowrap; vertical-align: top;">
        ${fmtEur(it.netto)}
      </td>
    </tr>`).join('')

  return `
    <table style="width: 100%; border-collapse: collapse; background: #fafafa; border-radius: 4px;">
      ${rows}
      <tr>
        <td style="padding: 8px 12px; color: #666;">Zwischensumme (netto)</td>
        <td style="padding: 8px 12px; text-align: right;">${fmtEur(order.subtotalNetto)}</td>
      </tr>
      <tr>
        <td style="padding: 4px 12px; color: #666;">${DELIVERY_LABEL[order.delivery]}${order.shippingNetto === 0 ? ' (kostenlos)' : ''}</td>
        <td style="padding: 4px 12px; text-align: right;">${fmtEur(order.shippingNetto)}</td>
      </tr>
      <tr>
        <td style="padding: 4px 12px; color: #666;">zzgl. 19% MwSt.</td>
        <td style="padding: 4px 12px; text-align: right;">${fmtEur(order.mwst)}</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; border-top: 2px solid #ddd;"><strong>Gesamtbetrag (brutto)</strong></td>
        <td style="padding: 10px 12px; border-top: 2px solid #ddd; text-align: right;"><strong style="font-size: 17px;">${fmtEur(order.brutto)}</strong></td>
      </tr>
    </table>`
}

function customerBlockHtml(c: OrderCustomer): string {
  return `
    <p style="background: #f5f5f5; padding: 12px; border-radius: 4px; line-height: 1.7;">
      ${c.firma ? `${c.firma}<br>` : ''}
      ${c.name}<br>
      ${c.strasse}<br>
      ${c.plz} ${c.ort}<br>
      <a href="mailto:${c.email}">${c.email}</a>${c.phone ? `<br>${c.phone}` : ''}
    </p>`
}

/** E-Mail an den Shop-Betreiber. */
export async function sendShopOrderMail(order: OrderInfo, attachments: MailAttachment[] = []) {
  const transporter = createTransporter()
  const status = order.paid
    ? '✅ BEZAHLT (Stripe)'
    : order.payment === 'vorkasse' ? '⏳ Vorkasse – Zahlung ausstehend' : '⏳ Zahlung ausstehend'

  const filesInfo = attachments.length > 0
    ? `<p><strong>Druckdaten:</strong> ${attachments.length} Datei(en) im Anhang dieser E-Mail.</p>`
    : order.filesCount && order.filesCount > 0
      ? `<p><strong>Druckdaten:</strong> ${order.filesCount} Datei(en) wurden bereits per separater E-Mail „Druckdaten zu Bestellung ${order.orderNo}" zugestellt.</p>`
      : `<p><strong>Druckdaten:</strong> Keine Dateien hochgeladen – Kunde wurde gebeten, sie per E-Mail nachzureichen.</p>`

  await transporter.sendMail({
    from: `"BARKS Folierung Shop" <${process.env.GMAIL_USER}>`,
    to: SHOP_EMAIL,
    replyTo: order.customer.email,
    subject: `🛒 Neue Bestellung ${order.orderNo} – ${fmtEur(order.brutto)} – ${order.customer.name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 620px; margin: 0 auto;">
        <h2 style="border-bottom: 2px solid #e5e5e5; padding-bottom: 10px;">
          Neue Bestellung ${order.orderNo}
        </h2>
        <p style="font-size: 15px;"><strong>Status:</strong> ${status}<br>
        <strong>Zahlungsart:</strong> ${PAYMENT_LABEL[order.payment]}<br>
        <strong>Lieferung:</strong> ${DELIVERY_LABEL[order.delivery]}</p>
        <h3>Positionen</h3>
        ${itemsTableHtml(order)}
        <h3>Kunde</h3>
        ${customerBlockHtml(order.customer)}
        ${filesInfo}
        ${order.notes ? `<h3>Anmerkungen</h3><p style="background: #f5f5f5; padding: 12px; border-radius: 4px; white-space: pre-wrap;">${order.notes}</p>` : ''}
        <hr style="margin-top: 30px; border: none; border-top: 1px solid #e5e5e5;" />
        <p style="color: #aaa; font-size: 12px;">Bestellung über den Shop auf barksfolierung.de</p>
      </div>`,
    attachments,
  })
}

/**
 * Separate Druckdaten-Mail an den Shop – wird beim Stripe-Checkout verschickt,
 * da die Dateien nicht durch die Zahlungs-Weiterleitung transportiert werden können.
 */
export async function sendPrintDataMail(order: OrderInfo, attachments: MailAttachment[]) {
  if (attachments.length === 0) return
  const transporter = createTransporter()
  await transporter.sendMail({
    from: `"BARKS Folierung Shop" <${process.env.GMAIL_USER}>`,
    to: SHOP_EMAIL,
    replyTo: order.customer.email,
    subject: `📎 Druckdaten zu Bestellung ${order.orderNo} – ${order.customer.name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 620px; margin: 0 auto;">
        <h2 style="border-bottom: 2px solid #e5e5e5; padding-bottom: 10px;">
          Druckdaten zu Bestellung ${order.orderNo}
        </h2>
        <p>Der Kunde <strong>${order.customer.name}</strong> (${order.customer.email}) hat beim
        Checkout ${attachments.length} Druckdatei(en) hochgeladen – siehe Anhang.</p>
        <p>Die Online-Zahlung wurde soeben gestartet. Die Bestellbestätigung mit allen Details
        folgt automatisch, sobald die Zahlung abgeschlossen ist. Sollte keine
        Bestellbestätigung eintreffen, wurde die Zahlung abgebrochen – diese Druckdaten können
        dann ignoriert werden.</p>
        <hr style="margin-top: 30px; border: none; border-top: 1px solid #e5e5e5;" />
        <p style="color: #aaa; font-size: 12px;">Bestellung über den Shop auf barksfolierung.de</p>
      </div>`,
    attachments,
  })
}

/** Bestellbestätigung an den Kunden. */
export async function sendCustomerOrderMail(order: OrderInfo) {
  const transporter = createTransporter()

  const paymentBlock = order.payment === 'vorkasse'
    ? `
      <h3>Zahlung per Überweisung</h3>
      <p>Bitte überweisen Sie den Gesamtbetrag von <strong>${fmtEur(order.brutto)}</strong> unter
      Angabe der Bestellnummer <strong>${order.orderNo}</strong> auf folgendes Konto:</p>
      ${bankDetailsHtml()}
      <p>Ihre Bestellung wird nach Zahlungseingang produziert.</p>`
    : `
      <h3>Zahlung</h3>
      <p>Ihre Zahlung über <strong>${fmtEur(order.brutto)}</strong> ist bei uns eingegangen. Vielen Dank!</p>`

  await transporter.sendMail({
    from: `"BARKS Folierung" <${process.env.GMAIL_USER}>`,
    to: order.customer.email,
    replyTo: SHOP_EMAIL,
    subject: `Ihre Bestellung ${order.orderNo} bei BARKS Folierung`,
    html: `
      <div style="font-family: sans-serif; max-width: 620px; margin: 0 auto;">
        <h2 style="border-bottom: 2px solid #e5e5e5; padding-bottom: 10px;">
          Vielen Dank für Ihre Bestellung!
        </h2>
        <p>Hallo ${order.customer.name},</p>
        <p>wir haben Ihre Bestellung <strong>${order.orderNo}</strong> erhalten.
        Hier Ihre Übersicht:</p>
        ${itemsTableHtml(order)}
        <p><strong>Lieferung:</strong> ${DELIVERY_LABEL[order.delivery]}</p>
        ${paymentBlock}
        <h3>Druckdaten</h3>
        ${order.filesCount && order.filesCount > 0
          ? `<p>Ihre ${order.filesCount} hochgeladene(n) Druckdatei(en) haben wir erhalten –
        Sie müssen nichts weiter tun. Falls wir Rückfragen zu den Daten haben, melden wir uns.</p>`
          : `<p>Bitte senden Sie uns Ihre Druckdaten (PDF, AI/EPS oder PNG/TIFF ab 150 dpi) als Antwort
        auf diese E-Mail – mit Angabe Ihrer Bestellnummer <strong>${order.orderNo}</strong>.
        Sie haben keine fertigen Druckdaten? Kein Problem, wir unterstützen Sie gern beim Design.</p>`}
        <p>Bei Fragen erreichen Sie uns unter
        <a href="mailto:info@barksfolierung.de">info@barksfolierung.de</a> oder
        <a href="tel:+491722868584">+49 172 2868584</a>.</p>
        <p>Ihr Team von BARKS Folierung</p>
        <hr style="margin-top: 30px; border: none; border-top: 1px solid #e5e5e5;" />
        <p style="color: #aaa; font-size: 12px;">
          Barks Folierung · Appener Str. 34 · 25482 Appen · barksfolierung.de
        </p>
      </div>`,
  })
}

export function generateOrderNo(): string {
  const d = new Date()
  const date = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `BF-${date}-${rand}`
}
