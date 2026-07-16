'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart, Instagram } from 'lucide-react'
import { useCart } from '@/lib/cart'

const navLinks = [
  { href: '/', label: 'Start' },
  { href: '/leistungen', label: 'Leistungen' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/shop', label: 'Shop' },
  { href: '/kontakt', label: 'Kontakt' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const { count } = useCart()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? 'bg-background/95 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center group">
            <span className="text-2xl font-black tracking-tight text-white">
              BARKS<span className="text-accent group-hover:text-white transition-colors">.</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-white'
                    : 'text-muted hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://www.instagram.com/barksfolierung"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={19} />
            </a>
            <Link
              href="/warenkorb"
              className="relative p-2 text-muted hover:text-white transition-colors"
              aria-label="Warenkorb"
            >
              <ShoppingCart size={20} />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-accent text-white text-[10px] font-black rounded-full">
                  {count}
                </span>
              )}
            </Link>
            <Link
              href="/kontakt"
              className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-bold uppercase tracking-wider rounded-sm transition-colors"
            >
              Angebot anfragen
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-1">
          <Link
            href="/warenkorb"
            className="relative p-2 text-white"
            aria-label="Warenkorb"
          >
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-accent text-white text-[10px] font-black rounded-full">
                {count}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-white flex flex-col justify-center gap-1.5 w-8 h-8"
            aria-label="Menü öffnen"
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-0.5 bg-white transition-all duration-300 origin-center ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 bg-white transition-all duration-300 origin-center ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg font-medium py-3 border-b border-border/40 last:border-0 transition-colors ${
                  pathname === link.href ? 'text-accent' : 'text-white hover:text-accent'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/kontakt"
              className="mt-4 px-5 py-3.5 bg-accent text-white text-center font-bold uppercase tracking-wider rounded-sm"
            >
              Angebot anfragen
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
