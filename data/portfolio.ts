export interface PortfolioItem {
  id: string
  title: string
  category: string
  client?: string
  image: string
  images: string[]
  description: string
  tags?: string[]
}

export const categories = [
  'Alle',
  'Fahrzeugfolierung',
  'Beschriftung',
  'Fensterfolierung',
  'Digitaldruck',
  'Leuchtreklame',
  'Innenraumgestaltung',
]

export const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: 'Sunset Drinks Vollfolierung',
    category: 'Fahrzeugfolierung',
    client: 'Sunset Drinks Mobile Cocktail Bar',
    image: '/portfolio/sunset-drinks.jpg',
    images: ['/portfolio/sunset-drinks.jpg', '/portfolio/sunset-drinks 2.jpg'],
    description:
      'VW Bus Vollfolierung in leuchtendem Rot für eine mobile Cocktailbar – inklusive Logo und Schriftzug für einen starken Markenauftritt auf der Straße.',
    tags: ['VW Bus', 'Vollfolierung', 'Rot'],
  },
  {
    id: '2',
    title: 'Hugo Pfohe KIA Flottenfolierung',
    category: 'Fahrzeugfolierung',
    client: 'Hugo Pfohe KIA',
    image: '/portfolio/hugo-pfohe-kia1 Fahrzeugfolierung.jpg',
    images: [
      '/portfolio/hugo-pfohe-kia1 Fahrzeugfolierung.jpg',
      '/portfolio/hugo-pfohe-kia2.jpg',
      '/portfolio/hugo-pfohe-kia3.jpg',
      '/portfolio/hugo-pfohe-kia4.jpg',
      '/portfolio/hugo-pfohe-kia5.jpg',
    ],
    description:
      'Flottenfolierung mehrerer KIA-Transporter in Schwarz mit Markenbeschriftung für den Hamburger Automobilhändler Hugo Pfohe.',
    tags: ['Transporter', 'Vollfolierung', 'Schwarz'],
  },
  {
    id: '3',
    title: 'EibHandWerk Fahrzeugbeschriftung',
    category: 'Fahrzeugfolierung',
    client: 'EibHandWerk',
    image: '/portfolio/elbhandwerk Fahrzeugfolierung.jpg',
    images: ['/portfolio/elbhandwerk Fahrzeugfolierung.jpg', '/portfolio/elbhandwerk1.jpg'],
    description:
      'Fahrzeugbeschriftung eines Ford Transit mit Logo, Kontaktdaten und Leistungsübersicht – sauber, professionell und dauerhaft.',
    tags: ['Ford Transit', 'Beschriftung'],
  },
  {
    id: '4',
    title: 'Il Barolo Leuchtkasten',
    category: 'Leuchtreklame',
    client: 'Ristorante Il Barolo Hamburg',
    image: '/portfolio/il-barolo-leuchtkasten1.jpg',
    images: [
      '/portfolio/il-barolo-leuchtkasten1.jpg',
      '/portfolio/il-barolo-leuchtkasten2 Leuchtreklame.jpg',
      '/portfolio/il-barolo-leuchtkasten3.jpg',
      '/portfolio/il-barolo-leuchtkasten4.jpg',
    ],
    description:
      'Leuchtkasten-Außenwerbung für das Ristorante Il Barolo in Hamburg – auffällig, witterungsbeständig und rund um die Uhr sichtbar.',
    tags: ['Leuchtkasten', 'Außenwerbung'],
  },
  {
    id: '5',
    title: 'Belvedere LED-Leuchtschild',
    category: 'Leuchtreklame',
    client: 'Ristorante Belvedere',
    image: '/portfolio/belvedere Leuchtreklame.jpg',
    images: [
      '/portfolio/belvedere Leuchtreklame.jpg',
      '/portfolio/belvedere1.jpg',
      '/portfolio/belvedere2.jpg',
      '/portfolio/belvedere4.jpg',
    ],
    description:
      'LED-Leuchtschild für das Ristorante Belvedere – modernes Design mit hoher Lichtstärke für einen eleganten Außenauftritt.',
    tags: ['LED', 'Außenwerbung', 'Restaurant'],
  },
  {
    id: '6',
    title: 'Antico Außenschild 3D-Buchstaben',
    category: 'Beschriftung',
    client: 'Restaurant Antico',
    image: '/portfolio/antico0 Leuchtreklame.jpg',
    images: [
      '/portfolio/antico0 Leuchtreklame.jpg',
      '/portfolio/antico1.jpg',
      '/portfolio/antico2.jpg',
      '/portfolio/antico3.jpg',
      '/portfolio/antico4.jpg',
      '/portfolio/antico5.jpg',
      '/portfolio/antico6.jpg',
      '/portfolio/antico7.jpg',
      '/portfolio/antico8.jpg',
    ],
    description:
      '3D-Goldbuchstaben auf Alucobond-Träger für ein elegantes Restaurant-Außenschild – hochwertig, zeitlos und weithin sichtbar.',
    tags: ['3D-Buchstaben', 'Gold', 'Alucobond'],
  },
  {
    id: '7',
    title: 'Morea Restaurant Leuchtkasten',
    category: 'Leuchtreklame',
    client: 'Restaurant Morea',
    image: '/portfolio/morea1 Leuchtreklame.jpg',
    images: ['/portfolio/morea1 Leuchtreklame.jpg', '/portfolio/morea2.jpg', '/portfolio/morea3.jpg'],
    description:
      'Leuchtkasten mit integriertem 3D-Logo für das Restaurant Morea – markante Außenwerbung mit hohem Wiedererkennungswert.',
    tags: ['Leuchtkasten', '3D-Logo'],
  },
  {
    id: '8',
    title: 'Striptease Galerie LED-Neon',
    category: 'Leuchtreklame',
    client: 'Striptease Galerie Hamburg',
    image: '/portfolio/neon-striptease.jpg',
    images: [
      '/portfolio/neon-striptease.jpg',
      '/portfolio/neon-striptease1.jpg',
      '/portfolio/neon-striptease2.jpg',
      '/portfolio/neon-striptease3.jpg',
      '/portfolio/neon-striptease4.jpg',
    ],
    description:
      'LED-Neonschrift in leuchtendem Rot – markante Außenwerbung für die Striptease Galerie Hamburg mit starker Fernwirkung.',
    tags: ['LED-Neon', 'Neonreklame', 'Rot'],
  },
  {
    id: '9',
    title: 'Vitamoment Bürofolierung',
    category: 'Fensterfolierung',
    client: 'Vitamoment',
    image: '/portfolio/vitamoment-fenster1 Fensterfolierung.jpg',
    images: [
      '/portfolio/vitamoment-fenster1 Fensterfolierung.jpg',
      '/portfolio/vitamoment-fenster2.jpg',
      '/portfolio/vitamoment-fenster3.jpg',
      '/portfolio/vitamoment-fenster4.jpg',
      '/portfolio/vitamoment-fenster5.jpg',
      '/portfolio/vitamoment-fenster6.jpg',
      '/portfolio/vitamoment-fenster7.jpg',
      '/portfolio/vitamoment-fenster8.png',
      '/portfolio/vitamoment-fenster10.jpg',
      '/portfolio/vitamoment-fenster12.jpg',
    ],
    description:
      'Milchglasfolie für Bürotüren und Glasflächen bei Vitamoment – dezenter Sichtschutz mit modernem, professionellem Look.',
    tags: ['Milchglasfolie', 'Büro', 'Glasdekor'],
  },
  {
    id: '10',
    title: 'Vitamoment Wandgestaltung',
    category: 'Innenraumgestaltung',
    client: 'Vitamoment',
    image: '/portfolio/vitamoment-wand1.jpg',
    images: [
      '/portfolio/vitamoment-wand0.jpg',
      '/portfolio/vitamoment-wand1.jpg',
      '/portfolio/vitamoment-wand2 Innenraumgestaltung.jpg',
    ],
    description:
      'Individuelle Wandfolierung mit Firmenbranding im Büro von Vitamoment – stimmungsvolles Design, das Werte und Identität sichtbar macht.',
    tags: ['Wandfolie', 'Innenraum', 'Büro'],
  },
  {
    id: '11',
    title: 'Feuerwehr Altona Großformatdruck',
    category: 'Digitaldruck',
    client: 'Freiwillige Feuerwehr Altona',
    image: '/portfolio/feuerwehr-altona 0.jpg',
    images: [
      '/portfolio/feuerwehr-altona 0.jpg',
      '/portfolio/feuerwehr-altona 1.jpg',
      '/portfolio/feuerwehr-altona 2.jpg',
      '/portfolio/feuerwehr-altona 4 Fahrzeugfolierung.jpg',
      '/portfolio/feuerwehr-altona 5.jpg',
    ],
    description:
      'Großformatiger Digitaldruck als Aufkleber für die Freiwillige Feuerwehr Altona – präzise Farben, wetterfeste Materialien.',
    tags: ['Großformat', 'Digitaldruck', 'Aufkleber'],
  },
  {
    id: '12',
    title: 'Esselmann FT5 Trailerfolierung',
    category: 'Fahrzeugfolierung',
    client: 'Esselmann',
    image: '/portfolio/esselmann-trailer Fahrzeugfolierung.jpg',
    images: ['/portfolio/esselmann-trailer Fahrzeugfolierung.jpg', '/portfolio/esselmann-trailer1.jpg'],
    description:
      'Vollfolierung eines FT5-Trailers für Esselmann – großflächige Werbebeschriftung mit professioneller Verarbeitung und langer Haltbarkeit.',
    tags: ['Trailer', 'Vollfolierung', 'Werbung'],
  },
  {
    id: '13',
    title: 'GYM Logo Wandmontage',
    category: 'Innenraumgestaltung',
    client: 'Fitness-Studio',
    image: '/portfolio/gym-wand.jpg',
    images: ['/portfolio/gym-wand.jpg'],
    description:
      'Wandmontage eines Fitness-Studio-Logos aus stabilen 3D-Buchstabenelementen – ein echter Hingucker im Eingangsbereich.',
    tags: ['Wandaufkleber', 'Logo', 'Innenraum'],
  },
  {
    id: '14',
    title: 'Büro Trennwandfolierung',
    category: 'Fensterfolierung',
    client: 'Büroprojekt Hamburg',
    image: '/portfolio/buero-glasfolie.jpg',
    images: ['/portfolio/buero-glasfolie.jpg'],
    description:
      'Sichtschutzfolierung auf Glastrennwänden in einem Hamburger Büroprojekt – funktional, modern und ansprechend gestaltet.',
    tags: ['Glasdekor', 'Trennwand', 'Sichtschutz'],
  },
  {
    id: '15',
    title: 'Große Freiheit Außenwerbung',
    category: 'Leuchtreklame',
    client: 'Große Freiheit Hamburg',
    image: '/portfolio/Große Freiheit1 Leuchtreklame.jpg',
    images: [
      '/portfolio/Große Freiheit1 Leuchtreklame.jpg',
      '/portfolio/Große Freiheit2.jpg',
      '/portfolio/Große Freiheit3.jpg',
      '/portfolio/Große Freiheit4.jpg',
    ],
    description:
      'Leuchtreklame und Außenwerbung für einen Betrieb auf der Großen Freiheit in Hamburg – auffälliges Design für maximale Sichtbarkeit im belebten Kiez.',
    tags: ['Leuchtreklame', 'Außenwerbung', 'Hamburg'],
  },
  {
    id: '16',
    title: 'GoldenCut Nightclub Beschilderung',
    category: 'Leuchtreklame',
    client: 'GoldenCut Nightclub',
    image: '/portfolio/GoldenCut Nightclub1 Fensterfolierung.jpg',
    images: [
      '/portfolio/GoldenCut Nightclub1 Fensterfolierung.jpg',
      '/portfolio/GoldenCut Nightclub2.jpg',
      '/portfolio/GoldenCut Nightclub3.jpg',
    ],
    description:
      'Hochwertige Leuchtreklame und Eingangsbeschilderung für den GoldenCut Nightclub – markantes Erscheinungsbild für eine starke Präsenz in der Nacht.',
    tags: ['Nightclub', 'Leuchtreklame', 'Neon'],
  },
  {
    id: '17',
    title: 'Luxury Beauty Salon Beschriftung',
    category: 'Beschriftung',
    client: 'Luxury Beauty Salon',
    image: '/portfolio/Luxury Beauty Salon.jpg',
    images: [
      '/portfolio/Luxury Beauty Salon.jpg',
      '/portfolio/Luxury Beauty Salon 2 Leuchtreklame.jpg',
      '/portfolio/Luxury Beauty Salon3.jpg',
    ],
    description:
      'Elegante Außenbeschriftung und Schaufenstergestaltung für einen Luxury Beauty Salon – edles Design, das die Hochwertigkeit der Marke widerspiegelt.',
    tags: ['Beschriftung', 'Schaufenster', 'Beauty'],
  },
  {
    id: '18',
    title: 'Bodrum Caffe & Bar Leuchtreklame',
    category: 'Leuchtreklame',
    client: 'Bodrum Caffe & Bar',
    image: '/portfolio/Bodrum caffe & bar.jpg',
    images: [
      '/portfolio/Bodrum caffe & bar.jpg',
      '/portfolio/Bodrum caffe & bar 2 Leuchtreklame.jpg',
    ],
    description:
      'Leuchtende Außenwerbung für das Bodrum Caffe & Bar – stilvolle Reklame, die Gäste bei Tag und Nacht anspricht.',
    tags: ['Leuchtkasten', 'Bar', 'Außenwerbung'],
  },
  {
    id: '19',
    title: 'LaserRoom Innenraumgestaltung',
    category: 'Innenraumgestaltung',
    client: 'LaserRoom',
    image: '/portfolio/LaserRoom0.jpg',
    images: [
      '/portfolio/LaserRoom0.jpg',
      '/portfolio/LaserRoom1.jpg',
      '/portfolio/LaserRoom 1 Leuchtreklame.jpg',
      '/portfolio/LaserRoom 2 photoshop.jpg',
      '/portfolio/LaserRoom 3.jpg',
    ],
    description:
      'Komplette Innenraumgestaltung für den LaserRoom – intensive Wandfolierung und Grafikdesign für ein einzigartiges Ambiente.',
    tags: ['Innenraum', 'Wandfolie', 'Design'],
  },
  {
    id: '20',
    title: "Shooter's Disco Außenwerbung",
    category: 'Leuchtreklame',
    client: "Shooter's Disco",
    image: "/portfolio/Shooter's Disco.jpg",
    images: ["/portfolio/Shooter's Disco.jpg"],
    description:
      "Auffällige Außenwerbung für Shooter's Disco – prägnantes Schild mit starker Fernwirkung für den Nachtbetrieb.",
    tags: ['Disco', 'Leuchtreklame', 'Nacht'],
  },
  {
    id: '21',
    title: 'RiverSide Hotel Hamburg',
    category: 'Beschriftung',
    client: 'RiverSide Hotel Hamburg',
    image: '/portfolio/RiverSide Hotel Hamburg.jpg',
    images: [
      '/portfolio/RiverSide Hotel Hamburg.jpg',
      '/portfolio/RiverSide Hotel Hamburg2.jpg',
    ],
    description:
      'Professionelle Außenbeschriftung und Beschilderung für das RiverSide Hotel Hamburg – hochwertiges Erscheinungsbild für einen starken ersten Eindruck.',
    tags: ['Hotel', 'Beschriftung', 'Außenwerbung'],
  },
  {
    id: '22',
    title: 'Empire Riverside Hotel Beschilderung',
    category: 'Beschriftung',
    client: 'Empire Riverside Hotel',
    image: '/portfolio/Empire Riverside Hotel fenster.jpg',
    images: [
      '/portfolio/Empire Riverside Hotel fenster.jpg',
      '/portfolio/Empire Riverside Hotel2.jpg',
      '/portfolio/Empire Riverside Hote 2.jpg',
      '/portfolio/Empire Riverside Hotel4.jpg',
    ],
    description:
      'Hochwertige Hotelbeschilderung und Außenbeschriftung für das Empire Riverside Hotel – elegantes Design, das dem Renommee des Hauses entspricht.',
    tags: ['Hotel', 'Beschriftung', 'Premium'],
  },
  {
    id: '23',
    title: 'BO Hotel Sonnenschutzfolierung',
    category: 'Fensterfolierung',
    client: 'BO Hotel',
    image: '/portfolio/BO Hotel Sonneschutz Fensterfolierung.jpg',
    images: [
      '/portfolio/BO Hotel Sonneschutz Fensterfolierung.jpg',
      '/portfolio/BO Hotel Sonneschutz1.jpg',
      '/portfolio/BO Hotel Sonneschutz2.jpg',
    ],
    description:
      'Sonnenschutzfolierung für großflächige Hotelfenster im BO Hotel – effektiver Schutz vor Hitze und Blendung bei klarem, modernem Look.',
    tags: ['Sonnenschutz', 'Hotel', 'Fensterfolie'],
  },
  {
    id: '24',
    title: 'Möbel Folierung',
    category: 'Innenraumgestaltung',
    client: 'Privatkunde',
    image: '/portfolio/Mobel Folie  Innenraumgestaltung.jpg',
    images: [
      '/portfolio/Mobel Folie  Innenraumgestaltung.jpg',
      '/portfolio/Mobel Folie2  Innenraumgestaltung.jpg',
      '/portfolio/Mobel Folieren0 Innenraumgestaltung.jpg',
      '/portfolio/Mobel Folieren1.jpg',
      '/portfolio/Mobel Folieren2.jpg',
      '/portfolio/Mobel Folieren3.jpg',
    ],
    description:
      'Individuelle Möbelfolierung für Privatkunden – Küchen, Schränke und Oberflächen in neuem Look ohne teure Neuanschaffung.',
    tags: ['Möbel', 'Folie', 'Innenraum'],
  },
  {
    id: '25',
    title: 'Espressomobil Vollfolierung',
    category: 'Fahrzeugfolierung',
    client: 'Espressomobil',
    image: '/portfolio/Espressomobil0.jpg',
    images: [
      '/portfolio/Espressomobil0.jpg',
      '/portfolio/Espressomobil2.jpg',
      '/portfolio/Espressomobil3.jpg',
      '/portfolio/Espressomobil4.jpg',
      '/portfolio/Espressomobil5.jpg',
    ],
    description:
      'Auffällige Vollfolierung eines Espressomobils – starke Markenidentität auf Rädern für maximale Aufmerksamkeit auf der Straße.',
    tags: ['Vollfolierung', 'Fahrzeug', 'Werbung'],
  },
  {
    id: '26',
    title: 'Fitness Studio Fensterfolierung',
    category: 'Fensterfolierung',
    client: 'Fitness Studio',
    image: '/portfolio/Fitness2 Fensterfolierung.jpg',
    images: [
      '/portfolio/Fitness2 Fensterfolierung.jpg',
      '/portfolio/Fitness1 Sonnenschutz sichschutz.jpg',
      '/portfolio/Fitness1 Sonnenschutz sichschutz 5.jpg',
      '/portfolio/Fitness3.jpg',
    ],
    description:
      'Sonnenschutz- und Sichtschutzfolierung für ein Fitness Studio – professionelles Erscheinungsbild mit Privatsphäre für die Mitglieder.',
    tags: ['Sonnenschutz', 'Sichtschutz', 'Fitness'],
  },
  {
    id: '27',
    title: 'Mercedes Fahrzeugfolierung',
    category: 'Fahrzeugfolierung',
    client: 'Privatkunde',
    image: '/portfolio/mercedes auto folieren 0 Fahrzeugfolierung.jpg',
    images: [
      '/portfolio/mercedes auto folieren 0 Fahrzeugfolierung.jpg',
      '/portfolio/mercedes auto folieren 1.jpg',
      '/portfolio/mercedes auto folieren 2.jpg',
      '/portfolio/mercedes auto folieren3.jpg',
    ],
    description:
      'Hochwertige Fahrzeugfolierung eines Mercedes – makellose Verarbeitung für einen neuen Look mit vollem Lackschutz.',
    tags: ['Mercedes', 'Vollfolierung', 'Premium'],
  },
  {
    id: '28',
    title: 'Pflege Auto Fahrzeugbeschriftung',
    category: 'Fahrzeugfolierung',
    client: 'Pflegedienst',
    image: '/portfolio/Pflege Auto folieren1 Fahrzeugfolierung.jpg',
    images: [
      '/portfolio/Pflege Auto folieren1 Fahrzeugfolierung.jpg',
      '/portfolio/Pflege Auto folieren.jpg',
      '/portfolio/Pflege Auto folieren3.jpg',
      '/portfolio/Pflege Auto folieren4.jpg',
      '/portfolio/Pflege Auto folieren5.jpg',
    ],
    description:
      'Fahrzeugbeschriftung und -folierung für einen Pflegedienst – professionelles Erscheinungsbild für die tägliche Arbeit auf Hamburgs Straßen.',
    tags: ['Beschriftung', 'Pflege', 'Fahrzeug'],
  },
  {
    id: '29',
    title: 'NikkiTiger Nightclub Spiegeleffekt',
    category: 'Fensterfolierung',
    client: 'NikkiTiger Night Club',
    image: '/portfolio/NikkiTiger night club Spiegel EFFEKT 3D Fensterfolierung.jpg',
    images: ['/portfolio/NikkiTiger night club Spiegel EFFEKT 3D Fensterfolierung.jpg'],
    description:
      'Spektakuläre Spiegeleffekt-Fensterfolierung mit 3D-Wirkung für den NikkiTiger Night Club – einzigartiges Erscheinungsbild für den Nachtbetrieb.',
    tags: ['Spiegeleffekt', '3D', 'Nightclub'],
  },
  {
    id: '30',
    title: 'Wand 3D Buchstaben',
    category: 'Innenraumgestaltung',
    client: 'Gewerbekunde',
    image: '/portfolio/wand 3d buschtaben Innenraumgestaltung.jpg',
    images: [
      '/portfolio/wand 3d buschtaben Innenraumgestaltung.jpg',
      '/portfolio/wand 3d buschtaben1.jpg',
      '/portfolio/wand 3d buschtaben2.jpg',
    ],
    description:
      'Dreidimensionale Wandbuchstaben für die Innenraumgestaltung – beeindruckende Präsenz und hochwertiger Markenauftritt im Eingangsbereich.',
    tags: ['3D-Buchstaben', 'Wandgestaltung', 'Innenraum'],
  },
]
