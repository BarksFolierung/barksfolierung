// Zentrale Produktdaten für Shop, Warenkorb und Server-Preisvalidierung.
// WICHTIG: Preise werden bei Bestellungen IMMER serverseitig aus dieser Datei
// neu berechnet – niemals dem Client vertrauen.

export type Opt     = { id: string; label: string; sub: string; p: number }
export type PStep   = { key: string; opts: Opt[] }
export type Product = {
  id: string; cat: string; image: string; name: string
  specs: string[]; basePrice: number; steps: PStep[]
  /** true = direkt online bestellbar (versandfähig). false = nur Angebot (Montage vor Ort). */
  purchasable: boolean
}

export const CATS = [
  { id: 'all',    label: 'Alle' },
  { id: 'print',  label: 'Druckprodukte' },
  { id: 'sign',   label: 'Werbung & Großformat' },
  { id: 'textil', label: 'Textilien' },
  { id: 'promo',  label: 'Werbeartikel' },
  { id: 'gastro', label: 'Gastronomie & Events' },
]

export const STEP_TITLES = ['Format & Größe wählen', 'Menge wählen', 'Material & Veredelung']
export const STEP_LABELS = ['Format / Größe', 'Menge', 'Material']

// ── Versand ────────────────────────────────────────────────────────────────
export const SHIPPING_NETTO       = 8.9   // Versandkostenpauschale (netto)
export const FREE_SHIPPING_NETTO  = 150   // Versandkostenfrei ab (netto)
export const VAT_RATE             = 0.19

