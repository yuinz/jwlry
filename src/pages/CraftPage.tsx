import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { CRAFT_CHAPTERS } from '../data/jewelryData';
import { Hotspot } from '../types';
import { Sparkles, Calendar, Info, X, CheckCircle2, ArrowRight } from 'lucide-react';

export const CraftPage: React.FC = () => {
  const { openAppointmentModal } = useApp();
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  return (
    <div className="pt-28 pb-32 space-y-24">
      {/* CRAFT HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 text-[#E8C97A] text-[10px] font-mono-luxury uppercase tracking-[0.25em]"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Atelier Craft Process</span>
        </motion.div>

        <h1 className="font-serif-luxury text-4xl sm:text-6xl xl:text-7xl text-[#F5F0E6]">
          The Art of <span className="gold-text-gradient italic font-light">Haute Joaillerie</span>
        </h1>

        <p className="text-xs sm:text-base text-[#A39E94] max-w-2xl mx-auto font-light leading-relaxed">
          Step inside our Rue du Rhône workshop. Discover how 100% Fairmined raw gold and conflict-free diamonds are transformed through four sacred stages of manual craftsmanship.
        </p>
      </section>

      {/* MULTI-CHAPTER SCROLL SEQUENCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {CRAFT_CHAPTERS.map((chapter, idx) => (
          <motion.div
            key={chapter.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#121212] border border-[#C9A84C]/30 rounded-3xl p-6 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.8)] ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Interactive Image with Hotspots Frame */}
            <div className="lg:col-span-7 relative aspect-video rounded-2xl overflow-hidden border border-[#C9A84C]/30 shadow-2xl group">
              <img
                src={chapter.mediaUrl}
                alt={chapter.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />

              {/* Hotspot Pulsing Rings */}
              {chapter.hotspots?.map((hs) => (
                <button
                  key={hs.id}
                  onClick={() => setActiveHotspot(hs)}
                  style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 p-2 group/hs cursor-pointer z-20"
                  title={hs.title}
                >
                  <span className="relative flex h-6 w-6">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8C97A] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-6 w-6 bg-[#C9A84C] border-2 border-[#0A0A0A] text-[#0A0A0A] text-[9px] font-bold items-center justify-center shadow-lg group-hover/hs:scale-125 transition-transform">
                      +
                    </span>
                  </span>
                </button>
              ))}

              <div className="absolute top-4 left-4 bg-[#0A0A0A]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#C9A84C]/30 text-xs font-mono-luxury text-[#E8C97A]">
                Chapter {chapter.number} • Tap + for Technical Details
              </div>
            </div>

            {/* Chapter Text Info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="font-serif-luxury text-6xl text-[#C9A84C]/30 italic block">
                Chapter {chapter.number}
              </span>

              <h2 className="font-serif-luxury text-3xl text-[#F5F0E6]">
                {chapter.title}
              </h2>

              <h3 className="text-xs font-mono-luxury text-[#E8C97A] uppercase tracking-widest">
                {chapter.subtitle}
              </h3>

              <p className="text-xs sm:text-sm text-[#A39E94] leading-relaxed font-light">
                {chapter.description}
              </p>

              {chapter.quote && (
                <blockquote className="p-4 rounded-xl bg-[#1A1A1A] border-l-2 border-[#C9A84C] text-xs text-[#F5F0E6] italic">
                  "{chapter.quote}"
                  {chapter.artisanName && (
                    <span className="block mt-2 text-[10px] font-mono-luxury text-[#C9A84C] not-italic uppercase">
                      — {chapter.artisanName}, {chapter.artisanRole}
                    </span>
                  )}
                </blockquote>
              )}
            </div>
          </motion.div>
        ))}
      </section>

      {/* HOTSPOT DETAIL MODAL */}
      <AnimatePresence>
        {activeHotspot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveHotspot(null)}
              className="fixed inset-0 bg-[#000000]/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-[#161616] border border-[#C9A84C]/40 rounded-2xl p-6 max-w-md w-full space-y-4 z-10 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#C9A84C]/20">
                <div className="flex items-center gap-2 text-[#E8C97A]">
                  <Info className="h-4 w-4" />
                  <h4 className="font-serif-luxury text-lg text-[#F5F0E6]">{activeHotspot.title}</h4>
                </div>
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="text-[#A39E94] hover:text-[#F5F0E6]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="text-xs text-[#A39E94] leading-relaxed font-light">
                {activeHotspot.description}
              </p>

              <div className="p-3 rounded-lg bg-[#0A0A0A] border border-[#C9A84C]/20 text-[10px] font-mono-luxury text-[#C9A84C] uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#E8C97A]" />
                <span>Geneva Hallmark Protocol Verified</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BOTTOM CTA INVITATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-3xl bg-radial from-[#1A1813] via-[#111111] to-[#0A0A0A] border border-[#C9A84C]/40 p-12 sm:p-16 space-y-6">
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#F5F0E6]">
            Witness the Craftsmanship in Person
          </h2>
          <p className="text-xs sm:text-sm text-[#A39E94] max-w-md mx-auto">
            Book an appointment at our Geneva workshop or place a custom bespoke commission with our Master Artisan.
          </p>

          <button
            onClick={() => openAppointmentModal()}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] text-[#0A0A0A] font-bold text-xs uppercase tracking-[0.2em] hover:opacity-90 transition-all cursor-pointer shadow-[0_0_30px_rgba(201,168,76,0.3)]"
          >
            Reserve Workshop Experience
          </button>
        </div>
      </section>
    </div>
  );
};
