import React, { createContext, useContext, useState, useEffect } from 'react';
import { JewelryPiece, InquiryItem, MetalType, GemstoneType } from '../types';
import { JEWELRY_PIECES } from '../data/jewelryData';
import { playMetallicChime, playSoftClick, playGoldShimmerBurst } from '../lib/sound';

export type ActivePage = 
  | 'home' 
  | 'collections' 
  | 'collection-detail' 
  | 'piece-detail' 
  | 'craft' 
  | 'appoint' 
  | 'about' 
  | 'contact';

interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'gold' | 'info';
}

interface AppContextType {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  selectedCollectionSlug: string | null;
  setSelectedCollectionSlug: (slug: string | null) => void;
  selectedPieceSlug: string | null;
  setSelectedPieceSlug: (slug: string | null) => void;
  
  // Navigation Helper
  navigateToPiece: (slug: string) => void;
  navigateToCollection: (slug: string) => void;

  // Wishlist
  wishlist: string[]; // piece slugs
  toggleWishlist: (slug: string) => void;
  isInWishlist: (slug: string) => boolean;

  // Inquiry Cart / Drawer
  inquiryItems: InquiryItem[];
  addToInquiry: (piece: JewelryPiece, metal: MetalType, gemstone: GemstoneType, size?: string) => void;
  removeFromInquiry: (index: number) => void;
  clearInquiry: () => void;
  isInquiryOpen: boolean;
  setIsInquiryOpen: (open: boolean) => void;

  // Appointment Modal
  isAppointmentOpen: boolean;
  setIsAppointmentOpen: (open: boolean) => void;
  appointmentPieceSlug: string | null;
  openAppointmentModal: (pieceSlug?: string) => void;

  // Command Palette
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;

  // Settings
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  cursorEnabled: boolean;
  setCursorEnabled: (enabled: boolean) => void;

  // Toast
  toasts: ToastMessage[];
  showToast: (title: string, description?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedCollectionSlug, setSelectedCollectionSlug] = useState<string | null>('heritage');
  const [selectedPieceSlug, setSelectedPieceSlug] = useState<string | null>('solene-solitaire-ring');

  // Load wishlist from localStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('aurelia_wishlist');
        return saved ? JSON.parse(saved) : ['solene-solitaire-ring'];
      } catch {
        return ['solene-solitaire-ring'];
      }
    }
    return ['solene-solitaire-ring'];
  });

  // Load inquiry cart from localStorage
  const [inquiryItems, setInquiryItems] = useState<InquiryItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('aurelia_inquiry');
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [appointmentPieceSlug, setAppointmentPieceSlug] = useState<string | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Settings
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('aurelia_sound') !== 'false';
    }
    return true;
  });

  const [cursorEnabled, setCursorEnabledState] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('aurelia_cursor') === 'true';
    }
    return false;
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    localStorage.setItem('aurelia_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('aurelia_inquiry', JSON.stringify(inquiryItems));
  }, [inquiryItems]);

  const setSoundEnabled = (val: boolean) => {
    setSoundEnabledState(val);
    localStorage.setItem('aurelia_sound', String(val));
  };

  const setCursorEnabled = (val: boolean) => {
    setCursorEnabledState(val);
    localStorage.setItem('aurelia_cursor', String(val));
  };

  const showToast = (title: string, description?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description }]);
    playMetallicChime(soundEnabled);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const navigateToPiece = (slug: string) => {
    playSoftClick(soundEnabled);
    setSelectedPieceSlug(slug);
    setActivePage('piece-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCollection = (slug: string) => {
    playSoftClick(soundEnabled);
    setSelectedCollectionSlug(slug);
    setActivePage('collection-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleWishlist = (slug: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(slug);
      const targetPiece = JEWELRY_PIECES.find((p) => p.slug === slug);
      const pieceName = targetPiece ? targetPiece.title : 'Piece';

      if (exists) {
        showToast('Removed from Wishlist', `${pieceName} was removed from your curated list.`);
        playSoftClick(soundEnabled);
        return prev.filter((s) => s !== slug);
      } else {
        showToast('Saved to Wishlist', `${pieceName} was added to your private collection.`);
        playGoldShimmerBurst(soundEnabled);
        return [...prev, slug];
      }
    });
  };

  const isInWishlist = (slug: string) => wishlist.includes(slug);

  const addToInquiry = (
    piece: JewelryPiece,
    metal: MetalType,
    gemstone: GemstoneType,
    size?: string
  ) => {
    setInquiryItems((prev) => [...prev, { piece, selectedMetal: metal, selectedGemstone: gemstone, selectedSize: size }]);
    showToast('Added to Inquiry Bag', `${piece.title} is ready for private consultation.`);
    playGoldShimmerBurst(soundEnabled);
    setIsInquiryOpen(true);
  };

  const removeFromInquiry = (index: number) => {
    setInquiryItems((prev) => prev.filter((_, i) => i !== index));
    playSoftClick(soundEnabled);
  };

  const clearInquiry = () => {
    setInquiryItems([]);
  };

  const openAppointmentModal = (pieceSlug?: string) => {
    playMetallicChime(soundEnabled);
    setAppointmentPieceSlug(pieceSlug || null);
    setIsAppointmentOpen(true);
  };

  // Listen to Cmd+K or Ctrl+K for search command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage: (p) => {
          playSoftClick(soundEnabled);
          setActivePage(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        selectedCollectionSlug,
        setSelectedCollectionSlug,
        selectedPieceSlug,
        setSelectedPieceSlug,
        navigateToPiece,
        navigateToCollection,
        wishlist,
        toggleWishlist,
        isInWishlist,
        inquiryItems,
        addToInquiry,
        removeFromInquiry,
        clearInquiry,
        isInquiryOpen,
        setIsInquiryOpen,
        isAppointmentOpen,
        setIsAppointmentOpen,
        appointmentPieceSlug,
        openAppointmentModal,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        soundEnabled,
        setSoundEnabled,
        cursorEnabled,
        setCursorEnabled,
        toasts,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