// ─── Products with realistic German resale prices ─────────────────────────────
export const PRODUCTS: Product[] = [

  // ── PRINT ──────────────────────────────────────────────────────────────────
  {
    id: 'flyer', cat: 'print', image: '/products/flyer.png', name: 'Flyer', purchasable: true,
    specs: ['DIN A6 bis DIN A4', 'Offset- & Digitaldruck', '135g – 350g Papier', 'ab 100 Stück'],
    basePrice: 62,
    steps: [
      { key: 'format', opts: [
        { id: 'a6',   label: 'DIN A6',   sub: '105 × 148 mm', p: 0  },
        { id: 'lang', label: 'DIN lang', sub: '99 × 210 mm',  p: 15 },
        { id: 'a5',   label: 'DIN A5',   sub: '148 × 210 mm', p: 25 },
        { id: 'a4',   label: 'DIN A4',   sub: '210 × 297 mm', p: 45 },
      ]},
      { key: 'qty', opts: [
        { id: '100',  label: '100 Stk.',   sub: '',           p: 0   },
        { id: '250',  label: '250 Stk.',   sub: '',           p: 18  },
        { id: '500',  label: '500 Stk.',   sub: 'Bestseller', p: 32  },
        { id: '1000', label: '1.000 Stk.', sub: '',           p: 52  },
        { id: '2500', label: '2.500 Stk.', sub: '',           p: 95  },
        { id: '5000', label: '5.000 Stk.', sub: 'Vorteil',    p: 150 },
      ]},
      { key: 'material', opts: [
        { id: 'std',   label: '135g Standard',   sub: 'Bilderdruckpapier', p: 0  },
        { id: 'prem',  label: '170g Premium',    sub: 'Hochwertig',        p: 8  },
        { id: 'matt',  label: 'Mattelaminiert',  sub: 'Edel & stilvoll',   p: 18 },
        { id: 'glanz', label: 'Glanzlaminiert',  sub: 'Farbintensiv',      p: 18 },
        { id: 'eco',   label: 'Recyclingpapier', sub: 'Umweltfreundlich',  p: 5  },
      ]},
    ],
  },
  {
    id: 'visitenkarten', cat: 'print', image: '/products/visitenkarten.png', name: 'Visitenkarten', purchasable: true,
    specs: ['85 × 55 mm · Portrait mögl.', 'Ein- oder beidseitig', '300g – 600g Karton', 'ab 100 Stück'],
    basePrice: 59,
    steps: [
      { key: 'format', opts: [
        { id: 'quer', label: 'Querformat',  sub: '85 × 55 mm', p: 0 },
        { id: 'hoch', label: 'Hochformat',  sub: '55 × 85 mm', p: 0 },
        { id: 'quad', label: 'Quadratisch', sub: '55 × 55 mm', p: 5 },
      ]},
      { key: 'qty', opts: [
        { id: '100',  label: '100 Stk.',   sub: '',           p: 0  },
        { id: '250',  label: '250 Stk.',   sub: '',           p: 12 },
        { id: '500',  label: '500 Stk.',   sub: 'Bestseller', p: 20 },
        { id: '1000', label: '1.000 Stk.', sub: '',           p: 32 },
        { id: '2000', label: '2.000 Stk.', sub: '',           p: 52 },
      ]},
      { key: 'material', opts: [
        { id: '300',   label: '300g Karton',    sub: 'Standard',     p: 0  },
        { id: 'matt',  label: 'Mattelaminiert', sub: 'Softer Look',  p: 12 },
        { id: 'glanz', label: 'Glanzlaminiert', sub: 'Brilliant',    p: 12 },
        { id: 'soft',  label: 'Soft-Touch',     sub: 'Exklusiv',     p: 22 },
        { id: 'black', label: 'Black Core',     sub: 'Luxus',        p: 32 },
        { id: 'trans', label: 'Transparent',    sub: 'Durchsichtig', p: 38 },
      ]},
    ],
  },
  {
    id: 'poster', cat: 'print', image: '/products/poster.png', name: 'Poster', purchasable: true,
    specs: ['DIN A3 bis DIN A0', '170g – 200g Papier', 'Indoor & Outdoor', 'Einzeldruck möglich'],
    basePrice: 8,
    steps: [
      { key: 'format', opts: [
        { id: 'a3', label: 'DIN A3', sub: '297 × 420 mm',  p: 0  },
        { id: 'a2', label: 'DIN A2', sub: '420 × 594 mm',  p: 9  },
        { id: 'a1', label: 'DIN A1', sub: '594 × 841 mm',  p: 22 },
        { id: 'a0', label: 'DIN A0', sub: '841 × 1189 mm', p: 48 },
      ]},
      { key: 'qty', opts: [
        { id: '1',   label: '1 Stk.',   sub: 'Einzeldruck', p: 0   },
        { id: '5',   label: '5 Stk.',   sub: '',            p: 18  },
        { id: '10',  label: '10 Stk.',  sub: '',            p: 32  },
        { id: '25',  label: '25 Stk.',  sub: '',            p: 68  },
        { id: '50',  label: '50 Stk.',  sub: '',            p: 120 },
        { id: '100', label: '100 Stk.', sub: '',            p: 195 },
      ]},
      { key: 'material', opts: [
        { id: 'std',    label: '170g Plakat',      sub: 'Standard',   p: 0  },
        { id: 'photo',  label: '200g Photopapier', sub: 'Hochglanz',  p: 10 },
        { id: 'pvc',    label: 'PVC Folie',        sub: 'Wetterfest', p: 22 },
        { id: 'textil', label: 'Textilposter',     sub: 'Stoff-Optik',p: 32 },
      ]},
    ],
  },
  {
    id: 'aufkleber', cat: 'print', image: '/products/aufkleber.png', name: 'Aufkleber', purchasable: true,
    specs: ['Freie Formen & Größen', 'Innen- & Außenkleber', 'Transparent, Matt, Glanz', 'ab 50 Stück'],
    basePrice: 29,
    steps: [
      { key: 'format', opts: [
        { id: 'a7',     label: 'A7 (50×74mm)',   sub: 'Klein',      p: 0  },
        { id: 'a6',     label: 'A6 (74×105mm)',  sub: 'Standard',   p: 10 },
        { id: 'a5',     label: 'A5 (105×148mm)', sub: 'Groß',       p: 22 },
        { id: 'custom', label: 'Sonderformat',   sub: 'Freie Maße', p: 15 },
      ]},
      { key: 'qty', opts: [
        { id: '50',   label: '50 Stk.',    sub: '',           p: 0  },
        { id: '100',  label: '100 Stk.',   sub: '',           p: 12 },
        { id: '250',  label: '250 Stk.',   sub: 'Bestseller', p: 25 },
        { id: '500',  label: '500 Stk.',   sub: '',           p: 42 },
        { id: '1000', label: '1.000 Stk.', sub: '',           p: 68 },
      ]},
      { key: 'material', opts: [
        { id: 'weiss',   label: 'Weiß matt',     sub: 'Standard',            p: 0  },
        { id: 'glanz',   label: 'Glänzend',       sub: 'Farbintensiv',        p: 5  },
        { id: 'trans',   label: 'Transparent',    sub: 'Unsichtbarer Rand',   p: 10 },
        { id: 'outdoor', label: 'Outdoor UV',     sub: 'Witterungsbeständig', p: 14 },
        { id: 'boden',   label: 'Bodenaufkleber', sub: 'Rutschsicher',        p: 28 },
      ]},
    ],
  },
  {
    id: 'broschuere', cat: 'print', image: '/products/broschueren.png', name: 'Broschüren', purchasable: true,
    specs: ['DIN A5 & A4', '8 bis 64 Seiten', 'Klebe- oder Heftbindung', 'ab 50 Stück'],
    basePrice: 89,
    steps: [
      { key: 'format', opts: [
        { id: 'a5', label: 'DIN A5', sub: '148 × 210 mm', p: 0  },
        { id: 'a4', label: 'DIN A4', sub: '210 × 297 mm', p: 28 },
      ]},
      { key: 'qty', opts: [
        { id: '50',  label: '50 Stk.',  sub: '',           p: 0   },
        { id: '100', label: '100 Stk.', sub: '',           p: 42  },
        { id: '250', label: '250 Stk.', sub: 'Bestseller', p: 98  },
        { id: '500', label: '500 Stk.', sub: '',           p: 172 },
      ]},
      { key: 'material', opts: [
        { id: 'heft',  label: 'Klammerheftung', sub: '8–48 Seiten',  p: 0  },
        { id: 'klebe', label: 'Klebebindung',   sub: 'ab 40 Seiten', p: 18 },
        { id: 'hard',  label: 'Hardcover',      sub: 'Premium',      p: 52 },
      ]},
    ],
  },
  {
    id: 'postkarten', cat: 'print', image: '/products/postkarten.png', name: 'Postkarten', purchasable: true,
    specs: ['DIN A6 od. A5', '300g – 400g Karton', 'Ein- od. beidseitig', 'ab 100 Stück'],
    basePrice: 35,
    steps: [
      { key: 'format', opts: [
        { id: 'a6', label: 'DIN A6',  sub: '105 × 148 mm', p: 0  },
        { id: 'a5', label: 'DIN A5',  sub: '148 × 210 mm', p: 12 },
        { id: 'sq', label: 'Quadrat', sub: '148 × 148 mm', p: 8  },
      ]},
      { key: 'qty', opts: [
        { id: '100',  label: '100 Stk.',   sub: '',           p: 0  },
        { id: '250',  label: '250 Stk.',   sub: '',           p: 15 },
        { id: '500',  label: '500 Stk.',   sub: 'Bestseller', p: 28 },
        { id: '1000', label: '1.000 Stk.', sub: '',           p: 48 },
      ]},
      { key: 'material', opts: [
        { id: 'std',   label: '300g Standard',  sub: '',        p: 0  },
        { id: 'matt',  label: 'Mattelaminiert', sub: 'Edel',    p: 12 },
        { id: 'glanz', label: 'Glanzlaminiert', sub: 'Farbig',  p: 12 },
        { id: 'soft',  label: 'Soft-Touch',     sub: 'Premium', p: 22 },
      ]},
    ],
  },

  // ── SIGNAGE ────────────────────────────────────────────────────────────────
  {
    id: 'banner', cat: 'sign', image: '/products/banner.png', name: 'Banner', purchasable: true,
    specs: ['PVC oder Textil', 'Ösen auf Wunsch', 'Innen- & Außeneinsatz', 'Beliebige Maße'],
    basePrice: 49,
    steps: [
      { key: 'format', opts: [
        { id: '60x100',  label: '60 × 100 cm',  sub: 'Klein',       p: 0  },
        { id: '80x200',  label: '80 × 200 cm',  sub: 'Standard',    p: 28 },
        { id: '100x300', label: '100 × 300 cm', sub: 'Groß',        p: 58 },
        { id: 'custom',  label: 'Sondermaß',    sub: 'Nach Wunsch', p: 22 },
      ]},
      { key: 'qty', opts: [
        { id: '1',  label: '1 Stk.',  sub: '',          p: 0   },
        { id: '2',  label: '2 Stk.',  sub: '',          p: 38  },
        { id: '5',  label: '5 Stk.',  sub: '',          p: 78  },
        { id: '10', label: '10 Stk.', sub: 'Sparpaket', p: 138 },
      ]},
      { key: 'material', opts: [
        { id: 'pvc',    label: 'PVC 510g',      sub: 'Standard & robust', p: 0  },
        { id: 'mesh',   label: 'Mesh-PVC',      sub: 'Winddurchlässig',   p: 12 },
        { id: 'textil', label: 'Textilbanner',  sub: 'Hochwertig',        p: 32 },
        { id: 'flex',   label: 'Frontlit 540g', sub: 'Für Beleuchtung',   p: 18 },
      ]},
    ],
  },
  {
    id: 'rollup', cat: 'sign', image: '/products/rollup.png', name: 'Roll-Up', purchasable: true,
    specs: ['85 × 200 cm Standard', 'Inkl. Tragetasche', 'Stabil & langlebig', '1–5 Werktage'],
    basePrice: 109,
    steps: [
      { key: 'format', opts: [
        { id: '85',  label: '85 × 200 cm',  sub: 'Standard',    p: 0  },
        { id: '100', label: '100 × 200 cm', sub: 'Breit',       p: 32 },
        { id: '120', label: '120 × 200 cm', sub: 'Extra breit', p: 58 },
        { id: '150', label: '150 × 200 cm', sub: 'XXL',         p: 98 },
      ]},
      { key: 'qty', opts: [
        { id: '1', label: '1 Stk.', sub: '',           p: 0   },
        { id: '2', label: '2 Stk.', sub: '',           p: 92  },
        { id: '3', label: '3 Stk.', sub: '',           p: 128 },
        { id: '5', label: '5 Stk.', sub: 'Sparpaket',  p: 195 },
      ]},
      { key: 'material', opts: [
        { id: 'eco',  label: 'Eco',      sub: 'Budget',             p: 0  },
        { id: 'std',  label: 'Standard', sub: 'Empfohlen',          p: 22 },
        { id: 'prem', label: 'Premium',  sub: 'Doppelseitig mögl.', p: 52 },
        { id: 'out',  label: 'Outdoor',  sub: 'Wetterfest',         p: 75 },
      ]},
    ],
  },
  {
    id: 'pvcsign', cat: 'sign', image: '/products/pvc_schild.png', name: 'PVC-Schild', purchasable: true,
    specs: ['3–5 mm Hartschaum / PVC', 'Wetterfest & UV-stabil', 'Bohrungen auf Wunsch', 'Beliebige Größen'],
    basePrice: 45,
    steps: [
      { key: 'format', opts: [
        { id: 'a3',     label: 'A3 (30×42cm)', sub: '',            p: 0  },
        { id: 'a2',     label: 'A2 (42×59cm)', sub: '',            p: 22 },
        { id: 'a1',     label: 'A1 (59×84cm)', sub: '',            p: 45 },
        { id: '50x70',  label: '50 × 70 cm',  sub: '',            p: 35 },
        { id: '70x100', label: '70 × 100 cm', sub: '',            p: 68 },
        { id: 'custom', label: 'Sondermaß',   sub: 'Nach Wunsch', p: 28 },
      ]},
      { key: 'qty', opts: [
        { id: '1',  label: '1 Stk.',  sub: '',          p: 0   },
        { id: '3',  label: '3 Stk.',  sub: '',          p: 38  },
        { id: '5',  label: '5 Stk.',  sub: '',          p: 62  },
        { id: '10', label: '10 Stk.', sub: 'Sparpaket', p: 108 },
      ]},
      { key: 'material', opts: [
        { id: 'hs3',   label: 'Hartschaum 3mm', sub: 'Leicht, indoor', p: 0  },
        { id: 'hs5',   label: 'Hartschaum 5mm', sub: 'Stabiler',       p: 12 },
        { id: 'alu',   label: 'Aluminium 2mm',  sub: 'Langlebig',      p: 45 },
        { id: 'acryl', label: 'Acrylglas',      sub: 'Premium-Optik',  p: 72 },
      ]},
    ],
  },
  {
    id: 'fensterfolie', cat: 'sign', image: '/products/fensterfolie.png', name: 'Fensterfolie', purchasable: false,
    specs: ['Innen- oder Außenmontage', 'Vollflächig od. perforiert', 'Milchglas, Dekor, Bedruckt', 'Inkl. Montageservice'],
    basePrice: 79,
    steps: [
      { key: 'format', opts: [
        { id: '1',    label: 'bis 1 m²',      sub: 'Klein',       p: 0   },
        { id: '3',    label: '1 – 3 m²',      sub: 'Schaufenster',p: 68  },
        { id: '5',    label: '3 – 5 m²',      sub: 'Groß',        p: 135 },
        { id: 'more', label: 'Mehr als 5 m²', sub: 'Auf Anfrage', p: 0   },
      ]},
      { key: 'qty', opts: [
        { id: '1',    label: '1 Fenster',  sub: '',            p: 0  },
        { id: '2',    label: '2 Fenster',  sub: '',            p: 58 },
        { id: '3',    label: '3 Fenster',  sub: '',            p: 95 },
        { id: 'more', label: 'Mehr als 3', sub: 'Auf Anfrage', p: 0  },
      ]},
      { key: 'material', opts: [
        { id: 'milch', label: 'Milchglas',        sub: 'Sichtschutz',          p: 0  },
        { id: 'dekor', label: 'Dekorfolie',        sub: 'Muster & Farben',      p: 15 },
        { id: 'druck', label: 'Bedruckte Folie',   sub: 'Individuelles Motiv',  p: 35 },
        { id: 'perf',  label: 'Perforierte Folie', sub: 'Sicht von innen frei', p: 42 },
      ]},
    ],
  },
  {
    id: 'autobeschriftung', cat: 'sign', image: '/products/autobeschriftung.png', name: 'Autobeschriftung', purchasable: false,
    specs: ['Schrift, Logo & Text', 'PKW, Transporter & LKW', 'Wetterfest & UV-beständig', 'Inkl. Montage vor Ort'],
    basePrice: 89,
    steps: [
      { key: 'format', opts: [
        { id: 'schrift',  label: 'Schriftzug',      sub: 'Nur Text / Firmenname', p: 0   },
        { id: 'logo',     label: 'Logo + Text',     sub: 'Logo & Kontaktdaten',   p: 60  },
        { id: 'rundrum',  label: 'Rundum-Satz',     sub: 'Alle Seiten bedruckt',  p: 120 },
        { id: 'magnet',   label: 'Magnetschilder',  sub: 'Abnehmbar, 2 Stück',   p: 40  },
      ]},
      { key: 'qty', opts: [
        { id: '1',    label: '1 Fahrzeug',    sub: '',              p: 0   },
        { id: '2',    label: '2 Fahrzeuge',   sub: '',              p: 75  },
        { id: '5',    label: '5 Fahrzeuge',   sub: 'Flottenrabatt', p: 165 },
        { id: 'mehr', label: '10+ Fahrzeuge', sub: 'Auf Anfrage',   p: 0   },
      ]},
      { key: 'material', opts: [
        { id: 'plotter', label: 'Plotterfolie',      sub: 'Weiß, schwarz od. farbig', p: 0  },
        { id: 'digi',    label: 'Digitaldruck',      sub: 'Vollfarbig, fotorealistisch',p: 35 },
        { id: 'reflex',  label: 'Reflexfolie',       sub: 'Leuchtet im Dunkeln',      p: 45 },
        { id: 'gold',    label: 'Gold / Silber',     sub: 'Metallic-Optik',           p: 30 },
      ]},
    ],
  },
  {
    id: 'sonnenschutz', cat: 'sign', image: '/products/sonnenschutzfolie.png', name: 'Sonnenschutzfolie', purchasable: false,
    specs: ['Max. Breite 1,52 m', 'Innen- oder Außenmontage', 'UV-Schutz bis 99%', 'Inkl. Montageservice'],
    basePrice: 79,
    steps: [
      { key: 'format', opts: [
        { id: '1qm',  label: 'bis 1 m²',  sub: 'Kleines Fenster', p: 0   },
        { id: '3qm',  label: '1 – 3 m²',  sub: 'Standard',        p: 88  },
        { id: '5qm',  label: '3 – 5 m²',  sub: 'Großes Fenster',  p: 168 },
        { id: '10qm', label: '5 – 10 m²', sub: 'Fassade',         p: 295 },
      ]},
      { key: 'qty', opts: [
        { id: '1',    label: '1 Fenster',  sub: '',            p: 0   },
        { id: '2',    label: '2 Fenster',  sub: '',            p: 65  },
        { id: '3',    label: '3 Fenster',  sub: '',            p: 115 },
        { id: 'mehr', label: 'Mehr als 3', sub: 'Auf Anfrage', p: 0   },
      ]},
      { key: 'material', opts: [
        { id: 'hell',    label: 'Hell (35% Tönung)',   sub: 'Leichter Schutz',            p: 0  },
        { id: 'mittel',  label: 'Mittel (20% Tönung)', sub: 'Empfohlen',                  p: 22 },
        { id: 'dunkel',  label: 'Dunkel (5% Tönung)',  sub: 'Maximaler Schutz',           p: 32 },
        { id: 'spiegel', label: 'Spiegelfolie',        sub: 'Sichtschutz + Sonnenschutz', p: 55 },
      ]},
    ],
  },
  {
    id: 'fensterbeschriftung', cat: 'sign', image: '/products/fensterbeschriftung.png', name: 'Fensterbeschriftung', purchasable: false,
    specs: ['Selbstklebende Folie (Tape)', 'Schaufenster & Glasflächen', 'Innen- oder Außenmontage', 'Inkl. Montage vor Ort'],
    basePrice: 89,
    steps: [
      { key: 'format', opts: [
        { id: 'klein',   label: 'Kleines Fenster',     sub: 'bis 1 m²',    p: 0   },
        { id: 'mittel',  label: 'Mittleres Fenster',   sub: '1 – 3 m²',    p: 95  },
        { id: 'gross',   label: 'Großes Schaufenster', sub: '3 – 6 m²',    p: 195 },
        { id: 'fassade', label: 'Fassade / Mehrere',   sub: 'Auf Anfrage', p: 0   },
      ]},
      { key: 'qty', opts: [
        { id: '1',    label: '1 Fenster',  sub: '',            p: 0   },
        { id: '2',    label: '2 Fenster',  sub: '',            p: 72  },
        { id: '3',    label: '3 Fenster',  sub: '',            p: 118 },
        { id: 'mehr', label: 'Mehr als 3', sub: 'Auf Anfrage', p: 0   },
      ]},
      { key: 'material', opts: [
        { id: 'weiss',  label: 'Weiße Folie',        sub: 'Classic',           p: 0  },
        { id: 'trans',  label: 'Transparente Folie', sub: 'Unsichtbarer Rand', p: 18 },
        { id: 'gold',   label: 'Goldfolie',          sub: 'Edel & auffällig',  p: 38 },
        { id: 'silber', label: 'Silberfolie',         sub: 'Modern',            p: 28 },
      ]},
    ],
  },

  // ── TEXTILIEN ──────────────────────────────────────────────────────────────
  {
    id: 'tshirt', cat: 'textil', image: '/products/tshirt.png', name: 'T-Shirts', purchasable: true,
    specs: ['S – 5XL · viele Farben', '100% Baumwolle, 180g', 'Sieb- od. Transferdruck', 'ab 10 Stück'],
    basePrice: 149,
    steps: [
      { key: 'format', opts: [
        { id: 'rund',  label: 'Rundhals',     sub: 'Classic',  p: 0  },
        { id: 'vneck', label: 'V-Neck',       sub: 'Casual',   p: 18 },
        { id: 'polo',  label: 'Poloshirt',    sub: 'Business', p: 55 },
        { id: 'lang',  label: 'Langarmshirt', sub: 'Winter',   p: 38 },
      ]},
      { key: 'qty', opts: [
        { id: '10',  label: '10 Stk.',  sub: '14,90 € / Stk.', p: 0   },
        { id: '25',  label: '25 Stk.',  sub: '12,90 € / Stk.', p: 98  },
        { id: '50',  label: '50 Stk.',  sub: '11,90 € / Stk.', p: 178 },
        { id: '100', label: '100 Stk.', sub: '10,90 € / Stk.', p: 318 },
        { id: '250', label: '250 Stk.', sub: '9,90 € / Stk.',  p: 668 },
      ]},
      { key: 'material', opts: [
        { id: 'sieb',     label: 'Siebdruck',        sub: 'Langlebig & scharf', p: 0  },
        { id: 'dtg',      label: 'Digitaldruck DTG', sub: 'Fotorealistisch',    p: 35 },
        { id: 'transfer', label: 'Transferdruck',    sub: 'Farbintensiv',       p: 22 },
        { id: 'stick',    label: 'Stickerei',        sub: 'Premium-Look',       p: 78 },
      ]},
    ],
  },
  {
    id: 'hoodie', cat: 'textil', image: '/products/hoodie.png', name: 'Hoodies & Sweatshirts', purchasable: true,
    specs: ['S – 3XL', 'Vorder- & Rückseitendruck', 'Hochwertige Verarbeitung', 'ab 10 Stück'],
    basePrice: 289,
    steps: [
      { key: 'format', opts: [
        { id: 'hood',  label: 'Kapuzenpullover',  sub: 'Classic',           p: 0   },
        { id: 'sweat', label: 'Sweatshirt',        sub: 'Ohne Kapuze',       p: 0   },
        { id: 'zip',   label: 'Zip-Hoodie',        sub: 'Mit Reißverschluss',p: 65  },
        { id: 'soft',  label: 'Softshell-Jacke',   sub: 'Outdoor',           p: 155 },
      ]},
      { key: 'qty', opts: [
        { id: '10',  label: '10 Stk.',  sub: '28,90 € / Stk.', p: 0   },
        { id: '25',  label: '25 Stk.',  sub: '24,90 € / Stk.', p: 135 },
        { id: '50',  label: '50 Stk.',  sub: '21,90 € / Stk.', p: 248 },
        { id: '100', label: '100 Stk.', sub: '18,90 € / Stk.', p: 458 },
      ]},
      { key: 'material', opts: [
        { id: 'sieb',     label: 'Siebdruck',    sub: 'Klassisch',       p: 0  },
        { id: 'dtg',      label: 'Digitaldruck', sub: 'Fotorealistisch', p: 55 },
        { id: 'transfer', label: 'Flex-Transfer',sub: 'Edel & glatt',    p: 42 },
        { id: 'stick',    label: 'Stickerei',    sub: 'Hochwertig',      p: 98 },
      ]},
    ],
  },
  {
    id: 'workwear', cat: 'textil', image: '/products/arbeitsbekleidung.png', name: 'Arbeitsbekleidung', purchasable: true,
    specs: ['Warnschutz & Berufskleidung', 'Personalisiert mit Logo', 'Waschbeständiger Druck', 'Flottenbestellungen'],
    basePrice: 139,
    steps: [
      { key: 'format', opts: [
        { id: 'weste', label: 'Warnweste',    sub: 'EN ISO 20471', p: 0   },
        { id: 'hose',  label: 'Arbeitshose',  sub: 'Robust',       p: 65  },
        { id: 'jacke', label: 'Arbeitsjacke', sub: 'Wind & Regen', p: 135 },
        { id: 'cap',   label: 'Arbeitscap',   sub: '',             p: 22  },
      ]},
      { key: 'qty', opts: [
        { id: '5',  label: '5 Stk.',  sub: '',             p: 0   },
        { id: '10', label: '10 Stk.', sub: '',             p: 98  },
        { id: '25', label: '25 Stk.', sub: 'Flottenpaket', p: 215 },
        { id: '50', label: '50 Stk.', sub: '',             p: 395 },
      ]},
      { key: 'material', opts: [
        { id: 'trans', label: 'Transferdruck', sub: 'Standard',  p: 0  },
        { id: 'stick', label: 'Stickerei',     sub: 'Langlebig', p: 48 },
        { id: 'laser', label: 'Lasergravur',   sub: 'Schilder',  p: 75 },
      ]},
    ],
  },

  // ── PROMO ───────────────────────────────────────────────────────────────────
  {
    id: 'kugel', cat: 'promo', image: '/products/kugelschreiber.png', name: 'Kugelschreiber', purchasable: true,
    specs: ['Gravur od. Tampondruck', 'Viele Farben & Stile', 'ab 50 Stück', 'Schnelle Lieferung'],
    basePrice: 45,
    steps: [
      { key: 'format', opts: [
        { id: 'classic', label: 'Classic',  sub: '0,90 € / Stk.', p: 0  },
        { id: 'metal',   label: 'Metall',   sub: '1,50 € / Stk.', p: 30 },
        { id: 'touch',   label: 'Touchpen', sub: '1,20 € / Stk.', p: 15 },
        { id: 'eco',     label: 'Recycled', sub: '1,00 € / Stk.', p: 5  },
      ]},
      { key: 'qty', opts: [
        { id: '50',   label: '50 Stk.',    sub: '',           p: 0   },
        { id: '100',  label: '100 Stk.',   sub: '',           p: 35  },
        { id: '250',  label: '250 Stk.',   sub: 'Bestseller', p: 88  },
        { id: '500',  label: '500 Stk.',   sub: '',           p: 158 },
        { id: '1000', label: '1.000 Stk.', sub: 'Vorteil',    p: 278 },
      ]},
      { key: 'material', opts: [
        { id: 'laser', label: 'Lasergravur', sub: 'Edel & dauerhaft', p: 0  },
        { id: 'druck', label: 'Tampondruck', sub: 'Farbig',           p: 0  },
        { id: 'praeg', label: 'Prägung',     sub: 'Reliefeffekt',     p: 12 },
      ]},
    ],
  },
  {
    id: 'tassen', cat: 'promo', image: '/products/werbetassen.png', name: 'Werbetassen', purchasable: true,
    specs: ['300 ml Keramik-Standard', 'Spülmaschinenfest', 'Innen & Außen bedruckbar', 'ab 12 Stück'],
    basePrice: 89,
    steps: [
      { key: 'format', opts: [
        { id: 'kaffee',  label: 'Kaffeetasse',  sub: '300 ml',           p: 0  },
        { id: 'jumbo',   label: 'Jumbo-Tasse',  sub: '450 ml',           p: 28 },
        { id: 'thermo',  label: 'Thermobecher', sub: '400 ml Edelstahl', p: 78 },
        { id: 'esp',     label: 'Espressotasse',sub: '100 ml',           p: 0  },
      ]},
      { key: 'qty', opts: [
        { id: '12',  label: '12 Stk.',  sub: '7,40 € / Stk.', p: 0   },
        { id: '24',  label: '24 Stk.',  sub: '6,90 € / Stk.', p: 58  },
        { id: '50',  label: '50 Stk.',  sub: '6,40 € / Stk.', p: 118 },
        { id: '100', label: '100 Stk.', sub: '5,90 € / Stk.', p: 198 },
      ]},
      { key: 'material', opts: [
        { id: 'ein',   label: 'Einseitig',    sub: '1 Motiv',     p: 0  },
        { id: 'zwei',  label: 'Zweiseitig',   sub: '2 Motive',    p: 22 },
        { id: 'rund',  label: 'Rundumdruck',  sub: '360°',        p: 42 },
        { id: 'innen', label: 'Innen farbig', sub: '+ Außendruck',p: 28 },
      ]},
    ],
  },

  // ── GASTRO ──────────────────────────────────────────────────────────────────
  {
    id: 'speisekarte', cat: 'gastro', image: '/products/speisekarten.png', name: 'Speisekarten', purchasable: true,
    specs: ['A4 od. A5 Format', 'Hard- od. Softcover', 'Wasserabweisend mögl.', 'ab 10 Stück'],
    basePrice: 45,
    steps: [
      { key: 'format', opts: [
        { id: 'a5',     label: 'DIN A5',        sub: '148 × 210 mm', p: 0  },
        { id: 'a4',     label: 'DIN A4',        sub: '210 × 297 mm', p: 12 },
        { id: 'a4quer', label: 'A4 Querformat', sub: '297 × 210 mm', p: 12 },
        { id: 'custom', label: 'Sonderformat',  sub: 'Nach Wunsch',  p: 22 },
      ]},
      { key: 'qty', opts: [
        { id: '10',  label: '10 Stk.',  sub: '', p: 0   },
        { id: '25',  label: '25 Stk.',  sub: '', p: 58  },
        { id: '50',  label: '50 Stk.',  sub: '', p: 98  },
        { id: '100', label: '100 Stk.', sub: '', p: 165 },
      ]},
      { key: 'material', opts: [
        { id: 'soft',  label: 'Softcover',  sub: 'Kostengünstig', p: 0  },
        { id: 'hard',  label: 'Hardcover',  sub: 'Langlebig',     p: 28 },
        { id: 'wipe',  label: 'Abwischbar', sub: 'Hygienisch',    p: 18 },
        { id: 'leder', label: 'Lederoptik', sub: 'Premium',       p: 52 },
      ]},
    ],
  },
  {
    id: 'untersetzer', cat: 'gastro', image: '/products/untersetzer.png', name: 'Untersetzer', purchasable: true,
    specs: ['90 × 90 mm Standard', '4-farbig bedruckt', 'Karton od. Kork', 'ab 250 Stück'],
    basePrice: 39,
    steps: [
      { key: 'format', opts: [
        { id: 'rund', label: 'Rund Ø 95mm',       sub: 'Classic', p: 0 },
        { id: 'quad', label: 'Quadrat 90×90mm',   sub: 'Modern',  p: 0 },
        { id: 'rect', label: 'Rechteck 90×120mm', sub: 'Groß',    p: 5 },
      ]},
      { key: 'qty', opts: [
        { id: '250',  label: '250 Stk.',   sub: '',           p: 0  },
        { id: '500',  label: '500 Stk.',   sub: '',           p: 25 },
        { id: '1000', label: '1.000 Stk.', sub: 'Bestseller', p: 42 },
        { id: '2500', label: '2.500 Stk.', sub: 'Vorteil',    p: 82 },
      ]},
      { key: 'material', opts: [
        { id: 'karton', label: 'Karton 2mm', sub: 'Standard',   p: 0  },
        { id: 'kork',   label: 'Kork 3mm',   sub: 'Nachhaltig', p: 9  },
        { id: 'filz',   label: 'Filz 3mm',   sub: 'Gemütlich',  p: 8  },
        { id: 'gummi',  label: 'Gummi',      sub: 'Rutschfest', p: 12 },
      ]},
    ],
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id)
}

