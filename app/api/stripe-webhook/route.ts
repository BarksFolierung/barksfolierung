import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { buildOrder, type CheckoutPayload, type CheckoutItem } from '@/lib/order'
import { sendShopOrderMail, sendCustomerOrderMail } from '@/lib/mail'

// Stripe-Webhook: versendet nach erfolgreicher Zahlung die Bestell-E-Mails.
// In Stripe unter Entwickler → Webhooks anlegen: Endpoint
//   https://barksfolierung.de/api/stripe-webhook
// Event: checkout.session.completed – Signing Secret als STRIPE_WEBHOOK_SECRET setzen.
export async function POST(req: NextRequest) {
  const secretKey     = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secretKey || !webhookSecret) {
    return NextResponse.json({ error: 'not configured' }, { status: 503 })
  }

  const stripe = new Stripe(secretKey)
  const signature = req.headers.get('stripe-signature')
  if (!signature) return NextResponse.json({ error: 'missing signature' }, { status: 400 })

  let event: Stripe.Event
  try {
    const rawBody = await req.text()
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const m = session.metadata ?? {}

    try {
      const itemCount = parseInt(m.itemCount ?? '0', 10)
      const items: CheckoutItem[] = []
      for (let i = 0; i < itemCount; i++) {
        const raw = m[`item_${i}`]
        if (!raw) continue
        const [productId, selsRaw] = raw.split('|')
        const sels: Record<number, string> = {}
        selsRaw.split(';').forEach((id, idx) => { sels[idx] = id })
        items.push({ productId, sels })
      }

      const payload: CheckoutPayload = {
        items,
        customer: {
          firma:   m.firma || undefined,
          name:    m.name ?? '',
          email:   m.email ?? session.customer_email ?? '',
          phone:   m.phone || undefined,
          strasse: m.strasse ?? '',
          plz:     m.plz ?? '',
          ort:     m.ort ?? '',
        },
        delivery: (m.delivery as 'versand' | 'abholung') ?? 'versand',
        payment: 'stripe',
        notes: m.notes || undefined,
      }

      const order = buildOrder(payload, m.orderNo ?? session.id, true)
      if (order) {
        order.filesCount = parseInt(m.fileCount ?? '0', 10) || 0
        await sendShopOrderMail(order)
        await sendCustomerOrderMail(order)
      } else {
        console.error('Webhook: could not rebuild order from metadata', m)
      }
    } catch (err) {
      console.error('Webhook processing error:', err)
      // 200 zurückgeben, damit Stripe nicht endlos erneut zustellt –
      // die Zahlung selbst ist im Stripe-Dashboard sichtbar.
    }
  }

  return NextResponse.json({ received: true })
}
