'use client'

import { useState } from 'react'
import { X, ChevronRight, ChevronLeft } from 'lucide-react'

// ─── Types ─────────────────────────────────────────────────────────────────────
type Opt     = { id: string; label: string; sub: string; p: number }
type PStep   = { key: string; opts: Opt[] }
type Product = {
  id: string; cat: string; image: string; name: string
  specs: string[]; basePrice: number; steps: PStep[]
}

const CATS = [
  { id: 'all',    label: 'Alle' },
  { id: 'print',  label: 'Druckprodukte' },
  { id: 'sign',   label: 'Werbung & Großformat' },
  { id: 'textil', label: 'Textilien' },
  { id: 'promo',  label: 'Werbeartikel' },
  { id: 'gastro', label: 'Gastronomie & Events' },
]

const STEP_TITLES = ['Format & Größe wählen', 'Menge wählen', 'Material & Veredelung']
const STEP_LABELS = ['Format / Größe', 'Menge', 'Material']

// Unsplash image helper
const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`

// ─── Product Catalogue ────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  // ── PRINT ──
  {
    id: 'flyer', cat: 'print',
    image: '/products/flyer.png',
    name: 'Flyer',
    specs: ['DIN A6 bis DIN A4', 'Offset- & Digitaldruck', '135g – 350g Papier', 'ab 100 Stück'],
    basePrice: 19,
    steps: [
      { key: 'format', opts: [
        { id: 'a6',   label: 'DIN A6',   sub: '105 × 148 mm', p: 0  },
        { id: 'lang', label: 'DIN lang', sub: '99 × 210 mm',  p: 5  },
        { id: 'a5',   label: 'DIN A5',   sub: '148 × 210 mm', p: 8  },
        { id: 'a4',   label: 'DIN A4',   sub: '210 × 297 mm', p: 18 },
      ]},
      { key: 'qty', opts: [
        { id: '100',  label: '100 Stk.',   sub: '',           p: 0   },
        { id: '250',  label: '250 Stk.',   sub: '',           p: 12  },
        { id: '500',  label: '500 Stk.',   sub: 'Bestseller', p: 22  },
        { id: '1000', label: '1.000 Stk.', sub: '',           p: 35  },
        { id: '2500', label: '2.500 Stk.', sub: '',           p: 65  },
        { id: '5000', label: '5.000 Stk.', sub: 'Vorteil',    p: 100 },
      ]},
      { key: 'material', opts: [
        { id: 'std',   label: '135g Standard',   sub: 'Bilderdruckpapier', p: 0  },
        { id: 'prem',  label: '170g Premium',    sub: 'Hochwertig',        p: 6  },
        { id: 'matt',  label: 'Mattelaminiert',  sub: 'Edel & stilvoll',   p: 12 },
        { id: 'glanz', label: 'Glanzlaminiert',  sub: 'Farbintensiv',      p: 12 },
        { id: 'eco',   label: 'Recyclingpapier', sub: 'Umweltfreundlich',  p: 3  },
      ]},
    ],
  },
  {
    id: 'visitenkarten', cat: 'print',
    image: '/products/visitenkarten.png',
    name: 'Visitenkarten',
    specs: ['85 × 55 mm · Portrait mögl.', 'Ein- oder beidseitig', '300g – 600g Karton', 'ab 100 Stück'],
    basePrice: 9,
    steps: [
      { key: 'format', opts: [
        { id: 'quer', label: 'Querformat',  sub: '85 × 55 mm', p: 0 },
        { id: 'hoch', label: 'Hochformat',  sub: '55 × 85 mm', p: 0 },
        { id: 'quad', label: 'Quadratisch', sub: '55 × 55 mm', p: 2 },
      ]},
      { key: 'qty', opts: [
        { id: '100',  label: '100 Stk.',   sub: '',           p: 0  },
        { id: '250',  label: '250 Stk.',   sub: '',           p: 7  },
        { id: '500',  label: '500 Stk.',   sub: 'Bestseller', p: 14 },
        { id: '1000', label: '1.000 Stk.', sub: '',           p: 22 },
        { id: '2000', label: '2.000 Stk.', sub: '',           p: 38 },
      ]},
      { key: 'material', opts: [
        { id: '300',   label: '300g Karton',    sub: 'Standard',     p: 0  },
        { id: 'matt',  label: 'Mattelaminiert', sub: 'Softer Look',  p: 8  },
        { id: 'glanz', label: 'Glanzlaminiert', sub: 'Brilliant',    p: 8  },
        { id: 'soft',  label: 'Soft-Touch',     sub: 'Exklusiv',     p: 14 },
        { id: 'black', label: 'Black Core',     sub: 'Luxus',        p: 18 },
        { id: 'trans', label: 'Transparent',    sub: 'Durchsichtig', p: 22 },
      ]},
    ],
  },
  {
    id: 'poster', cat: 'print',
    image: '/products/poster.png',
    name: 'Poster',
    specs: ['DIN A3 bis DIN A0', '170g – 200g Papier', 'Indoor & Outdoor', 'Einzeldruck möglich'],
    basePrice: 15,
    steps: [
      { key: 'format', opts: [
        { id: 'a3', label: 'DIN A3', sub: '297 × 420 mm',  p: 0  },
        { id: 'a2', label: 'DIN A2', sub: '420 × 594 mm',  p: 8  },
        { id: 'a1', label: 'DIN A1', sub: '594 × 841 mm',  p: 20 },
        { id: 'a0', label: 'DIN A0', sub: '841 × 1189 mm', p: 45 },
      ]},
      { key: 'qty', opts: [
        { id: '1',   label: '1 Stk.',   sub: 'Einzeldruck', p: 0   },
        { id: '5',   label: '5 Stk.',   sub: '',            p: 12  },
        { id: '10',  label: '10 Stk.',  sub: '',            p: 22  },
        { id: '25',  label: '25 Stk.',  sub: '',            p: 48  },
        { id: '50',  label: '50 Stk.',  sub: '',            p: 85  },
        { id: '100', label: '100 Stk.', sub: '',            p: 140 },
      ]},
      { key: 'material', opts: [
        { id: 'std',    label: '170g Plakat',     sub: 'Standard',   p: 0  },
        { id: 'photo',  label: '200g Photopapier',sub: 'Hochglanz',  p: 8  },
        { id: 'pvc',    label: 'PVC Folie',       sub: 'Wetterfest', p: 18 },
        { id: 'textil', label: 'Textilposter',    sub: 'Stoff-Optik',p: 25 },
      ]},
    ],
  },
  {
    id: 'aufkleber', cat: 'print',
    image: '/products/aufkleber.png',
    name: 'Aufkleber',
    specs: ['Freie Formen & Größen', 'Innen- & Außenkleber', 'Transparent, Matt, Glanz', 'ab 50 Stück'],
    basePrice: 12,
    steps: [
      { key: 'format', opts: [
        { id: 'a7',     label: 'A7 (50×74mm)',   sub: 'Klein',      p: 0  },
        { id: 'a6',     label: 'A6 (74×105mm)',  sub: 'Standard',   p: 6  },
        { id: 'a5',     label: 'A5 (105×148mm)', sub: 'Groß',       p: 14 },
        { id: 'custom', label: 'Sonderformat',   sub: 'Freie Maße', p: 10 },
      ]},
      { key: 'qty', opts: [
        { id: '50',   label: '50 Stk.',    sub: '',           p: 0  },
        { id: '100',  label: '100 Stk.',   sub: '',           p: 8  },
        { id: '250',  label: '250 Stk.',   sub: 'Bestseller', p: 18 },
        { id: '500',  label: '500 Stk.',   sub: '',           p: 30 },
        { id: '1000', label: '1.000 Stk.', sub: '',           p: 50 },
      ]},
      { key: 'material', opts: [
        { id: 'weiss',   label: 'Weiß matt',      sub: 'Standard',            p: 0  },
        { id: 'glanz',   label: 'Glänzend',        sub: 'Farbintensiv',        p: 3  },
        { id: 'trans',   label: 'Transparent',     sub: 'Unsichtbarer Rand',   p: 6  },
        { id: 'outdoor', label: 'Outdoor UV',      sub: 'Witterungsbeständig', p: 8  },
        { id: 'boden',   label: 'Bodenaufkleber',  sub: 'Rutschsicher',        p: 18 },
      ]},
    ],
  },
  {
    id: 'broschuere', cat: 'print',
    image: '/products/broschueren.png',
    name: 'Broschüren',
    specs: ['DIN A5 & A4', '8 bis 64 Seiten', 'Klebe- oder Heftbindung', 'ab 50 Stück'],
    basePrice: 39,
    steps: [
      { key: 'format', opts: [
        { id: 'a5', label: 'DIN A5', sub: '148 × 210 mm', p: 0  },
        { id: 'a4', label: 'DIN A4', sub: '210 × 297 mm', p: 18 },
      ]},
      { key: 'qty', opts: [
        { id: '50',  label: '50 Stk.',  sub: '',           p: 0   },
        { id: '100', label: '100 Stk.', sub: '',           p: 28  },
        { id: '250', label: '250 Stk.', sub: 'Bestseller', p: 65  },
        { id: '500', label: '500 Stk.', sub: '',           p: 115 },
      ]},
      { key: 'material', opts: [
        { id: 'heft',  label: 'Klammerheftung', sub: '8–48 Seiten', p: 0  },
        { id: 'klebe', label: 'Klebebindung',   sub: 'ab 40 Seiten',p: 12 },
        { id: 'hard',  label: 'Hardcover',      sub: 'Premium',     p: 35 },
      ]},
    ],
  },
  {
    id: 'postkarten', cat: 'print',
    image: '/products/postkarten.png',
    name: 'Postkarten',
    specs: ['DIN A6 od. A5', '300g – 400g Karton', 'Ein- od. beidseitig', 'ab 100 Stück'],
    basePrice: 14,
    steps: [
      { key: 'format', opts: [
        { id: 'a6', label: 'DIN A6',  sub: '105 × 148 mm', p: 0 },
        { id: 'a5', label: 'DIN A5',  sub: '148 × 210 mm', p: 8 },
        { id: 'sq', label: 'Quadrat', sub: '148 × 148 mm', p: 4 },
      ]},
      { key: 'qty', opts: [
        { id: '100',  label: '100 Stk.',   sub: '',           p: 0  },
        { id: '250',  label: '250 Stk.',   sub: '',           p: 10 },
        { id: '500',  label: '500 Stk.',   sub: 'Bestseller', p: 18 },
        { id: '1000', label: '1.000 Stk.', sub: '',           p: 30 },
      ]},
      { key: 'material', opts: [
        { id: 'std',   label: '300g Standard',  sub: '',        p: 0  },
        { id: 'matt',  label: 'Mattelaminiert', sub: 'Edel',    p: 8  },
        { id: 'glanz', label: 'Glanzlaminiert', sub: 'Farbig',  p: 8  },
        { id: 'soft',  label: 'Soft-Touch',     sub: 'Premium', p: 14 },
      ]},
    ],
  },

  // ── SIGNAGE ──
  {
    id: 'banner', cat: 'sign',
    image: '/products/banner.png',
    name: 'Banner',
    specs: ['PVC oder Textil', 'Ösen auf Wunsch', 'Innen- & Außeneinsatz', 'Beliebige Maße'],
    basePrice: 29,
    steps: [
      { key: 'format', opts: [
        { id: '60x100',  label: '60 × 100 cm',  sub: 'Klein',       p: 0  },
        { id: '80x200',  label: '80 × 200 cm',  sub: 'Standard',    p: 18 },
        { id: '100x300', label: '100 × 300 cm', sub: 'Groß',        p: 38 },
        { id: 'custom',  label: 'Sondermaß',    sub: 'Nach Wunsch', p: 15 },
      ]},
      { key: 'qty', opts: [
        { id: '1',  label: '1 Stk.',  sub: '',          p: 0  },
        { id: '2',  label: '2 Stk.',  sub: '',          p: 22 },
        { id: '5',  label: '5 Stk.',  sub: '',          p: 45 },
        { id: '10', label: '10 Stk.', sub: 'Sparpaket', p: 80 },
      ]},
      { key: 'material', opts: [
        { id: 'pvc',    label: 'PVC 510g',     sub: 'Standard & robust',  p: 0  },
        { id: 'mesh',   label: 'Mesh-PVC',     sub: 'Winddurchlässig',    p: 8  },
        { id: 'textil', label: 'Textilbanner', sub: 'Hochwertig',         p: 20 },
        { id: 'flex',   label: 'Frontlit 540g',sub: 'Für Beleuchtung',    p: 12 },
      ]},
    ],
  },
  {
    id: 'rollup', cat: 'sign',
    image: '/products/rollup.png',
    name: 'Roll-Up',
    specs: ['85 × 200 cm Standard', 'Inkl. Tragetasche', 'Stabil & langlebig', '1–5 Werktage'],
    basePrice: 79,
    steps: [
      { key: 'format', opts: [
        { id: '85',  label: '85 × 200 cm',  sub: 'Standard',    p: 0  },
        { id: '100', label: '100 × 200 cm', sub: 'Breit',       p: 20 },
        { id: '120', label: '120 × 200 cm', sub: 'Extra breit', p: 38 },
        { id: '150', label: '150 × 200 cm', sub: 'XXL',         p: 65 },
      ]},
      { key: 'qty', opts: [
        { id: '1', label: '1 Stk.', sub: '',          p: 0   },
        { id: '2', label: '2 Stk.', sub: '',          p: 60  },
        { id: '3', label: '3 Stk.', sub: '',          p: 85  },
        { id: '5', label: '5 Stk.', sub: 'Sparpaket', p: 130 },
      ]},
      { key: 'material', opts: [
        { id: 'eco',  label: 'Eco',      sub: 'Budget',             p: 0  },
        { id: 'std',  label: 'Standard', sub: 'Empfohlen',          p: 15 },
        { id: 'prem', label: 'Premium',  sub: 'Doppelseitig mögl.', p: 35 },
        { id: 'out',  label: 'Outdoor',  sub: 'Wetterfest',         p: 50 },
      ]},
    ],
  },
  {
    id: 'pvcsign', cat: 'sign',
    image: '/products/pvc_schild.png',
    name: 'PVC-Schild',
    specs: ['3–5 mm Hartschaum / PVC', 'Wetterfest & UV-stabil', 'Bohrungen auf Wunsch', 'Beliebige Größen'],
    basePrice: 35,
    steps: [
      { key: 'format', opts: [
        { id: 'a3',     label: 'A3 (30×42cm)', sub: '',           p: 0  },
        { id: 'a2',     label: 'A2 (42×59cm)', sub: '',           p: 14 },
        { id: 'a1',     label: 'A1 (59×84cm)', sub: '',           p: 28 },
        { id: '50x70',  label: '50 × 70 cm',  sub: '',           p: 22 },
        { id: '70x100', label: '70 × 100 cm', sub: '',           p: 45 },
        { id: 'custom', label: 'Sondermaß',   sub: 'Nach Wunsch',p: 18 },
      ]},
      { key: 'qty', opts: [
        { id: '1',  label: '1 Stk.',  sub: '',          p: 0  },
        { id: '3',  label: '3 Stk.',  sub: '',          p: 25 },
        { id: '5',  label: '5 Stk.',  sub: '',          p: 40 },
        { id: '10', label: '10 Stk.', sub: 'Sparpaket', p: 70 },
      ]},
      { key: 'material', opts: [
        { id: 'hs3',   label: 'Hartschaum 3mm', sub: 'Leicht, indoor', p: 0  },
        { id: 'hs5',   label: 'Hartschaum 5mm', sub: 'Stabiler',       p: 8  },
        { id: 'alu',   label: 'Aluminium 2mm',  sub: 'Langlebig',      p: 28 },
        { id: 'acryl', label: 'Acrylglas',      sub: 'Premium-Optik',  p: 45 },
      ]},
    ],
  },
  {
    id: 'fensterfolie', cat: 'sign',
    image: '/products/fensterfolie.png',
    name: 'Fensterfolie',
    specs: ['Innen- oder Außenmontage', 'Vollflächig od. perforiert', 'Milchglas, Dekor, Bedruckt', 'Inkl. Montageservice'],
    basePrice: 25,
    steps: [
      { key: 'format', opts: [
        { id: '1',    label: 'bis 1 m²',      sub: 'Klein',       p: 0  },
        { id: '3',    label: '1 – 3 m²',      sub: 'Schaufenster',p: 45 },
        { id: '5',    label: '3 – 5 m²',      sub: 'Groß',        p: 90 },
        { id: 'more', label: 'Mehr als 5 m²', sub: 'Auf Anfrage', p: 0  },
      ]},
      { key: 'qty', opts: [
        { id: '1',    label: '1 Fenster',  sub: '',            p: 0  },
        { id: '2',    label: '2 Fenster',  sub: '',            p: 18 },
        { id: '3',    label: '3 Fenster',  sub: '',            p: 32 },
        { id: 'more', label: 'Mehr als 3', sub: 'Auf Anfrage', p: 0  },
      ]},
      { key: 'material', opts: [
        { id: 'milch', label: 'Milchglas',         sub: 'Sichtschutz',          p: 0  },
        { id: 'dekor', label: 'Dekorfolie',         sub: 'Muster & Farben',      p: 5  },
        { id: 'druck', label: 'Bedruckte Folie',    sub: 'Individuelles Motiv',  p: 15 },
        { id: 'perf',  label: 'Perforierte Folie',  sub: 'Sicht von innen frei', p: 20 },
      ]},
    ],
  },

  {
    id: 'autobeschriftung', cat: 'sign',
    image: '/products/autobeschriftung.png',
    name: 'Autobeschriftung',
    specs: ['Selbstklebende Folie (Tape)', 'PKW, Transporter & LKW', 'Wetterfest & UV-beständig', 'Inkl. Montage vor Ort'],
    basePrice: 89,
    steps: [
      { key: 'format', opts: [
        { id: 'pkw_teil',   label: 'PKW Teilfolierung',         sub: 'Türen, Motorhaube etc.',  p: 0   },
        { id: 'pkw_voll',   label: 'PKW Vollfolierung',         sub: 'Komplettes Fahrzeug',     p: 200 },
        { id: 'trans_teil', label: 'Transporter Teilfolierung', sub: 'Seiten & Heck',           p: 100 },
        { id: 'trans_voll', label: 'Transporter Vollfolierung', sub: 'Komplettes Fahrzeug',     p: 350 },
      ]},
      { key: 'qty', opts: [
        { id: '1',    label: '1 Fahrzeug',    sub: '',               p: 0   },
        { id: '3',    label: '3 Fahrzeuge',   sub: 'Flotte',         p: 200 },
        { id: '5',    label: '5 Fahrzeuge',   sub: 'Flottenrabatt',  p: 300 },
        { id: 'mehr', label: '10+ Fahrzeuge', sub: 'Auf Anfrage',    p: 0   },
      ]},
      { key: 'material', opts: [
        { id: 'glanz',  label: 'Glanzfolie',   sub: 'Hochglanz',              p: 0  },
        { id: 'matt',   label: 'Mattfolie',    sub: 'Edel & modern',          p: 30 },
        { id: 'carbon', label: 'Carbon-Optik', sub: 'Sportlich',              p: 50 },
        { id: 'chrom',  label: 'Chromfolie',   sub: 'Besonders auffällig',    p: 80 },
      ]},
    ],
  },
  {
    id: 'sonnenschutz', cat: 'sign',
    image: '/products/sonnenschutzfolie.png',
    name: 'Sonnenschutzfolie',
    specs: ['Max. Breite 1,52 m', 'Innen- oder Außenmontage', 'UV-Schutz bis 99%', 'Inkl. Montageservice'],
    basePrice: 35,
    steps: [
      { key: 'format', opts: [
        { id: '1qm',   label: 'bis 1 m²',     sub: 'Kleines Fenster',  p: 0   },
        { id: '3qm',   label: '1 – 3 m²',     sub: 'Standard',         p: 40  },
        { id: '5qm',   label: '3 – 5 m²',     sub: 'Großes Fenster',   p: 80  },
        { id: '10qm',  label: '5 – 10 m²',    sub: 'Fassade',          p: 150 },
      ]},
      { key: 'qty', opts: [
        { id: '1',    label: '1 Fenster',  sub: '',            p: 0  },
        { id: '2',    label: '2 Fenster',  sub: '',            p: 25 },
        { id: '3',    label: '3 Fenster',  sub: '',            p: 45 },
        { id: 'mehr', label: 'Mehr als 3', sub: 'Auf Anfrage', p: 0  },
      ]},
      { key: 'material', opts: [
        { id: 'hell',    label: 'Hell (35% Tönung)',   sub: 'Leichter Schutz',          p: 0  },
        { id: 'mittel',  label: 'Mittel (20% Tönung)', sub: 'Empfohlen',                p: 10 },
        { id: 'dunkel',  label: 'Dunkel (5% Tönung)',  sub: 'Maximaler Schutz',         p: 15 },
        { id: 'spiegel', label: 'Spiegelfolie',        sub: 'Sichtschutz + Sonnenschutz',p: 25 },
      ]},
    ],
  },
  {
    id: 'fensterbeschriftung', cat: 'sign',
    image: '/products/fensterbeschriftung.png',
    name: 'Fensterbeschriftung',
    specs: ['Selbstklebende Folie (Tape)', 'Schaufenster & Glasflächen', 'Innen- oder Außenmontage', 'Inkl. Montage vor Ort'],
    basePrice: 49,
    steps: [
      { key: 'format', opts: [
        { id: 'klein',   label: 'Kleines Fenster',    sub: 'bis 1 m²',    p: 0   },
        { id: 'mittel',  label: 'Mittleres Fenster',  sub: '1 – 3 m²',    p: 50  },
        { id: 'gross',   label: 'Großes Schaufenster',sub: '3 – 6 m²',    p: 120 },
        { id: 'fassade', label: 'Fassade / Mehrere',  sub: 'Auf Anfrage', p: 0   },
      ]},
      { key: 'qty', opts: [
        { id: '1',    label: '1 Fenster',  sub: '',            p: 0  },
        { id: '2',    label: '2 Fenster',  sub: '',            p: 35 },
        { id: '3',    label: '3 Fenster',  sub: '',            p: 60 },
        { id: 'mehr', label: 'Mehr als 3', sub: 'Auf Anfrage', p: 0  },
      ]},
      { key: 'material', opts: [
        { id: 'weiss',  label: 'Weiße Folie',       sub: 'Classic',          p: 0  },
        { id: 'trans',  label: 'Transparente Folie',sub: 'Unsichtbarer Rand',p: 8  },
        { id: 'gold',   label: 'Goldfolie',         sub: 'Edel & auffällig', p: 20 },
        { id: 'silber', label: 'Silberfolie',        sub: 'Modern',           p: 15 },
      ]},
    ],
  },

  // ── TEXTILIEN ──
  {
    id: 'tshirt', cat: 'textil',
    image: '/products/tshirt.png',
    name: 'T-Shirts',
    specs: ['S – 5XL · viele Farben', '100% Baumwolle, 180g', 'Sieb- od. Transferdruck', 'ab 10 Stück'],
    basePrice: 14,
    steps: [
      { key: 'format', opts: [
        { id: 'rund',  label: 'Rundhals',     sub: 'Classic', p: 0 },
        { id: 'vneck', label: 'V-Neck',       sub: 'Casual',  p: 2 },
        { id: 'polo',  label: 'Poloshirt',    sub: 'Business',p: 6 },
        { id: 'lang',  label: 'Langarmshirt', sub: 'Winter',  p: 5 },
      ]},
      { key: 'qty', opts: [
        { id: '10',  label: '10 Stk.',  sub: '',           p: 0   },
        { id: '25',  label: '25 Stk.',  sub: '',           p: 60  },
        { id: '50',  label: '50 Stk.',  sub: 'Bestseller', p: 110 },
        { id: '100', label: '100 Stk.', sub: '',           p: 190 },
        { id: '250', label: '250 Stk.', sub: '',           p: 420 },
      ]},
      { key: 'material', opts: [
        { id: 'sieb',     label: 'Siebdruck',       sub: 'Langlebig & scharf', p: 0  },
        { id: 'dtg',      label: 'Digitaldruck DTG', sub: 'Fotorealistisch',   p: 4  },
        { id: 'transfer', label: 'Transferdruck',    sub: 'Farbintensiv',      p: 2  },
        { id: 'stick',    label: 'Stickerei',        sub: 'Premium-Look',      p: 12 },
      ]},
    ],
  },
  {
    id: 'hoodie', cat: 'textil',
    image: '/products/hoodie.png',
    name: 'Hoodies & Sweatshirts',
    specs: ['S – 3XL', 'Vorder- & Rückseitendruck', 'Hochwertige Verarbeitung', 'ab 10 Stück'],
    basePrice: 29,
    steps: [
      { key: 'format', opts: [
        { id: 'hood',  label: 'Kapuzenpullover',  sub: 'Kapuze mit Kordel',  p: 0  },
        { id: 'sweat', label: 'Sweatshirt',        sub: 'Ohne Kapuze',        p: 0  },
        { id: 'zip',   label: 'Zip-Hoodie',        sub: 'Mit Reißverschluss', p: 8  },
        { id: 'soft',  label: 'Softshell-Jacke',   sub: 'Outdoor',            p: 22 },
      ]},
      { key: 'qty', opts: [
        { id: '10',  label: '10 Stk.',  sub: '',           p: 0   },
        { id: '25',  label: '25 Stk.',  sub: '',           p: 95  },
        { id: '50',  label: '50 Stk.',  sub: 'Bestseller', p: 175 },
        { id: '100', label: '100 Stk.', sub: '',           p: 310 },
      ]},
      { key: 'material', opts: [
        { id: 'sieb',     label: 'Siebdruck',    sub: 'Klassisch',       p: 0  },
        { id: 'dtg',      label: 'Digitaldruck', sub: 'Fotorealistisch', p: 6  },
        { id: 'transfer', label: 'Flex-Transfer',sub: 'Edel & glatt',   p: 5  },
        { id: 'stick',    label: 'Stickerei',    sub: 'Hochwertig',      p: 18 },
      ]},
    ],
  },
  {
    id: 'workwear', cat: 'textil',
    image: '/products/arbeitsbekleidung.png',
    name: 'Arbeitsbekleidung',
    specs: ['Warnschutz & Berufskleidung', 'Personalisiert mit Logo', 'Waschbeständiger Druck', 'Flottenbestellungen'],
    basePrice: 24,
    steps: [
      { key: 'format', opts: [
        { id: 'weste', label: 'Warnweste',    sub: 'EN ISO 20471', p: 0  },
        { id: 'hose',  label: 'Arbeitshose',  sub: 'Robust',       p: 10 },
        { id: 'jacke', label: 'Arbeitsjacke', sub: 'Wind & Regen', p: 22 },
        { id: 'cap',   label: 'Arbeitscap',   sub: '',             p: 4  },
      ]},
      { key: 'qty', opts: [
        { id: '5',  label: '5 Stk.',  sub: '',             p: 0   },
        { id: '10', label: '10 Stk.', sub: '',             p: 55  },
        { id: '25', label: '25 Stk.', sub: 'Flottenpaket', p: 120 },
        { id: '50', label: '50 Stk.', sub: '',             p: 220 },
      ]},
      { key: 'material', opts: [
        { id: 'trans', label: 'Transferdruck', sub: 'Standard',  p: 0  },
        { id: 'stick', label: 'Stickerei',     sub: 'Langlebig', p: 8  },
        { id: 'laser', label: 'Lasergravur',   sub: 'Schilder',  p: 15 },
      ]},
    ],
  },

  // ── PROMO ──
  {
    id: 'kugel', cat: 'promo',
    image: '/products/kugelschreiber.png',
    name: 'Kugelschreiber',
    specs: ['Gravur od. Tampondruck', 'Viele Farben & Stile', 'ab 50 Stück', 'Schnelle Lieferung'],
    basePrice: 0.49,
    steps: [
      { key: 'format', opts: [
        { id: 'classic', label: 'Classic',  sub: 'Drehkugelschreiber', p: 0   },
        { id: 'metal',   label: 'Metall',   sub: 'Premium-Look',       p: 0.6 },
        { id: 'touch',   label: 'Touchpen', sub: 'Smartphone-Tip',     p: 0.4 },
        { id: 'eco',     label: 'Recycled', sub: 'Nachhaltig',         p: 0.2 },
      ]},
      { key: 'qty', opts: [
        { id: '50',   label: '50 Stk.',    sub: '',           p: 0   },
        { id: '100',  label: '100 Stk.',   sub: '',           p: 20  },
        { id: '250',  label: '250 Stk.',   sub: 'Bestseller', p: 55  },
        { id: '500',  label: '500 Stk.',   sub: '',           p: 95  },
        { id: '1000', label: '1.000 Stk.', sub: 'Vorteil',    p: 160 },
      ]},
      { key: 'material', opts: [
        { id: 'laser', label: 'Lasergravur', sub: 'Edel & dauerhaft', p: 0   },
        { id: 'druck', label: 'Tampondruck', sub: 'Farbig',           p: 0   },
        { id: 'praeg', label: 'Prägung',     sub: 'Reliefeffekt',     p: 0.1 },
      ]},
    ],
  },
  {
    id: 'tassen', cat: 'promo',
    image: '/products/werbetassen.png',
    name: 'Werbetassen',
    specs: ['300 ml Keramik-Standard', 'Spülmaschinenfest', 'Innen & Außen bedruckbar', 'ab 12 Stück'],
    basePrice: 4.90,
    steps: [
      { key: 'format', opts: [
        { id: 'kaffee',  label: 'Kaffeetasse',  sub: '300 ml',           p: 0   },
        { id: 'jumbo',   label: 'Jumbo-Tasse',  sub: '450 ml',           p: 1.5 },
        { id: 'thermo',  label: 'Thermobecher', sub: '400 ml Edelstahl', p: 5   },
        { id: 'esp',     label: 'Espressotasse',sub: '100 ml',           p: 0   },
      ]},
      { key: 'qty', opts: [
        { id: '12',  label: '12 Stk.',  sub: '',          p: 0   },
        { id: '24',  label: '24 Stk.',  sub: '',          p: 35  },
        { id: '50',  label: '50 Stk.',  sub: '',          p: 75  },
        { id: '100', label: '100 Stk.', sub: 'Sparpaket', p: 130 },
      ]},
      { key: 'material', opts: [
        { id: 'ein',   label: 'Einseitig',    sub: '1 Motiv',     p: 0   },
        { id: 'zwei',  label: 'Zweiseitig',   sub: '2 Motive',    p: 1.5 },
        { id: 'rund',  label: 'Rundumdruck',  sub: '360°',        p: 3   },
        { id: 'innen', label: 'Innen farbig', sub: '+ Außendruck',p: 2   },
      ]},
    ],
  },

  // ── GASTRO ──
  {
    id: 'speisekarte', cat: 'gastro',
    image: '/products/speisekarten.png',
    name: 'Speisekarten',
    specs: ['A4 od. A5 Format', 'Hard- od. Softcover', 'Wasserabweisend mögl.', 'ab 10 Stück'],
    basePrice: 24,
    steps: [
      { key: 'format', opts: [
        { id: 'a5',     label: 'DIN A5',       sub: '148 × 210 mm', p: 0  },
        { id: 'a4',     label: 'DIN A4',       sub: '210 × 297 mm', p: 8  },
        { id: 'a4quer', label: 'A4 Querformat',sub: '297 × 210 mm', p: 8  },
        { id: 'custom', label: 'Sonderformat', sub: 'Nach Wunsch',  p: 15 },
      ]},
      { key: 'qty', opts: [
        { id: '10',  label: '10 Stk.',  sub: '', p: 0   },
        { id: '25',  label: '25 Stk.',  sub: '', p: 38  },
        { id: '50',  label: '50 Stk.',  sub: '', p: 65  },
        { id: '100', label: '100 Stk.', sub: '', p: 110 },
      ]},
      { key: 'material', opts: [
        { id: 'soft',  label: 'Softcover',  sub: 'Kostengünstig', p: 0  },
        { id: 'hard',  label: 'Hardcover',  sub: 'Langlebig',     p: 18 },
        { id: 'wipe',  label: 'Abwischbar', sub: 'Hygienisch',    p: 12 },
        { id: 'leder', label: 'Lederoptik', sub: 'Premium',       p: 35 },
      ]},
    ],
  },
  {
    id: 'untersetzer', cat: 'gastro',
    image: '/products/untersetzer.png',
    name: 'Untersetzer',
    specs: ['90 × 90 mm Standard', '4-farbig bedruckt', 'Karton od. Kork', 'ab 250 Stück'],
    basePrice: 19,
    steps: [
      { key: 'format', opts: [
        { id: 'rund', label: 'Rund Ø 95mm',      sub: 'Classic', p: 0 },
        { id: 'quad', label: 'Quadrat 90×90mm',  sub: 'Modern',  p: 0 },
        { id: 'rect', label: 'Rechteck 90×120mm',sub: 'Groß',    p: 3 },
      ]},
      { key: 'qty', opts: [
        { id: '250',  label: '250 Stk.',   sub: '',           p: 0  },
        { id: '500',  label: '500 Stk.',   sub: '',           p: 16 },
        { id: '1000', label: '1.000 Stk.', sub: 'Bestseller', p: 28 },
        { id: '2500', label: '2.500 Stk.', sub: 'Vorteil',    p: 55 },
      ]},
      { key: 'material', opts: [
        { id: 'karton', label: 'Karton 2mm', sub: 'Standard',   p: 0 },
        { id: 'kork',   label: 'Kork 3mm',   sub: 'Nachhaltig', p: 6 },
        { id: 'filz',   label: 'Filz 3mm',   sub: 'Gemütlich',  p: 5 },
        { id: 'gummi',  label: 'Gummi',      sub: 'Rutschfest', p: 8 },
      ]},
    ],
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
function calcPrice(product: Product, sels: Record<number, string>): number {
  return product.steps.reduce((sum, step, i) => {
    const opt = step.opts.find(o => o.id === sels[i])
    return sum + (opt?.p ?? 0)
  }, product.basePrice)
}

function fmtPrice(p: number): string {
  return p < 1
    ? p.toFixed(2).replace('.', ',') + ' €'
    : Math.round(p) + ' €'
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ShopClient() {
  const [filter,     setFilter]     = useState('all')
  const [activeProd, setActiveProd] = useState<Product | null>(null)
  const [step,       setStep]       = useState(0)
  const [sels,       setSels]       = useState<Record<number, string>>({})
  const [done,       setDone]       = useState(false)

  const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter)
  const catLabel = (id: string) => CATS.find(c => c.id === id)?.label ?? id

  function openProduct(prod: Product) {
    setActiveProd(prod)
    setStep(0)
    setSels(Object.fromEntries(prod.steps.map((s, i) => [i, s.opts[0].id])))
    setDone(false)
    document.body.style.overflow = 'hidden'
  }

  function closeModal() {
    setActiveProd(null)
    document.body.style.overflow = ''
  }

  const isLastStep = activeProd ? step === activeProd.steps.length : false
  const price      = activeProd ? calcPrice(activeProd, sels) : 0

  function optCols(count: number) {
    if (count <= 2) return 'grid-cols-2'
    if (count === 4) return 'grid-cols-2 sm:grid-cols-4'
    return 'grid-cols-2 sm:grid-cols-3'
  }

  return (
    <>
      {/* ── Category filter ───────────────────────────────────────────── */}
      <div className="flex gap-2 flex-wrap mb-8">
        {CATS.map(cat => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-sm border transition-colors ${
              filter === cat.id
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-border text-muted hover:border-white/40 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ── Product grid ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {filtered.map(prod => (
          <div
            key={prod.id}
            onClick={() => openProduct(prod)}
            className="bg-surface border border-border rounded-sm overflow-hidden cursor-pointer hover:border-accent/50 transition-all duration-300 group flex flex-col"
          >
            {/* Product image */}
            <div className="relative w-full h-48 overflow-hidden bg-surface-2">
              <img
                src={prod.image}
                alt={prod.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-widest text-white/80 bg-black/40 px-2 py-1 rounded-sm">
                {catLabel(prod.cat)}
              </div>
            </div>

            {/* Product info */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-lg font-black tracking-tight mb-3 group-hover:text-accent transition-colors">
                {prod.name}
              </h3>
              <ul className="flex-1 mb-4 space-y-1">
                {prod.specs.map(s => (
                  <li key={s} className="text-xs text-muted flex gap-1.5">
                    <span className="text-accent shrink-0">–</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted">ab</div>
                  <div className="text-2xl font-black">{fmtPrice(prod.basePrice)}</div>
                  <div className="text-[10px] text-muted">zzgl. MwSt.</div>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  Konfigurieren →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Configurator modal ────────────────────────────────────────── */}
      {activeProd && (
        <div
          className="fixed inset-0 bg-black/92 z-50 overflow-y-auto p-4 flex items-start justify-center"
          onClick={e => { if (e.target === e.currentTarget) closeModal() }}
        >
          <div className="w-full max-w-3xl bg-surface border border-border rounded-sm my-4">

            {/* Header with product image */}
            <div className="relative h-36 overflow-hidden">
              <img
                src={activeProd.image}
                alt={activeProd.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30 flex items-end p-6">
                <div>
                  <h2 className="text-3xl font-black tracking-tight">{activeProd.name}</h2>
                  <p className="text-xs text-white/60 mt-1 uppercase tracking-widest">
                    Produkt konfigurieren & Angebot anfragen
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-black/50 border border-white/20 text-white hover:bg-black/70 rounded-sm transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Step bar */}
            <div className="flex border-b border-border overflow-x-auto">
              {[...STEP_LABELS.slice(0, activeProd.steps.length), 'Anfrage'].map((label, i) => (
                <div
                  key={i}
                  className={`flex-1 min-w-[72px] py-3 px-2 text-center text-[10px] font-bold uppercase tracking-wider border-r border-border last:border-r-0 relative ${
                    i === step ? 'text-accent' : i < step ? 'text-white/40' : 'text-muted'
                  }`}
                >
                  {i < step ? '✓ ' : ''}{label}
                  {i === step && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
                </div>
              ))}
            </div>

            {/* Body */}
            <div className="p-6 min-h-[220px]">
              {!isLastStep ? (
                <>
                  <p className="text-xs font-bold uppercase tracking-widest text-accent mb-4">
                    {STEP_TITLES[step] ?? `Schritt ${step + 1}`}
                  </p>
                  <div className={`grid gap-2 ${optCols(activeProd.steps[step].opts.length)}`}>
                    {activeProd.steps[step].opts.map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setSels(prev => ({ ...prev, [step]: opt.id }))}
                        className={`p-3 text-left border rounded-sm transition-all ${
                          sels[step] === opt.id
                            ? 'border-accent bg-accent/5'
                            : 'border-border hover:border-white/30'
                        }`}
                      >
                        <div className="text-sm font-bold">{opt.label}</div>
                        <div className={`text-xs mt-0.5 ${sels[step] === opt.id ? 'text-accent' : 'text-muted'}`}>
                          {opt.sub}{opt.p > 0 ? ` (+${fmtPrice(opt.p)})` : ''}
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              ) : done ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-full border-2 border-accent flex items-center justify-center mx-auto mb-5 text-accent text-xl font-black">✓</div>
                  <h3 className="text-2xl font-black text-accent mb-2">Anfrage gesendet!</h3>
                  <p className="text-sm text-muted max-w-sm mx-auto leading-relaxed">
                    Vielen Dank! Wir melden uns innerhalb von 24 Stunden mit Ihrem persönlichen Angebot.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-xs font-bold uppercase tracking-widest text-accent mb-4">
                    Zusammenfassung & Anfrage
                  </p>
                  <div className="bg-background border border-border rounded-sm p-4 mb-5 space-y-1.5">
                    <div className="flex justify-between text-sm pb-1.5 border-b border-border">
                      <span className="text-muted">Produkt</span>
                      <span className="font-medium">{activeProd.name}</span>
                    </div>
                    {activeProd.steps.map((s, i) => {
                      const opt = s.opts.find(o => o.id === sels[i])
                      return (
                        <div key={i} className="flex justify-between text-sm py-1 border-b border-border/60 last:border-0">
                          <span className="text-muted">{STEP_LABELS[i]}</span>
                          <span className="font-medium">{opt?.label ?? '—'}</span>
                        </div>
                      )
                    })}
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-muted">Richtpreis ab</span>
                      <span className="text-2xl font-black text-accent">{fmtPrice(price)}</span>
                    </div>
                  </div>
                  <form onSubmit={e => { e.preventDefault(); setDone(true) }} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-muted mb-1.5">Name *</label>
                      <input required type="text" placeholder="Max Mustermann"
                        className="w-full bg-background border border-border rounded-sm px-3 py-2.5 text-sm placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-muted mb-1.5">E-Mail *</label>
                      <input required type="email" placeholder="mail@example.com"
                        className="w-full bg-background border border-border rounded-sm px-3 py-2.5 text-sm placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-muted mb-1.5">Telefon / WhatsApp</label>
                      <input type="tel" placeholder="+49 ..."
                        className="w-full bg-background border border-border rounded-sm px-3 py-2.5 text-sm placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-muted mb-1.5">Wunschtermin</label>
                      <input type="text" placeholder="z.B. bis 20. Juli"
                        className="w-full bg-background border border-border rounded-sm px-3 py-2.5 text-sm placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] uppercase tracking-widest text-muted mb-1.5">Anmerkungen</label>
                      <textarea rows={3} placeholder="Besondere Wünsche, Logofarben, Dateiformat..."
                        className="w-full bg-background border border-border rounded-sm px-3 py-2.5 text-sm placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors resize-y" />
                    </div>
                    <div className="sm:col-span-2">
                      <button type="submit"
                        className="w-full py-4 bg-accent hover:bg-accent-hover text-white font-black text-sm uppercase tracking-widest rounded-sm transition-colors">
                        Angebot anfragen →
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>

            {/* Footer */}
            {!done && (
              <div className="flex items-center justify-between p-5 border-t border-border bg-background flex-wrap gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted mb-1">Richtpreis ab</div>
                  <div className="text-3xl font-black text-accent leading-none">{fmtPrice(price)}</div>
                  <div className="text-[10px] text-muted mt-0.5">zzgl. MwSt. · inkl. Druck</div>
                </div>
                <div className="flex gap-2">
                  {step > 0 && (
                    <button onClick={() => setStep(s => s - 1)}
                      className="px-5 py-2.5 border border-border text-muted text-xs font-bold uppercase tracking-wider rounded-sm hover:border-white/40 hover:text-white transition-colors flex items-center gap-1.5">
                      <ChevronLeft size={14} /> Zurück
                    </button>
                  )}
                  {!isLastStep && (
                    <button onClick={() => setStep(s => s + 1)}
                      className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-colors flex items-center gap-1.5">
                      Weiter <ChevronRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
