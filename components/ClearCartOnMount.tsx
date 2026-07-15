'use client'

import { useEffect } from 'react'
import { useCart } from '@/lib/cart'

// Leert den Warenkorb, sobald die Danke-Seite nach erfolgreicher Bestellung geladen wird.
export default function ClearCartOnMount() {
  const { clearCart } = useCart()
  useEffect(() => { clearCart() }, [clearCart])
  return null
}
