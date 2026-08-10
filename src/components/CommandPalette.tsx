import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { JEWELRY_PIECES, COLLECTIONS } from '../data/jewelryData';
import { Search, X, Sparkles, ArrowRight, Gem } from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    navigateToPiece,
    navigateToCollection,
    setActivePage,
    openAppointmentModal
  } = useApp();

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isCommandPaletteOpen) {
      setQuery('');
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const filteredPieces = JEWELRY_PIECES.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.collectionName.toLowerCase().includes(query.toLowerCase()) ||
      p.defaultMetal.toLowerCase().includes(query.toLowerCase()) ||
      p.defaultGemstone.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCollections = COLLECTIONS.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.tagline.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCommandPaletteOpen(false)}
          className="fixed inset-0 bg-[#000000]/80 backdrop-blur-xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-[#161616] border border-[#C9A84C]/40 rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden z-10"
        >
          {/* Search Header */}
          <div className="flex items-center px-4 py-3.5 border-b border-[#C9A84C]/20 bg-[#0A0A0A]">
            <Search className="h-5 w-5 text-[#C9A84C] shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pieces, collections, metals (e.g. Emerald, Solitaire, Tourbillon)..."
              className="w-full bg-transparent px-3 text-sm text-[#F5F0E6] placeholder-[#A39E94]/60 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-[#A39E94] hover:text-[#F5F0E6] text-xs px-2"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsCommandPaletteOpen(false)}
              className="p-1 text-[#A39E94] hover:text-[#F5F0E6] rounded-md"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Search Results / Shortcuts */}
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
            {/* Quick Actions if query is empty */}
            {!query && (
              <div className="space-y-3">
                <span className="text-[10px] font-mono-luxury tracking-widest text-[#C9A84C] uppercase">
                  Suggested Destinations
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => {
                      setIsCommandPaletteOpen(false);
                      setActivePage('collections');
                    }}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#0A0A0A] border border-[#C9A84C]/15 hover:border-[#C9A84C] transition-all text-left text-[#F5F0E6] group cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Gem className="h-4 w-4 text-[#E8C97A]" />
                      <span>Browse All Collections</span>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-[#A39E94] group-hover:text-[#E8C97A] group-hover:translate-x-1 transition-all" />
                  </button>

                  <button
                    onClick={() => {
                      setIsCommandPaletteOpen(false);
                      setActivePage('craft');
                    }}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#0A0A0A] border border-[#C9A84C]/15 hover:border-[#C9A84C] transition-all text-left text-[#F5F0E6] group cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-[#E8C97A]" />
                      <span>The Geneva Atelier Craft</span>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-[#A39E94] group-hover:text-[#E8C97A] group-hover:translate-x-1 transition-all" />
                  </button>

                  <button
                    onClick={() => {
                      setIsCommandPaletteOpen(false);
                      openAppointmentModal();
                    }}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#0A0A0A] border border-[#C9A84C]/15 hover:border-[#C9A84C] transition-all text-left text-[#F5F0E6] group cursor-pointer sm:col-span-2"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-[#E8C97A]" />
                      <span>Book Private Salon Consultation</span>
                    </div>
                    <span className="text-[10px] text-[#C9A84C] font-mono-luxury uppercase tracking-wider">
                      Geneva • Paris • NYC • Tokyo
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Filtered Pieces */}
            {filteredPieces.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-mono-luxury tracking-widest text-[#C9A84C] uppercase">
                  Haute Joaillerie Pieces ({filteredPieces.length})
                </span>
                <div className="space-y-1.5">
                  {filteredPieces.map((piece) => (
                    <button
                      key={piece.id}
                      onClick={() => {
                        setIsCommandPaletteOpen(false);
                        navigateToPiece(piece.slug);
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-[#0A0A0A] border border-transparent hover:border-[#C9A84C]/30 transition-all text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={piece.images[0]}
                          alt={piece.title}
                          referrerPolicy="no-referrer"
                          className="h-10 w-10 object-cover rounded border border-[#C9A84C]/20"
                        />
                        <div>
                          <h5 className="font-serif-luxury text-sm text-[#F5F0E6] group-hover:text-[#E8C97A] transition-colors">
                            {piece.title}
                          </h5>
                          <p className="text-[11px] text-[#A39E94]">
                            {piece.category} • {piece.defaultMetal}
                          </p>
                        </div>
                      </div>
                      <span className="font-mono-luxury text-xs text-[#E8C97A]">
                        {piece.priceDisplay}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Filtered Collections */}
            {filteredCollections.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-mono-luxury tracking-widest text-[#C9A84C] uppercase">
                  Collections ({filteredCollections.length})
                </span>
                <div className="space-y-1.5">
                  {filteredCollections.map((col) => (
                    <button
                      key={col.id}
                      onClick={() => {
                        setIsCommandPaletteOpen(false);
                        navigateToCollection(col.slug);
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-[#0A0A0A] border border-transparent hover:border-[#C9A84C]/30 transition-all text-left group cursor-pointer"
                    >
                      <div>
                        <h5 className="font-serif-luxury text-sm text-[#F5F0E6] group-hover:text-[#E8C97A] transition-colors">
                          {col.name}
                        </h5>
                        <p className="text-[11px] text-[#A39E94]">{col.tagline}</p>
                      </div>
                      <span className="text-[10px] text-[#C9A84C] font-mono-luxury uppercase tracking-wider">
                        {col.pieceCount} Pieces
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {query && filteredPieces.length === 0 && filteredCollections.length === 0 && (
              <div className="py-12 text-center text-[#A39E94]">
                <p className="text-sm">No luxury pieces matching "{query}"</p>
                <p className="text-xs text-[#A39E94]/60 mt-1">
                  Try searching for "Solitaire", "Emerald", "Platinum", or "Gold"
                </p>
              </div>
            )}
          </div>

          {/* Footer Shortcuts hint */}
          <div className="bg-[#0A0A0A] px-4 py-2 border-t border-[#C9A84C]/15 flex items-center justify-between text-[10px] font-mono-luxury text-[#A39E94]">
            <span>Press ESC to dismiss</span>
            <span>AURELIA Haute Joaillerie</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