export function calcPrice(product: Product, sels: Record<number, string>): number {
  return product.steps.reduce((sum, step, i) => {
    const opt = step.opts.find(o => o.id === sels[i])
    return sum + (opt?.p ?? 0)
  }, product.basePrice)
}

/** Prüft, ob alle Selections gültige Options-IDs sind. */
export function validSelections(product: Product, sels: Record<number, string>): boolean {
  return product.steps.every((step, i) => step.opts.some(o => o.id === sels[i]))
}

/** Lesbare Konfigurationszeilen, z.B. ["Format / Größe: DIN A5", ...] */
export function configLines(product: Product, sels: Record<number, string>): string[] {
  return product.steps.map((s, i) => {
    const opt = s.opts.find(o => o.id === sels[i])
    return `${STEP_LABELS[i]}: ${opt?.label ?? '—'}`
  })
}

export function fmtPrice(p: number): string {
  return p < 1
    ? p.toFixed(2).replace('.', ',') + ' €'
    : Math.round(p) + ' €'
}

export function fmtBrutto(p: number): string {
  return fmtPrice(p * (1 + VAT_RATE))
}

export function fmtMwSt(p: number): string {
  return fmtPrice(p * VAT_RATE)
}

/** Exakte Euro-Formatierung mit 2 Nachkommastellen (für Kasse/Bestellungen). */
export function fmtEur(p: number): string {
  return p.toFixed(2).replace('.', ',') + ' €'
}

export function shippingNetto(subtotalNetto: number, delivery: 'versand' | 'abholung'): number {
  if (delivery === 'abholung') return 0
  return subtotalNetto >= FREE_SHIPPING_NETTO ? 0 : SHIPPING_NETTO
}
