import { NextRequest, NextResponse } from 'next/server'
import { buildOrder, type CheckoutPayload } from '@/lib/order'
import { sendShopOrderMail, sendCustomerOrderMail, generateOrderNo } from '@/lib/mail'

// Bestellung per Vorkasse / Überweisung – ohne Online-Zahlung.
export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as CheckoutPayload

    if (payload.payment !== 'vorkasse') {
      return NextResponse.json({ success: false, error: 'invalid payment method' }, { status: 400 })
    }

    const orderNo = generateOrderNo()
    const order = buildOrder(payload, orderNo, false)
    if (!order) {
      return NextResponse.json({ success: false, error: 'invalid order' }, { status: 400 })
    }

    await sendShopOrderMail(order)
    await sendCustomerOrderMail(order)

    return NextResponse.json({ success: true, orderNo })
  } catch (error) {
    console.error('Order error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
