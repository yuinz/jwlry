import { Collection, JewelryPiece, CraftChapter, AtelierLocation } from '../types';

// Asset paths generated via Gemini image tool
import heroRingImg from '../assets/images/aurelia_hero_ring_1786321414759.jpg';
import atelierCraftImg from '../assets/images/aurelia_craft_atelier_1786321425121.jpg';
import emeraldPendantImg from '../assets/images/aurelia_emerald_pendant_1786321436545.jpg';

export const COLLECTIONS: Collection[] = [
  {
    id: 'col-heritage',
    slug: 'heritage',
    name: 'Heritage Solitaire',
    tagline: 'Timeless Geometry & Uncut Brilliance',
    description: 'Sculpted from 100% recycled 18k molten gold and hand-selected D-color flawless diamonds. A homage to classical Geneva high jewelry ateliers.',
    heroImage: heroRingImg,
    category: 'Rings',
    pieceCount: 6,
    featured: true,
    craftConnectionTitle: 'The Geneva Prong Sculpting Process'
  },
  {
    id: 'col-emerald',
    slug: 'imperial-emeralds',
    name: 'Imperial Emeralds',
    tagline: 'Deep Colombian Green & Micro Diamond Haloes',
    description: 'Mined from conflict-free ethically certified Muzo veins. Each emerald exhibits an intense velvet green glow enveloped in pear-cut pavé frames.',
    heroImage: emeraldPendantImg,
    category: 'Necklaces',
    pieceCount: 5,
    featured: true,
    craftConnectionTitle: 'Ethical Muzo Gemstone Selection'
  },
  {
    id: 'col-cosmic',
    slug: 'cosmic-gold',
    name: 'Cosmic Gold',
    tagline: 'Fluid Metal Formations & Celestial Symmetry',
    description: 'Inspired by meteor shower trajectories and raw celestial bodies. Fluid, tactile gold curves that hug the contours of the wearer.',
    heroImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200',
    category: 'Bracelets',
    pieceCount: 4,
    featured: true,
    craftConnectionTitle: 'Molten Gold Lost-Wax Casting'
  },
  {
    id: 'col-timepieces',
    slug: 'celestial-timepieces',
    name: 'Celestial Horology',
    tagline: 'Tourbillon Precision Meets Haute Joaillerie',
    description: 'Ultra-thin mechanical movements encased in sapphire crystal and baguette diamond bezels, hand-assembled in our Vallée de Joux workshop.',
    heroImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200',
    category: 'Timepieces',
    pieceCount: 3,
    featured: false,
    craftConnectionTitle: ' Vallée de Joux Horology'
  }
];

