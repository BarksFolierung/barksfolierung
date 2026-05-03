'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { portfolioItems, categories } from '@/data/portfolio'

interface PortfolioGridProps {
  limit?: number
}

export default function PortfolioGrid({ limit }: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState('Alle')

  const filtered =
    activeCategory === 'Alle'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory)

  const displayed = limit ? filtered.slice(0, limit) : filtered

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm border transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-accent border-accent text-white'
                : 'bg-transparent border-border text-muted hover:border-white/40 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayed.map((item) => (
          <Link
            key={item.id}
            href={`/portfolio/${item.id}`}
            className="group relative aspect-[4/3] bg-surface border border-border rounded-sm overflow-hidden block"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <p className="text-xs text-accent font-bold uppercase tracking-widest mb-1">
                {item.category}
              </p>
              <h3 className="text-white font-bold text-base leading-snug">{item.title}</h3>
              {item.client && (
                <p className="text-white/70 text-xs mt-1">{item.client}</p>
              )}
              <p className="text-white/50 text-xs mt-2">Projekt ansehen →</p>
            </div>

            <div className="absolute top-3 right-3 px-2 py-1 bg-background/80 backdrop-blur-sm rounded-sm text-xs text-muted border border-border/50">
              {item.category}
            </div>
          </Link>
        ))}
      </div>

      {displayed.length === 0 && (
        <div className="text-center py-20 text-muted">
          Keine Projekte in dieser Kategorie gefunden.
        </div>
      )}
    </div>
  )
}
