import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { JEWELRY_PIECES } from '../data/jewelryData';
import { JewelryViewer360 } from '../components/3D/JewelryViewer360';
import { MetalType, GemstoneType } from '../types';
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Calendar,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  Ruler,
  Rotate3D,
  Truck,
  CheckCircle2,
  X
} from 'lucide-react';

export const PieceDetailPage: React.FC = () => {
  const {
    selectedPieceSlug,
    navigateToPiece,
    setActivePage,
    addToInquiry,
    openAppointmentModal,
    toggleWishlist,
    isInWishlist
  } = useApp();

  const piece = JEWELRY_PIECES.find((p) => p.slug === selectedPieceSlug) || JEWELRY_PIECES[0];

  const [selectedMetal, setSelectedMetal] = useState<MetalType>(piece.defaultMetal);
  const [selectedGemstone, setSelectedGemstone] = useState<GemstoneType>(piece.defaultGemstone);
  const [selectedSize, setSelectedSize] = useState<string>(piece.sizeOptions ? piece.sizeOptions[1] : '');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'gallery' | '360'>('gallery');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Accordion open states
  const [openAccordion, setOpenAccordion] = useState<'specs' | 'provenance' | 'care' | 'delivery'>('specs');

  return (
    <div className="pt-28 pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Back Link */}
      <button
        onClick={() => setActivePage('collections')}
        className="inline-flex items-center gap-2 text-xs font-mono-luxury text-[#A39E94] hover:text-[#E8C97A] transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return to Collections</span>
      </button>

      {/* PRODUCT CORE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Media Gallery Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Mode Switcher */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('gallery')}
              className={`px-4 py-2 rounded-full text-xs font-mono-luxury transition-all cursor-pointer ${
                viewMode === 'gallery'
                  ? 'bg-[#C9A84C] text-[#0A0A0A] font-bold shadow-[0_0_15px_rgba(201,168,76,0.4)]'
                  : 'bg-[#161616] border border-[#C9A84C]/20 text-[#A39E94]'
              }`}
            >
              High-Res Gallery
            </button>
            <button
              onClick={() => setViewMode('360')}
              className={`px-4 py-2 rounded-full text-xs font-mono-luxury transition-all flex items-center gap-2 cursor-pointer ${
                viewMode === '360'
                  ? 'bg-[#C9A84C] text-[#0A0A0A] font-bold shadow-[0_0_15px_rgba(201,168,76,0.4)]'
                  : 'bg-[#161616] border border-[#C9A84C]/20 text-[#A39E94]'
              }`}
            >
              <Rotate3D className="h-3.5 w-3.5" />
              <span>Interactive 360° Inspection</span>
            </button>
          </div>

          {/* Main Visual Display */}
          {viewMode === 'gallery' ? (
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#0A0A0A] border border-[#C9A84C]/30 shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
              <img
                src={piece.images[activeImageIndex] || piece.images[0]}
                alt={piece.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]"
              />

              <button
                onClick={() => toggleWishlist(piece.slug)}
                className="absolute top-4 right-4 p-3 rounded-full bg-[#0A0A0A]/80 border border-[#C9A84C]/40 text-[#E8C97A] hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all cursor-pointer z-10"
              >
                <Heart
                  className={`h-5 w-5 ${
                    isInWishlist(piece.slug) ? 'fill-[#C9A84C] text-[#C9A84C]' : ''
                  }`}
                />
              </button>
            </div>
          ) : (
            <JewelryViewer360 images={piece.images} title={piece.title} />
          )}

          {/* Thumbnail Strip */}
          {viewMode === 'gallery' && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {piece.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`h-20 w-20 rounded-xl overflow-hidden border transition-all cursor-pointer shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-[#E8C97A] ring-2 ring-[#C9A84C]/50 scale-105'
                      : 'border-[#C9A84C]/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${piece.title} angle ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Configuration & Action Column */}
        <div className="lg:col-span-5 space-y-8 bg-[#121212] border border-[#C9A84C]/30 rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div>
            <span className="text-[10px] font-mono-luxury text-[#C9A84C] uppercase tracking-[0.3em] block">
              {piece.collectionName} Collection
            </span>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#F5F0E6] mt-1">
              {piece.title}
            </h1>
            <p className="font-mono-luxury text-2xl font-semibold text-[#E8C97A] mt-2">
              {piece.priceDisplay}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#A39E94] leading-relaxed font-light">
            {piece.shortDescription}
          </p>

          {/* Metal Configuration Selector */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-mono-luxury text-[#C9A84C] uppercase tracking-wider block">
              Selected Metal: <span className="text-[#F5F0E6]">{selectedMetal}</span>
            </span>
            <div className="grid grid-cols-2 gap-2">
              {piece.metalOptions.map((metal) => (
                <button
                  key={metal}
                  onClick={() => setSelectedMetal(metal)}
                  className={`p-3 rounded-lg border text-xs font-mono-luxury transition-all cursor-pointer ${
                    selectedMetal === metal
                      ? 'border-[#E8C97A] bg-[#C9A84C]/20 text-[#E8C97A] font-bold shadow-[0_0_15px_rgba(201,168,76,0.2)]'
                      : 'border-[#C9A84C]/20 bg-[#1A1A1A] text-[#A39E94] hover:text-[#F5F0E6]'
                  }`}
                >
                  {metal}
                </button>
              ))}
            </div>
          </div>

          {/* Gemstone Configuration */}
          <div className="space-y-3">
            <span className="text-xs font-mono-luxury text-[#C9A84C] uppercase tracking-wider block">
              Center Gemstone: <span className="text-[#F5F0E6]">{selectedGemstone}</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {piece.gemstoneOptions.map((gem) => (
                <button
                  key={gem}
                  onClick={() => setSelectedGemstone(gem)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-mono-luxury transition-all cursor-pointer ${
                    selectedGemstone === gem
                      ? 'border border-[#E8C97A] bg-[#C9A84C]/20 text-[#E8C97A] font-bold'
                      : 'border border-[#C9A84C]/20 bg-[#1A1A1A] text-[#A39E94] hover:text-[#F5F0E6]'
                  }`}
                >
                  {gem}
                </button>
              ))}
            </div>
          </div>

          {/* Ring / Bracelet Sizing */}
          {piece.sizeOptions && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-luxury text-[#C9A84C] uppercase tracking-wider">
                  Select Size
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[11px] font-mono-luxury text-[#E8C97A] underline flex items-center gap-1 cursor-pointer"
                >
                  <Ruler className="h-3 w-3" />
                  <span>Size Conversion Guide</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {piece.sizeOptions.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-mono-luxury transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-[#C9A84C] text-[#0A0A0A] font-bold'
                        : 'bg-[#1A1A1A] border border-[#C9A84C]/20 text-[#A39E94] hover:text-[#F5F0E6]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Main Action Buttons */}
          <div className="space-y-3 pt-4">
            <button
              onClick={() => addToInquiry(piece, selectedMetal, selectedGemstone, selectedSize)}
              data-cursor="Add to Inquiry"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] text-[#0A0A0A] font-bold text-xs uppercase tracking-[0.2em] hover:opacity-95 transition-all shadow-[0_0_30px_rgba(201,168,76,0.3)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Inquire About This Piece</span>
            </button>

            <button
              onClick={() => openAppointmentModal(piece.slug)}
              data-cursor="Book Viewing"
              className="w-full py-3.5 rounded-xl border border-[#C9A84C]/50 bg-[#1A1A1A] hover:bg-[#C9A84C]/15 text-[#E8C97A] font-semibold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Private Salon Viewing</span>
            </button>
          </div>

          {/* Confidence Assurances */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#C9A84C]/20 text-[11px] text-[#A39E94]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#C9A84C]" />
              <span>GIA Certified & Sealed</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-[#C9A84C]" />
              <span>Armored Global Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* EXPANDABLE ACCORDIONS FOR DEEPER SPECS */}
      <div className="bg-[#121212] border border-[#C9A84C]/30 rounded-2xl p-6 sm:p-10 space-y-6">
        <h3 className="font-serif-luxury text-2xl text-[#F5F0E6]">
          Technical Specifications & Provenance
        </h3>

        <div className="space-y-4">
          {/* Spec Accordion */}
          <div className="border border-[#C9A84C]/20 rounded-xl overflow-hidden bg-[#161616]">
            <button
              onClick={() => setOpenAccordion(openAccordion === 'specs' ? ('' as any) : 'specs')}
              className="w-full p-4 flex items-center justify-between text-left text-sm font-serif-luxury text-[#F5F0E6] cursor-pointer"
            >
              <span>Certified Gemmological Specifications</span>
              <ChevronDown className={`h-4 w-4 text-[#C9A84C] transition-transform ${openAccordion === 'specs' ? 'rotate-180' : ''}`} />
            </button>
            {openAccordion === 'specs' && (
              <div className="p-4 border-t border-[#C9A84C]/15 text-xs font-mono-luxury grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-[#A39E94]">
                <div>
                  <span className="text-[#C9A84C] block uppercase text-[10px]">Carat Weight</span>
                  <span className="text-[#F5F0E6]">{piece.specs.caratWeight || 'Included in Certification'}</span>
                </div>
                <div>
                  <span className="text-[#C9A84C] block uppercase text-[10px]">Clarity Grade</span>
                  <span className="text-[#F5F0E6]">{piece.specs.clarity || 'Internally Flawless'}</span>
                </div>
                <div>
                  <span className="text-[#C9A84C] block uppercase text-[10px]">Cut Geometry</span>
                  <span className="text-[#F5F0E6]">{piece.specs.cut || 'Ideal Precision'}</span>
                </div>
                <div>
                  <span className="text-[#C9A84C] block uppercase text-[10px]">Origin Mine</span>
                  <span className="text-[#F5F0E6]">{piece.specs.origin || 'Ethical Mine Partner'}</span>
                </div>
                <div>
                  <span className="text-[#C9A84C] block uppercase text-[10px]">Certifications</span>
                  <span className="text-[#F5F0E6]">{piece.certifications.join(', ')}</span>
                </div>
              </div>
            )}
          </div>

          {/* Provenance Accordion */}
          <div className="border border-[#C9A84C]/20 rounded-xl overflow-hidden bg-[#161616]">
            <button
              onClick={() => setOpenAccordion(openAccordion === 'provenance' ? ('' as any) : 'provenance')}
              className="w-full p-4 flex items-center justify-between text-left text-sm font-serif-luxury text-[#F5F0E6] cursor-pointer"
            >
              <span>Ethical Fairmined Provenance</span>
              <ChevronDown className={`h-4 w-4 text-[#C9A84C] transition-transform ${openAccordion === 'provenance' ? 'rotate-180' : ''}`} />
            </button>
            {openAccordion === 'provenance' && (
              <div className="p-4 border-t border-[#C9A84C]/15 text-xs text-[#A39E94] space-y-2 leading-relaxed font-light">
                <p>{piece.provenance}</p>
                <p>
                  Aurelia guarantees 100% chain-of-custody transparency from the mine to our Geneva workshop. No toxic mercury or forced labor is permitted anywhere in our supply network.
                </p>
              </div>
            )}
          </div>

          {/* Care Accordion */}
          <div className="border border-[#C9A84C]/20 rounded-xl overflow-hidden bg-[#161616]">
            <button
              onClick={() => setOpenAccordion(openAccordion === 'care' ? ('' as any) : 'care')}
              className="w-full p-4 flex items-center justify-between text-left text-sm font-serif-luxury text-[#F5F0E6] cursor-pointer"
            >
              <span>Care & Lifetime Maintenance</span>
              <ChevronDown className={`h-4 w-4 text-[#C9A84C] transition-transform ${openAccordion === 'care' ? 'rotate-180' : ''}`} />
            </button>
            {openAccordion === 'care' && (
              <div className="p-4 border-t border-[#C9A84C]/15 text-xs text-[#A39E94] space-y-2 leading-relaxed font-light">
                <p>
                  Every piece includes complimentary annual claw inspection, ultrasonic cleaning, and rhodium re-plating at any of our global salons in Geneva, Paris, New York, or Tokyo.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RING SIZE GUIDE MODAL */}
      <AnimatePresence>
        {isSizeGuideOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSizeGuideOpen(false)}
              className="fixed inset-0 bg-[#000000]/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-[#161616] border border-[#C9A84C]/40 rounded-2xl p-6 max-w-lg w-full space-y-4 z-10 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#C9A84C]/20">
                <h4 className="font-serif-luxury text-xl text-[#F5F0E6]">Ring Sizing Conversion Chart</h4>
                <button onClick={() => setIsSizeGuideOpen(false)} className="text-[#A39E94] hover:text-[#F5F0E6]">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="text-xs text-[#A39E94] space-y-3">
                <p>If you require custom sizing or half sizes, select "Custom Size" during inquiry and our concierge will provide a physical sizer ring kit.</p>

                <div className="border border-[#C9A84C]/20 rounded-lg overflow-hidden font-mono-luxury text-[11px]">
                  <table className="w-full text-left">
                    <thead className="bg-[#0A0A0A] text-[#C9A84C]">
                      <tr>
                        <th className="p-2.5">US Size</th>
                        <th className="p-2.5">UK / Aus</th>
                        <th className="p-2.5">EU Size</th>
                        <th className="p-2.5">Inside Circumference</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#C9A84C]/10 text-[#F5F0E6]">
                      <tr><td className="p-2.5">US 5</td><td className="p-2.5">J ½</td><td className="p-2.5">49mm</td><td className="p-2.5">15.7mm</td></tr>
                      <tr><td className="p-2.5">US 6</td><td className="p-2.5">L ½</td><td className="p-2.5">52mm</td><td className="p-2.5">16.5mm</td></tr>
                      <tr><td className="p-2.5">US 7</td><td className="p-2.5">N ½</td><td className="p-2.5">54mm</td><td className="p-2.5">17.3mm</td></tr>
                      <tr><td className="p-2.5">US 8</td><td className="p-2.5">P ½</td><td className="p-2.5">57mm</td><td className="p-2.5">18.1mm</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* STICKY BOTTOM MOBILE ACTION BAR */}
      <div className="fixed bottom-0 inset-x-0 z-30 bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-[#C9A84C]/30 p-3 lg:hidden flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-mono-luxury text-[#A39E94] uppercase block">Selected</span>
          <span className="font-mono-luxury text-sm font-semibold text-[#E8C97A]">{piece.priceDisplay}</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => addToInquiry(piece, selectedMetal, selectedGemstone, selectedSize)}
            className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] text-[#0A0A0A] font-bold text-xs uppercase tracking-wider cursor-pointer"
          >
            Inquire
          </button>
          <button
            onClick={() => openAppointmentModal(piece.slug)}
            className="px-3 py-2.5 rounded-lg border border-[#C9A84C]/40 text-[#E8C97A] text-xs font-mono-luxury uppercase cursor-pointer"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
};
