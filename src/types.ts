export type CategoryType = 'All' | 'Rings' | 'Necklaces' | 'Earrings' | 'Bracelets' | 'Timepieces' | 'Haute Joaillerie';
export type MetalType = '18k Yellow Gold' | '18k Rose Gold' | 'Platinum 950' | '18k White Gold';
export type GemstoneType = 'Flawless Diamond' | 'Imperial Emerald' | 'Royal Sapphire' | 'Pigeon Blood Ruby' | 'South Sea Pearl';

export interface Hotspot {
  id: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  title: string;
  description: string;
  detailImage?: string;
}

export interface CraftChapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  mediaUrl: string;
  quote?: string;
  artisanName?: string;
  artisanRole?: string;
  hotspots?: Hotspot[];
}

export interface JewelryPiece {
  id: string;
  slug: string;
  title: string;
  collectionSlug: string;
  collectionName: string;
  category: CategoryType;
  priceDisplay: string;
  numericPrice: number;
  shortDescription: string;
  story: string;
  metalOptions: MetalType[];
  gemstoneOptions: GemstoneType[];
  defaultMetal: MetalType;
  defaultGemstone: GemstoneType;
  images: string[]; // multi-angle shots
  certifications: string[];
  specs: {
    caratWeight?: string;
    clarity?: string;
    cut?: string;
    dimensions?: string;
    weight?: string;
    origin?: string;
  };
  sizeOptions?: string[];
  featured?: boolean;
  inStock?: boolean;
  provenance: string;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  category: CategoryType;
  pieceCount: number;
  featured?: boolean;
  craftConnectionTitle?: string;
}

export interface InquiryItem {
  piece: JewelryPiece;
  selectedMetal: MetalType;
  selectedGemstone: GemstoneType;
  selectedSize?: string;
  notes?: string;
}

export interface AtelierLocation {
  id: string;
  city: string;
  salonName: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  image: string;
  mapCoords: { lat: number; lng: number };
}

export interface AppointmentData {
  type: 'virtual' | 'studio';
  locationId: string;
  date: string;
  timeSlot: string;
  stylist: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes: string;
  pieceSlugOfInterest?: string;
}
