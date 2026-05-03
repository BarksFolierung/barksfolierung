'use client'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { portfolioItems } from '@/data/portfolio'

export default function ProjectPage({ params }: { params: { id: string } }) {
  const item = portfolioItems.find((p) => p.id === params.id)
  if (!item) notFound()

  const [activeImage, setActiveImage] = useState(0)

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link
        href="/portfolio"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted hover:text-white transition-colors mb-10"
      >
        ← Zurück zum Portfolio
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Main image */}
        <div>
          <div className="relative aspect-[4/3] bg-surface border border-border rounded-sm overflow-hidden mb-3">
            <Image
              src={item.images[activeImage]}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Thumbnail strip */}
          {item.images.length > 1 && (
            <div className="flex gap-2 flex-wrap">
              {item.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-16 h-16 rounded-sm overflow-hidden border-2 transition-all ${
                    activeImage === i ? 'border-accent' : 'border-border hover:border-white/40'
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${item.title} Foto ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Project info */}
        <div className="flex flex-col justify-center">
          <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
            {item.category}
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">{item.title}</h1>

          {item.client && (
            <p className="text-muted text-sm mb-6">
              <span className="uppercase tracking-wider text-xs font-bold text-muted/60 mr-2">Kunde</span>
              {item.client}
            </p>
          )}

          <p className="text-muted leading-relaxed text-base mb-8">{item.description}</p>

          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-bold uppercase tracking-wider border border-border text-muted rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-bold text-sm uppercase tracking-widest rounded-sm transition-colors self-start"
          >
            Ähnliches Projekt anfragen
          </Link>
        </div>
      </div>

      {/* Full image gallery */}
      {item.images.length > 1 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted mb-6">
            Alle Fotos
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {item.images.map((src, i) => (
              <button
                key={i}
                onClick={() => { setActiveImage(i); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                className="relative aspect-[4/3] bg-surface border border-border rounded-sm overflow-hidden group"
              >
                <Image
                  src={src}
                  alt={`${item.title} Foto ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
