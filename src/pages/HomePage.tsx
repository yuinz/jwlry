import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { COLLECTIONS, JEWELRY_PIECES, CRAFT_CHAPTERS } from '../data/jewelryData';
import { JewelryViewer360 } from '../components/3D/JewelryViewer360';
import { Sparkles, ArrowRight, Calendar, Heart, ShieldCheck, Compass, Eye } from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    navigateToPiece,
    navigateToCollection,
    setActivePage,
    openAppointmentModal,
    toggleWishlist,
    isInWishlist
  } = useApp();

  const featuredPiece = JEWELRY_PIECES.find((p) => p.slug === 'solene-solitaire-ring') || JEWELRY_PIECES[0];

  return (
    <div className="space-y-32 pb-24">
      {/* HERO SECTION — Cinematic Entry */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Ambient Dark Velvet Canvas with Golden Glow */}
        <div className="absolute inset-0 bg-radial from-[#18150F] via-[#0D0D0D] to-[#070707]" />
        
        {/* Subtle Gold Particles Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(201,168,76,0.12),transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 text-[#E8C97A] text-[10px] font-mono-luxury uppercase tracking-[0.25em]"
            >
              <Sparkles className="h-3 w-3" />
              <span>High Jewelry Collection</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="font-serif-luxury text-4xl sm:text-6xl xl:text-7xl font-normal text-[#F5F0E6] leading-[1.1] tracking-tight"
            >
              Sculpted in <span className="gold-text-gradient italic font-light">Molten Gold</span> & Pure Light
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="text-sm sm:text-base text-[#A39E94] max-w-xl mx-auto lg:mx-0 font-light leading-relaxed"
            >
              Masterpieces of high joaillerie and tourbillon horology, individually forged from 100% Fairmined gold and hand-selected D-flawless gemstones in our Rue du Rhône atelier.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <button
                onClick={() => setActivePage('collections')}
                data-cursor="Explore"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] hover:from-[#E8C97A] hover:to-[#C9A84C] text-[#0A0A0A] font-semibold text-xs tracking-[0.2em] uppercase transition-all shadow-[0_0_30px_rgba(201,168,76,0.3)] hover:shadow-[0_0_45px_rgba(232,201,122,0.5)] cursor-pointer flex items-center justify-center gap-3"
              >
                <span>Explore Collections</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => openAppointmentModal()}
                data-cursor="Book"
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#C9A84C]/40 hover:border-[#E8C97A] bg-[#161616]/60 hover:bg-[#C9A84C]/10 text-[#F5F0E6] hover:text-[#E8C97A] font-medium text-xs tracking-[0.2em] uppercase transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="h-4 w-4 text-[#C9A84C]" />
                <span>Book Private Viewing</span>
              </button>
            </motion.div>
          </div>

          {/* Right Hero Showcase Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative group cursor-pointer" onClick={() => navigateToPiece(featuredPiece.slug)}>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#C9A84C]/40 via-[#E8C97A]/20 to-[#C9A84C]/40 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition duration-1000" />
              
              <div className="relative rounded-2xl bg-[#121212] border border-[#C9A84C]/30 p-4 sm:p-6 overflow-hidden">
                <img
                  src={featuredPiece.images[0]}
                  alt={featuredPiece.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-[380px] object-cover rounded-xl group-hover:scale-105 transition-transform duration-700 filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                />

                <div className="mt-4 flex items-center justify-between border-t border-[#C9A84C]/20 pt-4">
                  <div>
                    <span className="text-[10px] font-mono-luxury uppercase text-[#C9A84C] tracking-widest">
                      {featuredPiece.collectionName}
                    </span>
                    <h3 className="font-serif-luxury text-xl text-[#F5F0E6] group-hover:text-[#E8C97A] transition-colors">
                      {featuredPiece.title}
                    </h3>
                  </div>

                  <span className="font-mono-luxury text-sm font-semibold text-[#E8C97A]">
                    {featuredPiece.priceDisplay}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED COLLECTIONS SEQUENCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#C9A84C]/20 pb-6">
          <div>
            <span className="text-[10px] font-mono-luxury text-[#C9A84C] uppercase tracking-[0.3em] block">
              Curated Universes
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#F5F0E6] mt-1">
              Haute Joaillerie Collections
            </h2>
          </div>
          <button
            onClick={() => setActivePage('collections')}
            className="text-xs font-mono-luxury text-[#E8C97A] hover:text-[#FFF8E7] flex items-center gap-2 cursor-pointer uppercase tracking-widest"
          >
            <span>View All Universes ({COLLECTIONS.length})</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COLLECTIONS.slice(0, 3).map((col, idx) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              onClick={() => navigateToCollection(col.slug)}
              data-cursor="View Collection"
              className="group relative rounded-2xl bg-[#121212] border border-[#C9A84C]/20 hover:border-[#C9A84C] overflow-hidden cursor-pointer transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                <img
                  src={col.heroImage}
                  alt={col.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                <div className="absolute top-4 right-4 bg-[#0A0A0A]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#C9A84C]/30 text-[10px] font-mono-luxury text-[#E8C97A]">
                  {col.pieceCount} Masterpieces
                </div>
              </div>

              <div className="p-6 space-y-2 relative z-10 bg-[#0A0A0A]">
                <span className="text-[10px] font-mono-luxury text-[#C9A84C] uppercase tracking-widest">
                  {col.category}
                </span>
                <h3 className="font-serif-luxury text-2xl text-[#F5F0E6] group-hover:text-[#E8C97A] transition-colors">
                  {col.name}
                </h3>
                <p className="text-xs text-[#A39E94] line-clamp-2 leading-relaxed">
                  {col.tagline}
                </p>

                <div className="pt-3 flex items-center gap-2 text-xs font-mono-luxury text-[#E8C97A] group-hover:translate-x-1 transition-transform">
                  <span>Enter Collection</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SIGNATURE PIECE SHOWCASE WITH INTERACTIVE 360 DEGREE ROTATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-b from-[#161616] to-[#0D0D0D] border border-[#C9A84C]/30 p-8 sm:p-12 relative overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.9)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* 360 Viewer Frame */}
            <div className="lg:col-span-6">
              <JewelryViewer360 images={featuredPiece.images} title={featuredPiece.title} />
            </div>

            {/* Description Details */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 text-[#E8C97A] text-[10px] font-mono-luxury uppercase tracking-widest">
                <Compass className="h-3.5 w-3.5" />
                <span>Interactive 360° Inspection</span>
              </div>

              <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#F5F0E6]">
                {featuredPiece.title}
              </h2>

              <p className="text-sm text-[#A39E94] leading-relaxed font-light">
                {featuredPiece.story}
              </p>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#C9A84C]/20 text-xs font-mono-luxury">
                <div>
                  <span className="text-[#C9A84C] block uppercase text-[10px]">Carat & Quality</span>
                  <span className="text-[#F5F0E6]">{featuredPiece.specs.caratWeight}</span>
                </div>
                <div>
                  <span className="text-[#C9A84C] block uppercase text-[10px]">Clarity Grade</span>
                  <span className="text-[#F5F0E6]">{featuredPiece.specs.clarity}</span>
                </div>
                <div>
                  <span className="text-[#C9A84C] block uppercase text-[10px]">Gold Material</span>
                  <span className="text-[#F5F0E6]">{featuredPiece.defaultMetal}</span>
                </div>
                <div>
                  <span className="text-[#C9A84C] block uppercase text-[10px]">Provenance</span>
                  <span className="text-[#F5F0E6]">{featuredPiece.specs.origin}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigateToPiece(featuredPiece.slug)}
                  className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] text-[#0A0A0A] font-semibold text-xs uppercase tracking-widest cursor-pointer hover:opacity-90 transition-all"
                >
                  Configure & Inquire
                </button>

                <button
                  onClick={() => toggleWishlist(featuredPiece.slug)}
                  className="p-3.5 rounded-full border border-[#C9A84C]/30 hover:border-[#E8C97A] text-[#E8C97A] cursor-pointer transition-colors"
                  title="Add to Wishlist"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      isInWishlist(featuredPiece.slug) ? 'fill-[#C9A84C] text-[#C9A84C]' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CRAFT ATELIER TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] font-mono-luxury text-[#C9A84C] uppercase tracking-[0.3em]">
            Digital Atelier Experience
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#F5F0E6]">
            The Geneva Handcraft Journey
          </h2>
          <p className="text-xs sm:text-sm text-[#A39E94] leading-relaxed">
            Every Aurelia piece passes through the hands of four master artisans over 180 consecutive hours of hand sculpting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#121212] border border-[#C9A84C]/30 rounded-3xl p-6 sm:p-10">
          <div className="relative rounded-2xl overflow-hidden aspect-video border border-[#C9A84C]/20">
            <img
              src={CRAFT_CHAPTERS[0].mediaUrl}
              alt={CRAFT_CHAPTERS[0].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 bg-[#0A0A0A]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#C9A84C]/30 text-xs font-serif-luxury text-[#E8C97A]">
              Chapter I: {CRAFT_CHAPTERS[0].title}
            </div>
          </div>

          <div className="space-y-6">
            <span className="font-serif-luxury text-5xl text-[#C9A84C]/40 italic block">
              Chapter {CRAFT_CHAPTERS[0].number}
            </span>
            <h3 className="font-serif-luxury text-2xl text-[#F5F0E6]">
              {CRAFT_CHAPTERS[0].subtitle}
            </h3>
            <p className="text-xs text-[#A39E94] leading-relaxed">
              {CRAFT_CHAPTERS[0].description}
            </p>

            <blockquote className="p-4 rounded-xl bg-[#1A1A1A] border-l-2 border-[#C9A84C] text-xs text-[#F5F0E6] italic">
              "{CRAFT_CHAPTERS[0].quote}"
              <span className="block mt-2 text-[10px] font-mono-luxury text-[#C9A84C] not-italic uppercase">
                — {CRAFT_CHAPTERS[0].artisanName}, {CRAFT_CHAPTERS[0].artisanRole}
              </span>
            </blockquote>

            <button
              onClick={() => setActivePage('craft')}
              className="px-6 py-3 rounded-full border border-[#C9A84C] text-[#E8C97A] text-xs font-mono-luxury uppercase tracking-widest hover:bg-[#C9A84C]/10 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Explore All 4 Craft Chapters</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* FINAL INVITATION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-3xl bg-radial from-[#1A1813] via-[#111111] to-[#0A0A0A] border border-[#C9A84C]/40 p-12 sm:p-20 space-y-8 relative overflow-hidden shadow-[0_0_80px_rgba(201,168,76,0.1)]">
          <span className="text-[10px] font-mono-luxury text-[#C9A84C] uppercase tracking-[0.4em] block">
            Exclusive Appointments
          </span>
          <h2 className="font-serif-luxury text-4xl sm:text-6xl text-[#F5F0E6] max-w-2xl mx-auto leading-tight">
            Begin Your Private <span className="gold-text-gradient italic">Commission</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#A39E94] max-w-md mx-auto leading-relaxed">
            Reserve a confidential viewing at our Geneva, Paris, New York, or Tokyo salons, or connect with our master gemmologist via encrypted virtual consultation.
          </p>

          <div className="pt-4 flex justify-center">
            <button
              onClick={() => openAppointmentModal()}
              data-cursor="Book"
              className="px-10 py-4 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] text-[#0A0A0A] font-bold text-xs tracking-[0.25em] uppercase hover:opacity-90 transition-all shadow-[0_0_40px_rgba(201,168,76,0.4)] cursor-pointer"
            >
              Reserve Private Viewing
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
