import React from 'react';
import { useApp } from '../context/AppContext';
import { COLLECTIONS, JEWELRY_PIECES, CRAFT_CHAPTERS } from '../data/jewelryData';
import { ArrowLeft, Sparkles, ArrowRight, Heart } from 'lucide-react';

export const SingleCollectionPage: React.FC = () => {
  const {
    selectedCollectionSlug,
    navigateToPiece,
    setActivePage,
    toggleWishlist,
    isInWishlist
  } = useApp();

  const collection = COLLECTIONS.find((c) => c.slug === selectedCollectionSlug) || COLLECTIONS[0];
  const collectionPieces = JEWELRY_PIECES.filter((p) => p.collectionSlug === collection.slug);

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Back Button */}
      <button
        onClick={() => setActivePage('collections')}
        className="inline-flex items-center gap-2 text-xs font-mono-luxury text-[#A39E94] hover:text-[#E8C97A] transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return to All Collections</span>
      </button>

      {/* Collection Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#121212] border border-[#C9A84C]/30 rounded-3xl p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 text-[#E8C97A] text-[10px] font-mono-luxury uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Collection Portfolio</span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl text-[#F5F0E6]">
            {collection.name}
          </h1>

          <p className="font-serif-luxury text-xl text-[#C9A84C] italic font-light">
            "{collection.tagline}"
          </p>

          <p className="text-xs sm:text-sm text-[#A39E94] leading-relaxed font-light">
            {collection.description}
          </p>

          <div className="pt-2 flex items-center gap-6 text-xs font-mono-luxury text-[#C9A84C]">
            <span>{collectionPieces.length} Registered Creations</span>
            <span>•</span>
            <span>Geneva Hallmark Approved</span>
          </div>
        </div>

        <div className="lg:col-span-5 relative aspect-square rounded-2xl overflow-hidden border border-[#C9A84C]/30 shadow-2xl">
          <img
            src={collection.heroImage}
            alt={collection.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Collection Pieces Grid */}
      <div className="space-y-8">
        <div className="border-b border-[#C9A84C]/20 pb-4">
          <h2 className="font-serif-luxury text-3xl text-[#F5F0E6]">
            Masterpieces of {collection.name}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {collectionPieces.map((piece) => (
            <div
              key={piece.id}
              className="group relative rounded-2xl bg-[#121212] border border-[#C9A84C]/20 hover:border-[#C9A84C] overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.8)] transition-all duration-500 flex flex-col justify-between"
            >
              <div className="relative aspect-square overflow-hidden bg-[#0A0A0A]">
                <img
                  src={piece.images[0]}
                  alt={piece.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />

                <button
                  onClick={() => toggleWishlist(piece.slug)}
                  className="absolute top-3 right-3 p-2.5 rounded-full bg-[#0A0A0A]/80 border border-[#C9A84C]/30 text-[#E8C97A] hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all z-10 cursor-pointer"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      isInWishlist(piece.slug) ? 'fill-[#C9A84C] text-[#C9A84C]' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="p-6 space-y-3 bg-[#0E0E0E] flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => navigateToPiece(piece.slug)}
                    className="font-serif-luxury text-xl text-[#F5F0E6] group-hover:text-[#E8C97A] transition-colors cursor-pointer"
                  >
                    {piece.title}
                  </h3>
                  <p className="text-xs text-[#A39E94] line-clamp-2 mt-1">
                    {piece.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#C9A84C]/15 flex items-center justify-between">
                  <span className="font-mono-luxury text-sm font-semibold text-[#E8C97A]">
                    {piece.priceDisplay}
                  </span>

                  <button
                    onClick={() => navigateToPiece(piece.slug)}
                    className="px-4 py-2 rounded-full border border-[#C9A84C]/40 bg-[#C9A84C]/10 text-[#E8C97A] group-hover:bg-[#C9A84C] group-hover:text-[#0A0A0A] text-[10px] font-mono-luxury uppercase tracking-widest transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View Piece</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Craft Connection Banner */}
      <div className="rounded-2xl bg-[#161616] border border-[#C9A84C]/30 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-mono-luxury text-[#C9A84C] uppercase tracking-widest">
            Atelier Process
          </span>
          <h3 className="font-serif-luxury text-2xl text-[#F5F0E6] mt-1">
            Discover {collection.craftConnectionTitle || 'The Geneva Craft Process'}
          </h3>
          <p className="text-xs text-[#A39E94] mt-1">
            Learn how raw gold crucibles and ethical gemstones are transformed in our workshop.
          </p>
        </div>

        <button
          onClick={() => setActivePage('craft')}
          className="px-6 py-3 rounded-full bg-[#C9A84C] text-[#0A0A0A] font-bold text-xs uppercase tracking-widest shrink-0 cursor-pointer hover:bg-[#E8C97A] transition-colors"
        >
          Explore Craft Atelier
        </button>
      </div>
    </div>
  );
};