export const JEWELRY_PIECES: JewelryPiece[] = [
  {
    id: 'piece-solitaire-solene',
    slug: 'solene-solitaire-ring',
    title: 'Solène Grand Solitaire',
    collectionSlug: 'heritage',
    collectionName: 'Heritage Solitaire',
    category: 'Rings',
    priceDisplay: '$38,500',
    numericPrice: 38500,
    shortDescription: 'A 3.5-carat D-IF oval-cut diamond elevated by six handcrafted micro-prongs on molten 18k yellow gold.',
    story: 'Conceived in our Geneva atelier, the Solène ring reinterprets the classic solitaire with a floating basket design that invites light to pass unimpeded through the diamond’s pavilion.',
    metalOptions: ['18k Yellow Gold', '18k Rose Gold', 'Platinum 950', '18k White Gold'],
    gemstoneOptions: ['Flawless Diamond', 'Royal Sapphire'],
    defaultMetal: '18k Yellow Gold',
    defaultGemstone: 'Flawless Diamond',
    images: [
      heroRingImg,
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=1000'
    ],
    certifications: ['GIA Report #2215894102', '100% Conflict-Free Diamond', 'Geneva Hallmark Seal'],
    specs: {
      caratWeight: '3.52 Carats',
      clarity: 'Internally Flawless (IF)',
      cut: 'Ideal Oval Brilliant',
      dimensions: '11.8mm x 8.2mm',
      weight: '8.4g Gold',
      origin: 'Ethically Sourced Botswana'
    },
    sizeOptions: ['US 5', 'US 6', 'US 7', 'US 8', 'Custom Size'],
    featured: true,
    inStock: true,
    provenance: 'Handcrafted in Geneva, 2026. Certified Fairmined Gold.'
  },
  {
    id: 'piece-emerald-pendant-imperial',
    slug: 'imperial-emerald-pendant',
    title: 'L’Émeraude Impériale Pendant',
    collectionSlug: 'imperial-emeralds',
    collectionName: 'Imperial Emeralds',
    category: 'Necklaces',
    priceDisplay: '$64,000',
    numericPrice: 64000,
    shortDescription: '5.2-carat untreated Colombian emerald surrounded by marquise-cut diamond rays on a fine gold chain.',
    story: 'Featuring an exceptional vivid green Muzo emerald with zero heat or resin treatment. The geometric diamond halo pays homage to French Art Deco high jewelry.',
    metalOptions: ['18k Yellow Gold', 'Platinum 950'],
    gemstoneOptions: ['Imperial Emerald'],
    defaultMetal: '18k Yellow Gold',
    defaultGemstone: 'Imperial Emerald',
    images: [
      emeraldPendantImg,
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1611591475111-e18e8012674e?auto=format&fit=crop&q=80&w=1000'
    ],
    certifications: ['SSEF Swiss Gemmological Report', 'Gubelin Provenance Certification'],
    specs: {
      caratWeight: '5.24 Carats Emerald + 2.10ct Diamonds',
      clarity: 'Minor Natural Jardin (Vivid Green)',
      cut: 'Emerald Cut',
      origin: 'Muzo Mine, Colombia'
    },
    featured: true,
    inStock: true,
    provenance: 'Custom commission from Geneva Private Reserve.'
  },
  {
    id: 'piece-cosmic-bangle',
    slug: 'nebula-gold-cuff',
    title: 'Nebula Sculpted Gold Cuff',
    collectionSlug: 'cosmic-gold',
    collectionName: 'Cosmic Gold',
    category: 'Bracelets',
    priceDisplay: '$18,200',
    numericPrice: 18200,
    shortDescription: 'Organic fluid molten gold cuff with pavé diamond dust detailing along the interior curve.',
    story: 'Cast using the traditional lost-wax method, each cuff bears subtle hand-hammered striations that mirror the natural luminescence of cosmic nebulae.',
    metalOptions: ['18k Yellow Gold', '18k Rose Gold'],
    gemstoneOptions: ['Flawless Diamond'],
    defaultMetal: '18k Yellow Gold',
    defaultGemstone: 'Flawless Diamond',
    images: [
      'https://images.unsplash.com/photo-1611591475111-e18e8012674e?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1000'
    ],
    certifications: ['Fairmined Gold Standard Seal'],
    specs: {
      weight: '42.5g Solid Gold',
      caratWeight: '0.85ct Diamond Dust',
      dimensions: 'Inner Diameter 58mm'
    },
    sizeOptions: ['Small (15cm)', 'Medium (17cm)', 'Large (19cm)'],
    featured: true,
    inStock: true,
    provenance: 'Formed in Paris Atelier, Place Vendôme.'
  },
  {
    id: 'piece-sapphire-earrings',
    slug: 'celestial-sapphire-drops',
    title: 'Céleste Sapphire Drop Earrings',
    collectionSlug: 'heritage',
    collectionName: 'Heritage Solitaire',
    category: 'Earrings',
    priceDisplay: '$29,000',
    numericPrice: 29000,
    shortDescription: 'Unheated Sri Lankan royal blue sapphires suspended beneath pear-cut diamond studs.',
    story: 'Designed to sway effortlessly with movement, these drops celebrate the contrast between velvety blue cornflower sapphires and icy brilliant diamonds.',
    metalOptions: ['Platinum 950', '18k White Gold'],
    gemstoneOptions: ['Royal Sapphire'],
    defaultMetal: 'Platinum 950',
    defaultGemstone: 'Royal Sapphire',
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1000'
    ],
    certifications: ['AGL Ceylon Sapphire Report', 'Conflict-Free Platinum'],
    specs: {
      caratWeight: '6.40ct Sapphires + 1.80ct Diamonds',
      clarity: 'Eye-Clean Royal Blue',
      cut: 'Pear Cut'
    },
    featured: false,
    inStock: true,
    provenance: 'Ceylon Origin, Certified Unheated.'
  },
  {
    id: 'piece-tourbillon-timepiece',
    slug: 'aurelia-tourbillon-volant',
    title: 'Aurelia Tourbillon Volant No. 1',
    collectionSlug: 'celestial-timepieces',
    collectionName: 'Celestial Horology',
    category: 'Timepieces',
    priceDisplay: '$145,000',
    numericPrice: 145000,
    shortDescription: 'Flying tourbillon watch with meteorite dial and hand-engraved 18k rose gold bridges.',
    story: 'A limited edition of only 8 pieces worldwide. The flying tourbillon cage rotates once every 60 seconds against a genuine Muonionalusta meteorite dial slice.',
    metalOptions: ['18k Rose Gold', 'Platinum 950'],
    gemstoneOptions: ['Flawless Diamond'],
    defaultMetal: '18k Rose Gold',
    defaultGemstone: 'Flawless Diamond',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1000'
    ],
    certifications: ['Poinçon de Genève', 'COSC Chronometer Certified'],
    specs: {
      dimensions: '40mm Diameter, 8.9mm Thickness',
      weight: 'Manual Wind Mechanical Caliber AUR-01',
      origin: 'Vallée de Joux, Switzerland'
    },
    featured: true,
    inStock: true,
    provenance: 'Numbered 03/08. Hand-signed by Master Horologist.'
  },
  {
    id: 'piece-ruby-eternity',
    slug: 'blood-ruby-eternity-band',
    title: 'L’Amour Ruby Eternity Band',
    collectionSlug: 'heritage',
    collectionName: 'Heritage Solitaire',
    category: 'Rings',
    priceDisplay: '$22,500',
    numericPrice: 22500,
    shortDescription: 'Pigeon blood Burmese rubies channel-set in high-polish 18k rose gold.',
    story: 'Seamlessly aligned rubies of vibrant crimson intensity, handset with zero gap between stones to capture an uninterrupted ribbon of red radiance.',
    metalOptions: ['18k Rose Gold', '18k Yellow Gold', 'Platinum 950'],
    gemstoneOptions: ['Pigeon Blood Ruby'],
    defaultMetal: '18k Rose Gold',
    defaultGemstone: 'Pigeon Blood Ruby',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=1000'
    ],
    certifications: ['Lotus Gemology Pigeon Blood Certificate'],
    specs: {
      caratWeight: '4.10 Carats Total Ruby Weight',
      clarity: 'Natural Vivid Red',
      cut: 'Princess Cut Channel'
    },
    sizeOptions: ['US 5', 'US 6', 'US 7', 'US 8'],
    featured: false,
    inStock: true,
    provenance: 'Mogok Reserve Gemstone Vault.'
  }
];

