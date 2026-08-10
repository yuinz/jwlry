import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SALON_LOCATIONS } from '../data/jewelryData';
import { MapPin, Phone, Mail, Clock, Calendar, Sparkles, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { openAppointmentModal, showToast } = useApp();
  const [activeSalonId, setActiveSalonId] = useState('loc-geneva');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      showToast('Required Information', 'Please fill in your name and email.');
      return;
    }
    setSubmitted(true);
    showToast('Concierge Message Sent', 'A senior private client advisor will contact you shortly.');
  };

  const currentSalon = SALON_LOCATIONS.find((l) => l.id === activeSalonId) || SALON_LOCATIONS[0];

  return (
    <div className="pt-28 pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-mono-luxury text-[#C9A84C] uppercase tracking-[0.3em]">
          Private Salons & Concierge
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-6xl text-[#F5F0E6]">
          Global Atelier Network
        </h1>
        <p className="text-xs sm:text-sm text-[#A39E94] font-light leading-relaxed">
          Our private salons are located in Geneva, Paris, New York, and Tokyo. All visits are by private appointment to ensure absolute confidentiality.
        </p>
      </div>

      {/* Salon City Selector Tabs */}
      <div className="flex flex-wrap justify-center gap-3">
        {SALON_LOCATIONS.map((loc) => (
          <button
            key={loc.id}
            onClick={() => setActiveSalonId(loc.id)}
            className={`px-6 py-3 rounded-full text-xs font-mono-luxury transition-all cursor-pointer ${
              activeSalonId === loc.id
                ? 'bg-[#C9A84C] text-[#0A0A0A] font-bold shadow-[0_0_20px_rgba(201,168,76,0.4)]'
                : 'bg-[#121212] border border-[#C9A84C]/20 text-[#A39E94] hover:text-[#F5F0E6]'
            }`}
          >
            {loc.city} Salon
          </button>
        ))}
      </div>

      {/* Active Salon Detailed Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#121212] border border-[#C9A84C]/30 rounded-3xl p-8 sm:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 text-[#E8C97A] text-[10px] font-mono-luxury uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{currentSalon.city} Flagship</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#F5F0E6]">
            {currentSalon.salonName}
          </h2>

          <div className="space-y-4 text-xs font-mono-luxury text-[#A39E94] pt-2">
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-[#C9A84C] shrink-0 mt-0.5" />
              <span className="text-[#F5F0E6]">{currentSalon.address}</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-[#C9A84C] shrink-0" />
              <a href={`tel:${currentSalon.phone}`} className="text-[#E8C97A] hover:underline">
                {currentSalon.phone}
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-[#C9A84C] shrink-0" />
              <a href={`mailto:${currentSalon.email}`} className="text-[#E8C97A] hover:underline">
                {currentSalon.email}
              </a>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-4 w-4 text-[#C9A84C] shrink-0 mt-0.5" />
              <span>{currentSalon.hours}</span>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => openAppointmentModal()}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] text-[#0A0A0A] font-bold text-xs uppercase tracking-widest cursor-pointer hover:opacity-90 transition-all flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              <span>Reserve Viewing in {currentSalon.city}</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#C9A84C]/30 shadow-2xl">
          <img
            src={currentSalon.image}
            alt={currentSalon.salonName}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* General Concierge Form */}
      <div className="bg-[#121212] border border-[#C9A84C]/30 rounded-3xl p-8 sm:p-12 space-y-6">
        <div className="border-b border-[#C9A84C]/20 pb-4">
          <h2 className="font-serif-luxury text-3xl text-[#F5F0E6]">Confidential Concierge Inquiry</h2>
          <p className="text-xs text-[#A39E94] mt-1">Have a custom question regarding bespoke creation, diamond sourcing, or estate valuation?</p>
        </div>

        {submitted ? (
          <div className="py-8 text-center text-[#E8C97A] font-serif-luxury text-xl">
            Thank you, {name}. Your inquiry has been forwarded to our senior advisor.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name *"
                className="bg-[#161616] border border-[#C9A84C]/30 rounded-lg px-4 py-3 text-xs text-[#F5F0E6] focus:outline-none focus:border-[#E8C97A]"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address *"
                className="bg-[#161616] border border-[#C9A84C]/30 rounded-lg px-4 py-3 text-xs text-[#F5F0E6] focus:outline-none focus:border-[#E8C97A]"
              />
            </div>

            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your inquiry message..."
              className="w-full bg-[#161616] border border-[#C9A84C]/30 rounded-lg px-4 py-3 text-xs text-[#F5F0E6] focus:outline-none focus:border-[#E8C97A]"
            />

            <button
              type="submit"
              className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] text-[#0A0A0A] font-bold text-xs uppercase tracking-widest cursor-pointer hover:opacity-90 transition-all flex items-center gap-2"
            >
              <span>Transmit Inquiry</span>
              <Send className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
