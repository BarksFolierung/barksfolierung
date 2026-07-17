import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { buildOrder } from '@/lib/order'
import { generateOrderNo, sendPrintDataMail } from '@/lib/mail'
import { fmtEur, getProduct } from '@/lib/shop-products'
import { parseOrderForm, UploadError } from '@/lib/upload'

// Erstellt eine Stripe-Checkout-Session und gibt die Payment-URL zurück.
// Die Bestell-E-Mails werden erst nach erfolgreicher Zahlung vom Webhook versendet.
export async function POST(req: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      return NextResponse.json(
        { success: false, error: 'Online-Zahlung ist derzeit nicht verfügbar. Bitte wählen Sie Vorkasse / Überweisung.' },
        { status: 503 }
      )
    }
    const stripe = new Stripe(secretKey)

    const { payload, attachments } = await parseOrderForm(req)
    if (payload.payment !== 'stripe') {
      return NextResponse.json({ success: false, error: 'invalid payment method' }, { status: 400 })
    }

    const orderNo = generateOrderNo()
    const order = buildOrder(payload, orderNo, false)
    if (!order) {
      return NextResponse.json({ success: false, error: 'invalid order' }, { status: 400 })
    }

    const origin =
      req.headers.get('origin') ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      'https://barksfolierung.de'

    // Positionen als Brutto-Beträge (inkl. 19% MwSt.) in Cent
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = order.items.map((it, i) => {
      const product = getProduct(payload.items[i].productId)
      return {
        quantity: 1,
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(it.netto * 1.19 * 100),
          product_data: {
            name: it.name,
            description: it.config.join(' · ').slice(0, 500),
            // Produktfoto neben der Position auf der Stripe-Checkout-Seite
            images: product ? [`${origin}${product.image}`] : undefined,
          },
        },
      }
    })

    if (order.shippingNetto > 0) {
      lineItems.push({
        quantity: 1,
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(order.shippingNetto * 1.19 * 100),
          product_data: { name: 'Versand', description: 'Versandkostenpauschale' },
        },
      })
    }

    // Warenkorb kompakt in die Metadata legen, damit der Webhook die
    // Bestellung serverseitig rekonstruieren kann (max. 500 Zeichen/Key).
    const metadata: Record<string, string> = {
      orderNo,
      delivery: order.delivery,
      firma:    order.customer.firma ?? '',
      name:     order.customer.name,
      email:    order.customer.email,
      phone:    order.customer.phone ?? '',
      strasse:  order.customer.strasse,
      plz:      order.customer.plz,
      ort:      order.customer.ort,
      notes:    (order.notes ?? '').slice(0, 480),
      itemCount: String(payload.items.length),
      fileCount: String(attachments.length),
    }
    payload.items.forEach((it, i) => {
      const sels = Object.keys(it.sels).sort().map(k => it.sels[Number(k)]).join(';')
      metadata[`item_${i}`] = `${it.productId}|${sels}`.slice(0, 500)
    })

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      customer_email: order.customer.email,
      metadata,
      locale: 'de',
      success_url: `${origin}/bestellung/danke?order=${orderNo}&dateien=${attachments.length}`,
      cancel_url: `${origin}/warenkorb`,
    })

    // Druckdaten sofort per Mail sichern – sie können nicht durch die
    // Stripe-Weiterleitung transportiert werden. Die Bestellbestätigung
    // folgt nach Zahlung über den Webhook (mit Verweis auf diese Mail).
    if (attachments.length > 0) {
      try {
        await sendPrintDataMail(order, attachments)
      } catch (err) {
        console.error('Print data mail failed:', err)
        // Zahlung nicht blockieren – Kunde wird ggf. um erneute Zusendung gebeten
      }
    }

    return NextResponse.json({ success: true, url: session.url, orderNo, total: fmtEur(order.brutto) })
  } catch (error) {
    if (error instanceof UploadError) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }
    console.error('Checkout error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