export const CRAFT_CHAPTERS: CraftChapter[] = [
  {
    id: 'chapter-1',
    number: 'I',
    title: 'The Sacred Metallurgy',
    subtitle: '100% Fairmined Molten Gold Refinement',
    description: 'Before a gemstone is selected, gold is heated in small graphite crucibles to 1,064°C. Our metallurgy masters fuse pure recycled gold with silver and copper alloys to produce Aurelia’s signature warm honey hue.',
    mediaUrl: atelierCraftImg,
    quote: 'Gold has memory. When heated with respect, it flows into forms that endure for centuries.',
    artisanName: 'Henri Laurent',
    artisanRole: 'Master Metallurgist (34 Years)',
    hotspots: [
      {
        id: 'hs-1',
        x: 35,
        y: 45,
        title: 'Crucible Temperature Control',
        description: 'Infrared temperature sensing maintains precisely 1,064°C to prevent thermal stress in gold lattice structures.'
      },
      {
        id: 'hs-2',
        x: 70,
        y: 60,
        title: 'Hand-Poured Ingot Casting',
        description: 'Molten alloy is poured into pre-heated iron molds to eliminate microscopic air pockets.'
      }
    ]
  },
  {
    id: 'chapter-2',
    number: 'II',
    title: 'The Diamond Selection',
    subtitle: 'Top 0.01% Type IIa Flawless Crystals',
    description: 'Fewer than 1 in 10,000 diamonds meet Aurelia’s standards for optical purity. We inspect each stone under 100x polarized magnification to verify structural crystal harmony and light transmission.',
    mediaUrl: heroRingImg,
    quote: 'We do not sell stones that hide inclusions behind prongs. Every diamond must shine in absolute nakedness.',
    artisanName: 'Claire Vance',
    artisanRole: 'Chief Gemmologist',
    hotspots: [
      {
        id: 'hs-3',
        x: 50,
        y: 38,
        title: 'Table-Facet Symmetry Inspection',
        description: 'Laser reflection analysis ensures 57 perfectly proportional facets aligned within 0.002mm.'
      }
    ]
  },
  {
    id: 'chapter-3',
    number: 'III',
    title: 'The Micro-Pavé Setting',
    subtitle: 'Microscopic Precision Under Stereo Lenses',
    description: 'Using high-power binocular microscopes, our setter carves minute gold beads from the surrounding metal to clamp each diamond securely without bulky hardware.',
    mediaUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1200',
    quote: 'A great setting feels weightless. You should see the brilliance of the diamonds, not the metal holding them.',
    artisanName: 'Marc-Antoine Dupont',
    artisanRole: 'Head Setter',
    hotspots: [
      {
        id: 'hs-4',
        x: 60,
        y: 50,
        title: 'Micro-Bead Burring',
        description: 'Tungsten carbide gravers shave 0.15mm gold threads that are folded directly over the diamond girdle.'
      }
    ]
  },
  {
    id: 'chapter-4',
    number: 'IV',
    title: 'The Mirror Polish & Hallmark Seal',
    subtitle: 'Walnut Shell & Rouge Wheel Finishing',
    description: 'Each piece undergoes 8 stages of hand polishing, culminating in walnut shell buffing and hand-stamping with the official Geneva Hallmark seal of perfection.',
    mediaUrl: 'https://images.unsplash.com/photo-1611591475111-e18e8012674e?auto=format&fit=crop&q=80&w=1200',
    quote: 'The final polish gives gold its liquid mirror soul.',
    artisanName: 'Sophie Moreau',
    artisanRole: 'Master Finisher',
    hotspots: [
      {
        id: 'hs-5',
        x: 42,
        y: 52,
        title: 'Poinçon de Genève Punch',
        description: 'The historic Geneva seal is struck by hand into the inner band using a tempered steel punch.'
      }
    ]
  }
];

