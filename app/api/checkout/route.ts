import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { buildOrder, type CheckoutPayload } from '@/lib/order'
import { generateOrderNo } from '@/lib/mail'
import { fmtEur } from '@/lib/shop-products'

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

    const payload = (await req.json()) as CheckoutPayload
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
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = order.items.map(it => ({
      quantity: 1,
      price_data: {
        currency: 'eur',
        unit_amount: Math.round(it.netto * 1.19 * 100),
        product_data: {
          name: it.name,
          description: it.config.join(' · ').slice(0, 500),
        },
      },
    }))

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
      success_url: `${origin}/bestellung/danke?order=${orderNo}`,
      cancel_url: `${origin}/warenkorb`,
    })

    return NextResponse.json({ success: true, url: session.url, orderNo, total: fmtEur(order.brutto) })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
