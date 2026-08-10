import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { JEWELRY_PIECES, SALON_LOCATIONS } from '../data/jewelryData';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  User,
  MapPin,
  CheckCircle2,
  Video,
  Building,
  Sparkles
} from 'lucide-react';

export const AppointmentModal: React.FC = () => {
  const {
    isAppointmentOpen,
    setIsAppointmentOpen,
    appointmentPieceSlug,
    showToast
  } = useApp();

  const prefilledPiece = JEWELRY_PIECES.find((p) => p.slug === appointmentPieceSlug);

  const [appointmentType, setAppointmentType] = useState<'studio' | 'virtual'>('studio');
  const [selectedLocationId, setSelectedLocationId] = useState('loc-geneva');
  const [selectedDate, setSelectedDate] = useState('2026-08-15');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('14:30');
  const [selectedStylist, setSelectedStylist] = useState('Claire Vance — Senior Gemmologist');
  
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isAppointmentOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) {
      showToast('Required Information', 'Please complete your name and email address.');
      return;
    }
    setIsSubmitted(true);
    showToast('Appointment Confirmed', 'A calendar invitation has been prepared for your private consultation.');
  };

  const selectedLocation = SALON_LOCATIONS.find((l) => l.id === selectedLocationId);

  const timeSlots = ['10:30 AM', '12:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAppointmentOpen(false)}
          className="fixed inset-0 bg-[#000000]/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl bg-[#121212] border border-[#C9A84C]/40 rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden z-10 my-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#C9A84C]/20 bg-[#0A0A0A]">
            <div>
              <h3 className="font-serif-luxury text-2xl text-[#F5F0E6]">
                Book Salon Viewing
              </h3>
            </div>
            <button
              onClick={() => setIsAppointmentOpen(false)}
              className="p-2 text-[#A39E94] hover:text-[#F5F0E6] rounded-full hover:bg-[#161616] cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
            {prefilledPiece && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1A1A1A] border border-[#C9A84C]/30">
                <img
                  src={prefilledPiece.images[0]}
                  alt={prefilledPiece.title}
                  referrerPolicy="no-referrer"
                  className="h-12 w-12 object-cover rounded-lg border border-[#C9A84C]/30"
                />
                <div>
                  <span className="text-[10px] font-mono-luxury text-[#C9A84C] uppercase">Piece of Interest</span>
                  <h4 className="font-serif-luxury text-sm text-[#F5F0E6]">{prefilledPiece.title}</h4>
                </div>
              </div>
            )}

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Appointment Type Toggle */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAppointmentType('studio')}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                      appointmentType === 'studio'
                        ? 'border-[#E8C97A] bg-[#C9A84C]/15 text-[#E8C97A] shadow-[0_0_20px_rgba(201,168,76,0.2)]'
                        : 'border-[#C9A84C]/20 bg-[#1A1A1A] text-[#A39E94] hover:text-[#F5F0E6]'
                    }`}
                  >
                    <Building className="h-5 w-5" />
                    <span className="font-serif-luxury text-sm font-semibold">In-Studio Salon</span>
                    <span className="text-[10px] opacity-80">Geneva, Paris, NYC, Tokyo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAppointmentType('virtual')}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                      appointmentType === 'virtual'
                        ? 'border-[#E8C97A] bg-[#C9A84C]/15 text-[#E8C97A] shadow-[0_0_20px_rgba(201,168,76,0.2)]'
                        : 'border-[#C9A84C]/20 bg-[#1A1A1A] text-[#A39E94] hover:text-[#F5F0E6]'
                    }`}
                  >
                    <Video className="h-5 w-5" />
                    <span className="font-serif-luxury text-sm font-semibold">Virtual HD Viewing</span>
                    <span className="text-[10px] opacity-80">Encrypted High-Definition Link</span>
                  </button>
                </div>

                {/* Salon Location Picker (if studio) */}
                {appointmentType === 'studio' && (
                  <div>
                    <label className="block text-xs font-mono-luxury text-[#C9A84C] uppercase tracking-wider mb-2">
                      Select Atelier Salon
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {SALON_LOCATIONS.map((loc) => (
                        <button
                          type="button"
                          key={loc.id}
                          onClick={() => setSelectedLocationId(loc.id)}
                          className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                            selectedLocationId === loc.id
                              ? 'border-[#E8C97A] bg-[#C9A84C]/10 text-[#F5F0E6]'
                              : 'border-[#C9A84C]/20 bg-[#161616] text-[#A39E94] hover:border-[#C9A84C]/40'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-serif-luxury text-sm font-medium">{loc.city}</span>
                            <MapPin className="h-3.5 w-3.5 text-[#C9A84C]" />
                          </div>
                          <span className="text-[10px] text-[#A39E94] block mt-0.5">{loc.salonName}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Date & Time Slot Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-luxury text-[#C9A84C] uppercase tracking-wider mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-[#161616] border border-[#C9A84C]/30 rounded-lg px-3.5 py-2.5 text-xs text-[#F5F0E6] focus:outline-none focus:border-[#E8C97A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-luxury text-[#C9A84C] uppercase tracking-wider mb-2">
                      Consultant
                    </label>
                    <select
                      value={selectedStylist}
                      onChange={(e) => setSelectedStylist(e.target.value)}
                      className="w-full bg-[#161616] border border-[#C9A84C]/30 rounded-lg px-3.5 py-2.5 text-xs text-[#F5F0E6] focus:outline-none focus:border-[#E8C97A]"
                    >
                      <option value="Claire Vance — Senior Gemmologist">Claire Vance (Senior Gemmologist)</option>
                      <option value="Henri Laurent — Master Metallurgist">Henri Laurent (Master Metallurgist)</option>
                      <option value="Marc-Antoine Dupont — Head Diamond Setter">Marc-Antoine Dupont (Head Setter)</option>
                      <option value="Private Client Concierge Director">Private Client Concierge Director</option>
                    </select>
                  </div>
                </div>

                {/* Time Slot Selector */}
                <div>
                  <label className="block text-xs font-mono-luxury text-[#C9A84C] uppercase tracking-wider mb-2">
                    Available Time Slots
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`px-3.5 py-2 rounded-lg text-xs font-mono-luxury transition-all cursor-pointer ${
                          selectedTimeSlot === slot
                            ? 'bg-[#C9A84C] text-[#0A0A0A] font-bold shadow-[0_0_15px_rgba(201,168,76,0.4)]'
                            : 'bg-[#161616] border border-[#C9A84C]/20 text-[#A39E94] hover:text-[#F5F0E6]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Client Contact Info */}
                <div className="space-y-3 pt-2 border-t border-[#C9A84C]/20">
                  <span className="text-xs font-mono-luxury text-[#C9A84C] uppercase tracking-wider block">
                    Your Information
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Full Name *"
                      className="bg-[#161616] border border-[#C9A84C]/30 rounded-lg px-3.5 py-2.5 text-xs text-[#F5F0E6] focus:outline-none focus:border-[#E8C97A]"
                    />
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="Email Address *"
                      className="bg-[#161616] border border-[#C9A84C]/30 rounded-lg px-3.5 py-2.5 text-xs text-[#F5F0E6] focus:outline-none focus:border-[#E8C97A]"
                    />
                  </div>

                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="Mobile / WhatsApp for Concierge Confirmation"
                    className="w-full bg-[#161616] border border-[#C9A84C]/30 rounded-lg px-3.5 py-2.5 text-xs text-[#F5F0E6] focus:outline-none focus:border-[#E8C97A]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] text-[#0A0A0A] text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all cursor-pointer shadow-[0_0_30px_rgba(201,168,76,0.3)]"
                >
                  Confirm Reservation
                </button>
              </form>
            ) : (
              <div className="py-8 text-center space-y-6">
                <div className="mx-auto h-20 w-20 rounded-full border border-[#C9A84C] bg-[#C9A84C]/15 flex items-center justify-center text-[#E8C97A]">
                  <CheckCircle2 className="h-10 w-10" />
                </div>

                <div className="space-y-2">
                  <h4 className="font-serif-luxury text-2xl text-[#F5F0E6]">
                    Viewing Reserved
                  </h4>
                  <p className="text-xs text-[#A39E94] max-w-sm mx-auto">
                    An official invitation has been transmitted to <span className="text-[#E8C97A]">{clientEmail}</span>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#161616] border border-[#C9A84C]/30 text-left space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-[#E8C97A]">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{selectedDate} at {selectedTimeSlot}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#A39E94]">
                    <MapPin className="h-4 w-4 text-[#C9A84C]" />
                    <span>
                      {appointmentType === 'studio' ? selectedLocation?.address : 'Encrypted Virtual Video Room'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[#A39E94]">
                    <User className="h-4 w-4 text-[#C9A84C]" />
                    <span>{selectedStylist}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setIsAppointmentOpen(false);
                  }}
                  className="w-full py-3 rounded-lg border border-[#C9A84C]/30 text-xs text-[#E8C97A] hover:bg-[#C9A84C]/10 transition-all uppercase tracking-widest cursor-pointer"
                >
                  Return to Maison Experience
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
