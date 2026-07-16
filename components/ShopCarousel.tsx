'use client'

import Link from 'next/link'
import Image from 'next/image'

const ITEMS = [
  { id: 'flyer',            name: 'Flyer',              image: '/products/flyer.png',              price: 62  },
  { id: 'visitenkarten',    name: 'Visitenkarten',       image: '/products/visitenkarten.png',       price: 59  },
  { id: 'poster',           name: 'Poster',              image: '/products/poster.png',              price: 8   },
  { id: 'aufkleber',        name: 'Aufkleber',           image: '/products/aufkleber.png',           price: 29  },
  { id: 'broschuere',       name: 'Broschüren',          image: '/products/broschueren.png',         price: 89  },
  { id: 'postkarten',       name: 'Postkarten',          image: '/products/postkarten.png',          price: 35  },
  { id: 'banner',           name: 'Banner',              image: '/products/banner.png',              price: 49  },
  { id: 'rollup',           name: 'Roll-Up',             image: '/products/rollup.png',              price: 109 },
  { id: 'pvcsign',          name: 'PVC-Schild',          image: '/products/pvc_schild.png',          price: 45  },
  { id: 'fensterfolie',     name: 'Fensterfolie',        image: '/products/fensterfolie.png',        price: 79  },
  { id: 'autobeschriftung', name: 'Autobeschriftung',    image: '/products/autobeschriftung.png',    price: 89  },
  { id: 'sonnenschutz',     name: 'Sonnenschutzfolie',   image: '/products/sonnenschutzfolie.png',   price: 79  },
  { id: 'fensterbeschrif',  name: 'Fensterbeschriftung', image: '/products/fensterbeschriftung.png', price: 89  },
  { id: 'tshirt',           name: 'T-Shirts',            image: '/products/tshirt.png',              price: 149 },
  { id: 'hoodie',           name: 'Hoodie',              image: '/products/hoodie.png',              price: 229 },
  { id: 'arbeit',           name: 'Arbeitsbekleidung',   image: '/products/arbeitsbekleidung.png',   price: 189 },
  { id: 'tassen',           name: 'Werbetassen',         image: '/products/werbetassen.png',         price: 79  },
  { id: 'kugelschreiber',   name: 'Kugelschreiber',      image: '/products/kugelschreiber.png',      price: 49  },
  { id: 'untersetzer',      name: 'Untersetzer',         image: '/products/untersetzer.png',         price: 59  },
  { id: 'speisekarten',     name: 'Speisekarten',        image: '/products/speisekarten.png',        price: 89  },
]

export default function ShopCarousel() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <section className="py-20 overflow-hidden bg-surface/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">Online-Shop</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">Produkte bestellen</h2>
            <p className="text-muted mt-3 max-w-xl text-base leading-relaxed">
              Format konfigurieren, Menge wählen, Angebot anfragen – wir melden uns in 24 Stunden.
            </p>
          </div>
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-2 px-6 py-3 border border-border hover:border-accent text-sm font-bold uppercase tracking-widest rounded-sm transition-colors whitespace-nowrap"
          >
            Alle Produkte →
          </Link>
        </div>
      </div>

      {/* Carousel track with fade masks */}
      <div className="relative">
        {/* left fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
          style={{ background: 'linear-gradient(to right, #0D0D0D, transparent)' }} />
        {/* right fade */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
          style={{ background: 'linear-gradient(to left, #0D0D0D, transparent)' }} />

        <div className="flex animate-scroll-left" style={{ width: 'max-content' }}>
          {doubled.map((item, i) => (
            <Link
              key={`${item.id}-${i}`}
              href="/shop"
              className="group flex-shrink-0 w-52 mx-3 bg-surface border border-border rounded-sm overflow-hidden hover:border-accent transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative w-full h-36 overflow-hidden bg-[#111]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="208px"
                />
              </div>
              <div className="p-3">
                <div className="text-sm font-bold leading-tight mb-1">{item.name}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted">ab</div>
                <div className="text-lg font-black text-accent">{Math.round(item.price * 1.19)} €</div>
                <div className="text-[10px] text-muted">inkl. 19% MwSt.</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="text-center mt-8 sm:hidden">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:border-accent text-sm font-bold uppercase tracking-widest rounded-sm transition-colors"
        >
          Alle Produkte →
        </Link>
      </div>
    </section>
  )
}
