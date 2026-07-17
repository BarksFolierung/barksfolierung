import { NextRequest, NextResponse } from 'next/server'
import { buildOrder } from '@/lib/order'
import { sendShopOrderMail, sendCustomerOrderMail, generateOrderNo } from '@/lib/mail'
import { parseOrderForm, UploadError } from '@/lib/upload'

// Bestellung per Vorkasse / Überweisung – ohne Online-Zahlung.
// Erwartet multipart/form-data: Feld "payload" (JSON) + optional "files" (Druckdaten).
export async function POST(req: NextRequest) {
  try {
    const { payload, attachments } = await parseOrderForm(req)

    if (payload.payment !== 'vorkasse') {
      return NextResponse.json({ success: false, error: 'invalid payment method' }, { status: 400 })
    }

    const orderNo = generateOrderNo()
    const order = buildOrder(payload, orderNo, false)
    if (!order) {
      return NextResponse.json({ success: false, error: 'invalid order' }, { status: 400 })
    }
    order.filesCount = attachments.length

    await sendShopOrderMail(order, attachments)
    await sendCustomerOrderMail(order)

    return NextResponse.json({ success: true, orderNo })
  } catch (error) {
    if (error instanceof UploadError) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }
    console.error('Order error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
