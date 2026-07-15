import {
  getProduct, calcPrice, validSelections, configLines,
  shippingNetto, VAT_RATE,
} from '@/lib/shop-products'
import type { OrderInfo, OrderCustomer } from '@/lib/mail'

export type CheckoutItem = { productId: string; sels: Record<number, string> }

export type CheckoutPayload = {
  items: CheckoutItem[]
  customer: OrderCustomer
  delivery: 'versand' | 'abholung'
  payment: 'stripe' | 'vorkasse'
  notes?: string
}

/**
 * Baut eine validierte Bestellung aus dem Client-Payload.
 * Preise werden hier serverseitig aus den Produktdaten neu berechnet.
 * Gibt null zurück, wenn der Payload ungültig ist.
 */
export function buildOrder(
  payload: CheckoutPayload,
  orderNo: string,
  paid: boolean
): OrderInfo | null {
  const { items, customer, delivery, payment } = payload

  if (!Array.isArray(items) || items.length === 0 || items.length > 30) return null
  if (delivery !== 'versand' && delivery !== 'abholung') return null
  if (payment !== 'stripe' && payment !== 'vorkasse') return null
  if (!customer?.name || !customer?.email || !customer?.strasse || !customer?.plz || !customer?.ort) return null

  const orderItems: OrderInfo['items'] = []
  for (const it of items) {
    const product = getProduct(it.productId)
    if (!product || !product.purchasable || !validSelections(product, it.sels)) return null
    orderItems.push({
      name: product.name,
      config: configLines(product, it.sels),
      netto: calcPrice(product, it.sels),
    })
  }

  const subtotalNetto = orderItems.reduce((s, it) => s + it.netto, 0)
  const shipNetto     = shippingNetto(subtotalNetto, delivery)
  const totalNetto    = subtotalNetto + shipNetto
  const mwst          = Math.round(totalNetto * VAT_RATE * 100) / 100
  const brutto        = Math.round(totalNetto * (1 + VAT_RATE) * 100) / 100

  return {
    orderNo,
    items: orderItems,
    subtotalNetto,
    shippingNetto: shipNetto,
    mwst,
    brutto,
    delivery,
    payment,
    paid,
    customer: {
      firma:   customer.firma?.toString().slice(0, 200) || undefined,
      name:    customer.name.toString().slice(0, 200),
      email:   customer.email.toString().slice(0, 200),
      phone:   customer.phone?.toString().slice(0, 60) || undefined,
      strasse: customer.strasse.toString().slice(0, 200),
      plz:     customer.plz.toString().slice(0, 10),
      ort:     customer.ort.toString().slice(0, 100),
    },
    notes: payload.notes?.toString().slice(0, 2000) || undefined,
  }
}
