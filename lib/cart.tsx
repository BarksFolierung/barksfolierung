'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { getProduct, calcPrice, validSelections } from '@/lib/shop-products'

export type CartItem = {
  key: string                     // eindeutige ID im Warenkorb
  productId: string
  sels: Record<number, string>    // gewählte Options-IDs je Schritt
}

type CartCtx = {
  items: CartItem[]
  addItem: (productId: string, sels: Record<number, string>) => void
  removeItem: (key: string) => void
  clearCart: () => void
  subtotalNetto: number
  count: number
}

const Ctx = createContext<CartCtx | null>(null)
const STORAGE_KEY = 'barks-cart-v1'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed: CartItem[] = JSON.parse(raw)
        // Nur Einträge behalten, die noch zu gültigen Produkten/Optionen gehören
        setItems(parsed.filter(it => {
          const p = getProduct(it.productId)
          return p && p.purchasable && validSelections(p, it.sels)
        }))
      }
    } catch { /* korrupten Storage ignorieren */ }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, loaded])

  const addItem = useCallback((productId: string, sels: Record<number, string>) => {
    setItems(prev => [...prev, {
      key: `${productId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      productId,
      sels,
    }])
  }, [])

  const removeItem = useCallback((key: string) => {
    setItems(prev => prev.filter(it => it.key !== key))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const subtotalNetto = items.reduce((sum, it) => {
    const p = getProduct(it.productId)
    return p ? sum + calcPrice(p, it.sels) : sum
  }, 0)

  return (
    <Ctx.Provider value={{ items, addItem, removeItem, clearCart, subtotalNetto, count: items.length }}>
      {children}
    </Ctx.Provider>
  )
}

export function useCart(): CartCtx {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