export const SALON_LOCATIONS: AtelierLocation[] = [
  {
    id: 'loc-geneva',
    city: 'Geneva',
    salonName: 'Aurelia Flagship Salon & Atelier',
    address: '14 Rue du Rhône, 1204 Genève, Switzerland',
    phone: '+41 22 819 9000',
    email: 'geneva@aurelia-joaillerie.com',
    hours: 'Monday – Saturday: 10:00 – 19:00 (Private viewing by appointment)',
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=800',
    mapCoords: { lat: 46.2044, lng: 6.1432 }
  },
  {
    id: 'loc-paris',
    city: 'Paris',
    salonName: 'Place Vendôme Private Salon',
    address: '22 Place Vendôme, 75001 Paris, France',
    phone: '+33 1 42 68 88 00',
    email: 'paris@aurelia-joaillerie.com',
    hours: 'Tuesday – Saturday: 10:30 – 18:30',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800',
    mapCoords: { lat: 48.8675, lng: 2.3294 }
  },
  {
    id: 'loc-newyork',
    city: 'New York',
    salonName: 'Fifth Avenue Penthouse Suite',
    address: '712 Fifth Avenue, 32nd Floor, New York, NY 10019',
    phone: '+1 212 905 4400',
    email: 'newyork@aurelia-joaillerie.com',
    hours: 'Monday – Friday: 09:30 – 18:00',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    mapCoords: { lat: 40.7624, lng: -73.9738 }
  },
  {
    id: 'loc-tokyo',
    city: 'Tokyo',
    salonName: 'Ginza Tower Salon',
    address: '6-9-5 Ginza, Chuo-ku, Tokyo 104-0061',
    phone: '+81 3 5537 1100',
    email: 'tokyo@aurelia-joaillerie.com',
    hours: 'Wednesday – Sunday: 11:00 – 19:30',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800',
    mapCoords: { lat: 35.6719, lng: 139.7648 }
  }
];
