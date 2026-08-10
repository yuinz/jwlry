import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ShieldCheck, Gem, MapPin, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { openAppointmentModal } = useApp();

  return (
    <div className="pt-28 pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 text-[#E8C97A] text-[10px] font-mono-luxury uppercase tracking-[0.25em]">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Maison Philosophy</span>
        </div>

        <h1 className="font-serif-luxury text-4xl sm:text-6xl text-[#F5F0E6]">
          The Heritage of <span className="gold-text-gradient italic">AURELIA</span>
        </h1>

        <p className="text-xs sm:text-base text-[#A39E94] font-light leading-relaxed">
          Founded on the banks of Lake Geneva in 1894 by master goldsmith Laurent Aurelia, our maison has preserved the sacred traditions of lost-wax casting, micro-pavé setting, and Fairmined metal refinement for over 130 years.
        </p>
      </section>

      {/* 3 Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-2xl bg-[#121212] border border-[#C9A84C]/30 space-y-4">
          <div className="h-12 w-12 rounded-full bg-[#C9A84C]/15 flex items-center justify-center text-[#E8C97A]">
            <Gem className="h-6 w-6" />
          </div>
          <h3 className="font-serif-luxury text-2xl text-[#F5F0E6]">100% Fairmined Gold</h3>
          <p className="text-xs text-[#A39E94] leading-relaxed font-light">
            We exclusively smelt certified Fairmined recycled and artisanal gold. Every gram is traceable to zero-mercury small-scale mining cooperatives in South America and West Africa.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-[#121212] border border-[#C9A84C]/30 space-y-4">
          <div className="h-12 w-12 rounded-full bg-[#C9A84C]/15 flex items-center justify-center text-[#E8C97A]">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="font-serif-luxury text-2xl text-[#F5F0E6]">Conflict-Free Gems</h3>
          <p className="text-xs text-[#A39E94] leading-relaxed font-light">
            Every diamond over 0.50 carats carries GIA or SSEF gemmological certificates. Our Muzo emeralds and Ceylon sapphires originate strictly from audited ethical mines.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-[#121212] border border-[#C9A84C]/30 space-y-4">
          <div className="h-12 w-12 rounded-full bg-[#C9A84C]/15 flex items-center justify-center text-[#E8C97A]">
            <MapPin className="h-6 w-6" />
          </div>
          <h3 className="font-serif-luxury text-2xl text-[#F5F0E6]">Poinçon de Genève</h3>
          <p className="text-xs text-[#A39E94] leading-relaxed font-light">
            Each creation is stamped with the official Geneva Hallmark seal, signifying ultimate compliance with the historic standards of Swiss high joaillerie and horology.
          </p>
        </div>
      </section>

      {/* Appointment CTA */}
      <section className="text-center bg-[#121212] border border-[#C9A84C]/30 rounded-3xl p-12 space-y-6">
        <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#F5F0E6]">
          Experience Haute Joaillerie Firsthand
        </h2>
        <p className="text-xs sm:text-sm text-[#A39E94] max-w-md mx-auto">
          Request a private consultation with our Chief Gemmologist at Place Vendôme Paris, Rue du Rhône Geneva, Fifth Avenue NYC, or Ginza Tokyo.
        </p>

        <button
          onClick={() => openAppointmentModal()}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] text-[#0A0A0A] font-bold text-xs uppercase tracking-[0.2em] cursor-pointer hover:opacity-90 transition-all"
        >
          Book Salon Viewing
        </button>
      </section>
    </div>
  );
};
