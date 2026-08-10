import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { COLLECTIONS, JEWELRY_PIECES } from '../data/jewelryData';
import { CategoryType, MetalType, GemstoneType, JewelryPiece } from '../types';
import {
  Heart,
  Filter,
  Search,
  ArrowRight,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  LayoutGrid,
  Grid2X2,
  List
} from 'lucide-react';

export const CollectionsPage: React.FC = () => {
  const {
    navigateToPiece,
    navigateToCollection,
    toggleWishlist,
    isInWishlist,
    openAppointmentModal,
    addToInquiry
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [selectedMetal, setSelectedMetal] = useState<MetalType | 'All'>('All');
  const [selectedGemstone, setSelectedGemstone] = useState<GemstoneType | 'All'>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [layoutMode, setLayoutMode] = useState<'grid-3' | 'grid-2' | 'list'>('grid-3');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Active selected metals per piece for in-card preview
  const [pieceMetals, setPieceMetals] = useState<Record<string, MetalType>>({});

  // Filter pieces
  const filteredPieces = JEWELRY_PIECES.filter((p) => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (selectedMetal !== 'All' && !p.metalOptions.includes(selectedMetal)) return false;
    if (selectedGemstone !== 'All' && !p.gemstoneOptions.includes(selectedGemstone)) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchDesc = p.shortDescription.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      const matchCollection = p.collectionName.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchCategory && !matchCollection) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.numericPrice - b.numericPrice;
    if (sortBy === 'price-desc') return b.numericPrice - a.numericPrice;
    return 0;
  });

  const categories: CategoryType[] = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Timepieces'];
  const metals: (MetalType | 'All')[] = ['All', '18k Yellow Gold', '18k Rose Gold', 'Platinum 950'];
  const gemstones: (GemstoneType | 'All')[] = ['All', 'Flawless Diamond', 'Imperial Emerald', 'Royal Sapphire', 'Pigeon Blood Ruby'];

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedMetal('All');
    setSelectedGemstone('All');
    setSortBy('featured');
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedMetal !== 'All' ||
    selectedGemstone !== 'All' ||
    searchQuery.trim() !== '';

  return (
    <div className="pt-24 pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-4">
        <h1 className="font-serif-luxury text-4xl sm:text-6xl text-[#F5F0E6] tracking-tight">
          Haute Joaillerie Collections
        </h1>
        <p className="text-xs sm:text-sm text-[#A39E94] font-light leading-relaxed">
          Exquisite high jewelry creations handcrafted in Geneva using 100% Fairmined gold and conflict-free gemstones.
        </p>
      </div>

      {/* FILTER & CONTROL TOOLBAR */}
      <div className="bg-[#121212] border border-[#C9A84C]/30 rounded-2xl p-4 sm:p-6 space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        {/* Search Bar & Layout Switchers */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#C9A84C]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, gemstone, metal..."
              className="w-full bg-[#1A1A1A] border border-[#C9A84C]/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#F5F0E6] placeholder-[#A39E94]/60 focus:outline-none focus:border-[#E8C97A] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#A39E94] hover:text-[#F5F0E6]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Controls Right */}
          <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#1A1A1A] border border-[#C9A84C]/30 rounded-xl px-3 py-2.5 text-xs text-[#F5F0E6] focus:outline-none focus:border-[#E8C97A] cursor-pointer"
            >
              <option value="featured">Featured Atelier Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>

            {/* Layout Toggle Buttons */}
            <div className="hidden sm:flex items-center border border-[#C9A84C]/30 rounded-xl p-1 bg-[#1A1A1A] gap-1">
              <button
                onClick={() => setLayoutMode('grid-3')}
                className={`p-1.5 rounded-lg transition-colors ${
                  layoutMode === 'grid-3' ? 'bg-[#C9A84C] text-[#0A0A0A]' : 'text-[#A39E94] hover:text-[#F5F0E6]'
                }`}
                title="3-Column Grid"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setLayoutMode('grid-2')}
                className={`p-1.5 rounded-lg transition-colors ${
                  layoutMode === 'grid-2' ? 'bg-[#C9A84C] text-[#0A0A0A]' : 'text-[#A39E94] hover:text-[#F5F0E6]'
                }`}
                title="2-Column Grid"
              >
                <Grid2X2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setLayoutMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  layoutMode === 'list' ? 'bg-[#C9A84C] text-[#0A0A0A]' : 'text-[#A39E94] hover:text-[#F5F0E6]'
                }`}
                title="Detailed List View"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="space-y-2 pt-2 border-t border-[#C9A84C]/15">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const count = cat === 'All'
                ? JEWELRY_PIECES.length
                : JEWELRY_PIECES.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-mono-luxury transition-all cursor-pointer flex items-center gap-2 ${
                    selectedCategory === cat
                      ? 'bg-[#C9A84C] text-[#0A0A0A] font-bold shadow-[0_0_15px_rgba(201,168,76,0.3)]'
                      : 'bg-[#1A1A1A] border border-[#C9A84C]/20 text-[#A39E94] hover:text-[#F5F0E6] hover:border-[#C9A84C]/50'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat ? 'bg-[#0A0A0A]/20 text-[#0A0A0A]' : 'bg-[#0A0A0A] text-[#C9A84C]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Advanced Metals & Gemstones Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#C9A84C]/15">
          <div>
            <span className="text-[10px] font-mono-luxury text-[#A39E94] uppercase tracking-wider block mb-2">
              Filter Precious Metal
            </span>
            <div className="flex flex-wrap gap-2">
              {metals.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMetal(m)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono-luxury transition-all cursor-pointer ${
                    selectedMetal === m
                      ? 'bg-[#C9A84C]/20 border border-[#E8C97A] text-[#E8C97A] font-bold'
                      : 'bg-[#1A1A1A] border border-[#C9A84C]/20 text-[#A39E94] hover:text-[#F5F0E6]'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[10px] font-mono-luxury text-[#A39E94] uppercase tracking-wider block mb-2">
              Filter Gemstone
            </span>
            <div className="flex flex-wrap gap-2">
              {gemstones.map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGemstone(g)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono-luxury transition-all cursor-pointer ${
                    selectedGemstone === g
                      ? 'bg-[#C9A84C]/20 border border-[#E8C97A] text-[#E8C97A] font-bold'
                      : 'bg-[#1A1A1A] border border-[#C9A84C]/20 text-[#A39E94] hover:text-[#F5F0E6]'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Filters Bar & Reset */}
        {hasActiveFilters && (
          <div className="pt-2 flex items-center justify-between border-t border-[#C9A84C]/15 text-xs">
            <span className="text-[#A39E94]">
              Showing <strong className="text-[#E8C97A]">{filteredPieces.length}</strong> matching creations
            </span>

            <button
              onClick={resetFilters}
              className="text-[#E8C97A] hover:underline flex items-center gap-1.5 cursor-pointer font-mono-luxury"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* FEATURED UNIVERSES BANNER (Visible on All) */}
      {selectedCategory === 'All' && !searchQuery && (
        <div className="space-y-4 pt-2">
          <span className="text-[10px] font-mono-luxury text-[#C9A84C] uppercase tracking-[0.25em] block">
            Featured Collections
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COLLECTIONS.map((col) => (
              <div
                key={col.id}
                onClick={() => navigateToCollection(col.slug)}
                className="group p-6 rounded-2xl bg-[#121212] border border-[#C9A84C]/20 hover:border-[#C9A84C] flex gap-6 items-center cursor-pointer transition-all duration-300 shadow-lg"
              >
                <img
                  src={col.heroImage}
                  alt={col.name}
                  referrerPolicy="no-referrer"
                  className="h-24 w-24 object-cover rounded-xl border border-[#C9A84C]/30 shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono-luxury text-[#C9A84C] uppercase tracking-widest">
                    {col.category} Universe
                  </span>
                  <h3 className="font-serif-luxury text-xl text-[#F5F0E6] group-hover:text-[#E8C97A] transition-colors">
                    {col.name}
                  </h3>
                  <p className="text-xs text-[#A39E94] line-clamp-2">{col.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRODUCTS DISPLAY SECTION */}
      <div className="space-y-6">
        {filteredPieces.length === 0 ? (
          <div className="text-center py-20 bg-[#121212] border border-[#C9A84C]/20 rounded-2xl space-y-4">
            <Sparkles className="h-10 w-10 text-[#C9A84C] mx-auto opacity-60" />
            <h3 className="font-serif-luxury text-2xl text-[#F5F0E6]">No High Jewelry Creations Found</h3>
            <p className="text-xs text-[#A39E94] max-w-sm mx-auto">
              We couldn't find any creations matching your selected filter criteria. Try resetting filters or adjusting your search.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 rounded-full bg-[#C9A84C] text-[#0A0A0A] text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-[#E8C97A] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : layoutMode === 'list' ? (
          /* LIST VIEW */
          <div className="space-y-4">
            {filteredPieces.map((piece) => {
              const activeMetal = pieceMetals[piece.id] || piece.defaultMetal;

              return (
                <div
                  key={piece.id}
                  className="group bg-[#121212] border border-[#C9A84C]/20 hover:border-[#C9A84C] rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6 transition-all duration-300"
                >
                  <div
                    onClick={() => navigateToPiece(piece.slug)}
                    className="relative h-40 w-full sm:w-40 rounded-xl overflow-hidden bg-[#0A0A0A] shrink-0 cursor-pointer"
                  >
                    <img
                      src={piece.images[0]}
                      alt={piece.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 space-y-2 text-center sm:text-left">
                    <span className="text-[10px] font-mono-luxury text-[#C9A84C] uppercase tracking-widest block">
                      {piece.collectionName} Collection • {piece.category}
                    </span>
                    <h3
                      onClick={() => navigateToPiece(piece.slug)}
                      className="font-serif-luxury text-2xl text-[#F5F0E6] group-hover:text-[#E8C97A] cursor-pointer transition-colors"
                    >
                      {piece.title}
                    </h3>
                    <p className="text-xs text-[#A39E94] line-clamp-2 max-w-xl font-light">
                      {piece.shortDescription}
                    </p>

                    {/* Metal selector options */}
                    <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                      <span className="text-[10px] font-mono-luxury text-[#A39E94] uppercase">Metal:</span>
                      {piece.metalOptions.map((m) => (
                        <button
                          key={m}
                          onClick={() => setPieceMetals({ ...pieceMetals, [piece.id]: m })}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono-luxury cursor-pointer ${
                            activeMetal === m
                              ? 'bg-[#C9A84C] text-[#0A0A0A] font-bold'
                              : 'bg-[#1A1A1A] border border-[#C9A84C]/20 text-[#A39E94]'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-3 shrink-0 w-full sm:w-auto text-center sm:text-right border-t sm:border-t-0 sm:border-l border-[#C9A84C]/15 pt-4 sm:pt-0 sm:pl-6">
                    <span className="font-mono-luxury text-lg font-semibold text-[#E8C97A]">
                      {piece.priceDisplay}
                    </span>

                    <div className="flex items-center gap-2 justify-center sm:justify-end">
                      <button
                        onClick={() => toggleWishlist(piece.slug)}
                        className="p-2.5 rounded-full border border-[#C9A84C]/30 text-[#E8C97A] hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all cursor-pointer"
                      >
                        <Heart className={`h-4 w-4 ${isInWishlist(piece.slug) ? 'fill-[#C9A84C]' : ''}`} />
                      </button>

                      <button
                        onClick={() => navigateToPiece(piece.slug)}
                        className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] text-[#0A0A0A] text-xs font-bold uppercase tracking-widest cursor-pointer hover:opacity-90 transition-all flex items-center gap-2"
                      >
                        <span>View Piece</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* GRID VIEW (3-col or 2-col) */
          <div className={`grid gap-6 sm:gap-8 ${
            layoutMode === 'grid-2'
              ? 'grid-cols-1 sm:grid-cols-2'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}>
            <AnimatePresence>
              {filteredPieces.map((piece, idx) => {
                const isHovered = hoveredCardId === piece.id;
                const activeMetal = pieceMetals[piece.id] || piece.defaultMetal;
                const displayImg = isHovered && piece.images[1] ? piece.images[1] : piece.images[0];

                return (
                  <motion.div
                    key={piece.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    onMouseEnter={() => setHoveredCardId(piece.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    className="group relative rounded-2xl bg-[#121212] border border-[#C9A84C]/20 hover:border-[#C9A84C] overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.8)] transition-all duration-500 flex flex-col justify-between"
                  >
                    {/* Media Container */}
                    <div
                      onClick={() => navigateToPiece(piece.slug)}
                      className="relative aspect-square overflow-hidden bg-[#0A0A0A] cursor-pointer"
                    >
                      <img
                        src={displayImg}
                        alt={piece.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-108"
                      />

                      {/* Wishlist Button Overlay */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(piece.slug);
                        }}
                        className="absolute top-3 right-3 p-2.5 rounded-full bg-[#0A0A0A]/80 border border-[#C9A84C]/30 text-[#E8C97A] hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all z-10 cursor-pointer"
                        title="Toggle Wishlist"
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            isInWishlist(piece.slug) ? 'fill-[#C9A84C] text-[#C9A84C]' : ''
                          }`}
                        />
                      </button>

                      {/* Category Pill Tag */}
                      <div className="absolute top-3 left-3 bg-[#0A0A0A]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#C9A84C]/30 text-[9px] font-mono-luxury text-[#C9A84C] uppercase">
                        {piece.category}
                      </div>

                      {/* Hover Overlay Action */}
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateToPiece(piece.slug);
                          }}
                          className="w-full py-2.5 rounded-xl bg-[#C9A84C] text-[#0A0A0A] text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-[#E8C97A] transition-colors"
                        >
                          View Creation Details
                        </button>
                      </div>
                    </div>

                    {/* Info Card Content */}
                    <div className="p-5 space-y-3 bg-[#0E0E0E] flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono-luxury text-[#C9A84C] uppercase tracking-widest block">
                            {piece.collectionName}
                          </span>
                          <span className="text-[9px] font-mono-luxury text-[#A39E94]">
                            {piece.defaultGemstone}
                          </span>
                        </div>

                        <h3
                          onClick={() => navigateToPiece(piece.slug)}
                          className="font-serif-luxury text-xl text-[#F5F0E6] group-hover:text-[#E8C97A] transition-colors cursor-pointer mt-1"
                        >
                          {piece.title}
                        </h3>

                        <p className="text-xs text-[#A39E94] line-clamp-2 mt-1.5 leading-relaxed font-light">
                          {piece.shortDescription}
                        </p>
                      </div>

                      {/* In-Card Metal Swatches */}
                      <div className="pt-2 flex items-center gap-1.5 overflow-x-auto pb-1">
                        <span className="text-[9px] font-mono-luxury text-[#A39E94] uppercase shrink-0">Metal:</span>
                        {piece.metalOptions.map((metal) => (
                          <button
                            key={metal}
                            onClick={() => setPieceMetals({ ...pieceMetals, [piece.id]: metal })}
                            className={`px-2 py-0.5 rounded text-[9px] font-mono-luxury transition-all cursor-pointer whitespace-nowrap ${
                              activeMetal === metal
                                ? 'bg-[#C9A84C]/30 border border-[#E8C97A] text-[#E8C97A] font-bold'
                                : 'bg-[#1A1A1A] border border-[#C9A84C]/20 text-[#A39E94]'
                            }`}
                          >
                            {metal}
                          </button>
                        ))}
                      </div>

                      {/* Card Footer Price & Action */}
                      <div className="pt-3 border-t border-[#C9A84C]/15 flex items-center justify-between">
                        <span className="font-mono-luxury text-sm font-semibold text-[#E8C97A]">
                          {piece.priceDisplay}
                        </span>

                        <button
                          onClick={() => navigateToPiece(piece.slug)}
                          className="px-3.5 py-1.5 rounded-full border border-[#C9A84C]/40 bg-[#C9A84C]/10 text-[#E8C97A] group-hover:bg-[#C9A84C] group-hover:text-[#0A0A0A] text-[10px] font-mono-luxury uppercase tracking-widest transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <span>Inquire</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};
