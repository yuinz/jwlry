import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { X, Trash2, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const InquiryDrawer: React.FC = () => {
  const {
    isInquiryOpen,
    setIsInquiryOpen,
    inquiryItems,
    removeFromInquiry,
    clearInquiry,
    openAppointmentModal,
    showToast
  } = useApp();

  const [step, setStep] = useState<'items' | 'form' | 'success'>('items');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [contactMethod, setContactMethod] = useState<'Email' | 'Phone' | 'WhatsApp'>('Email');
  const [preferredSalon, setPreferredSalon] = useState('Geneva Flagship Salon');
  const [notes, setNotes] = useState('');

  if (!isInquiryOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) {
      showToast('Required Fields', 'Please fill in your name and email address.');
      return;
    }
    setStep('success');
    showToast('Inquiry Transmitted', 'Our private concierge will contact you within 2 hours.');
  };

  const handleReset = () => {
    clearInquiry();
    setStep('items');
    setIsInquiryOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsInquiryOpen(false)}
          className="fixed inset-0 bg-[#000000]/80 backdrop-blur-md"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed inset-y-0 right-0 w-full max-w-lg bg-[#0E0E0E] border-l border-[#C9A84C]/30 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#C9A84C]/20 bg-[#070707]">
            <div className="flex flex-col">
              <h3 className="font-serif-luxury text-xl tracking-wider text-[#F5F0E6]">
                Private Inquiry Bag
              </h3>
              <span className="text-[10px] font-mono-luxury text-[#C9A84C] tracking-widest uppercase">
                {inquiryItems.length} {inquiryItems.length === 1 ? 'Piece Selected' : 'Pieces Selected'}
              </span>
            </div>
            <button
              onClick={() => setIsInquiryOpen(false)}
              className="p-2 text-[#A39E94] hover:text-[#F5F0E6] rounded-full hover:bg-[#161616] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {step === 'items' && (
              <>
                {inquiryItems.length === 0 ? (
                  <div className="py-20 text-center space-y-4">
                    <div className="mx-auto h-16 w-16 rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/5 flex items-center justify-center text-[#E8C97A]">
                      <Sparkles className="h-8 w-8" />
                    </div>
                    <h4 className="font-serif-luxury text-lg text-[#F5F0E6]">Your Inquiry Bag is Empty</h4>
                    <p className="text-xs text-[#A39E94] max-w-xs mx-auto leading-relaxed">
                      Explore our Haute Joaillerie collections and select pieces to request a private viewing or custom commission.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {inquiryItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex gap-4 p-4 rounded-xl bg-[#161616] border border-[#C9A84C]/20 relative group"
                      >
                        <img
                          src={item.piece.images[0]}
                          alt={item.piece.title}
                          referrerPolicy="no-referrer"
                          className="h-20 w-20 object-cover rounded-lg border border-[#C9A84C]/30 shrink-0"
                        />
                        <div className="flex-1 space-y-1">
                          <h4 className="font-serif-luxury text-base text-[#F5F0E6]">
                            {item.piece.title}
                          </h4>
                          <p className="text-xs text-[#C9A84C] font-mono-luxury">
                            {item.selectedMetal} • {item.selectedGemstone}
                          </p>
                          {item.selectedSize && (
                            <p className="text-[11px] text-[#A39E94]">
                              Ring Size: <span className="text-[#F5F0E6]">{item.selectedSize}</span>
                            </p>
                          )}
                          <p className="text-xs font-semibold text-[#E8C97A] pt-1">
                            {item.piece.priceDisplay}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromInquiry(idx)}
                          className="text-[#A39E94] hover:text-red-400 p-1 transition-colors self-start"
                          title="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {step === 'form' && (
              <form id="inquiry-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="p-3 rounded-lg bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-xs text-[#E8C97A] flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span>Inquiries are strictly confidential and handled by our Master Gemmologist concierge.</span>
                </div>

                <div>
                  <label className="block text-xs font-mono-luxury text-[#C9A84C] uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Lord / Lady / Mr. / Ms."
                    className="w-full bg-[#161616] border border-[#C9A84C]/30 rounded-lg px-4 py-2.5 text-xs text-[#F5F0E6] focus:outline-none focus:border-[#E8C97A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-luxury text-[#C9A84C] uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="concierge@domain.com"
                    className="w-full bg-[#161616] border border-[#C9A84C]/30 rounded-lg px-4 py-2.5 text-xs text-[#F5F0E6] focus:outline-none focus:border-[#E8C97A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-luxury text-[#C9A84C] uppercase tracking-wider mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+41 22 000 0000"
                    className="w-full bg-[#161616] border border-[#C9A84C]/30 rounded-lg px-4 py-2.5 text-xs text-[#F5F0E6] focus:outline-none focus:border-[#E8C97A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono-luxury text-[#C9A84C] uppercase tracking-wider mb-1">
                      Contact Preference
                    </label>
                    <select
                      value={contactMethod}
                      onChange={(e) => setContactMethod(e.target.value as 'Email' | 'Phone' | 'WhatsApp')}
                      className="w-full bg-[#161616] border border-[#C9A84C]/30 rounded-lg px-3 py-2.5 text-xs text-[#F5F0E6] focus:outline-none focus:border-[#E8C97A]"
                    >
                      <option value="Email">Email Response</option>
                      <option value="Phone">Private Phone Call</option>
                      <option value="WhatsApp">Encrypted WhatsApp</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-luxury text-[#C9A84C] uppercase tracking-wider mb-1">
                      Preferred Salon
                    </label>
                    <select
                      value={preferredSalon}
                      onChange={(e) => setPreferredSalon(e.target.value)}
                      className="w-full bg-[#161616] border border-[#C9A84C]/30 rounded-lg px-3 py-2.5 text-xs text-[#F5F0E6] focus:outline-none focus:border-[#E8C97A]"
                    >
                      <option value="Geneva Flagship Salon">Geneva Flagship</option>
                      <option value="Paris Place Vendôme">Paris Place Vendôme</option>
                      <option value="New York Fifth Ave">New York Fifth Ave</option>
                      <option value="Tokyo Ginza Salon">Tokyo Ginza</option>
                      <option value="Virtual Private Consultation">Virtual Consultation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-luxury text-[#C9A84C] uppercase tracking-wider mb-1">
                    Special Requests / Occasion Details
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Custom sizing, engraving request, deadline or anniversary details..."
                    className="w-full bg-[#161616] border border-[#C9A84C]/30 rounded-lg px-4 py-2.5 text-xs text-[#F5F0E6] focus:outline-none focus:border-[#E8C97A]"
                  />
                </div>
              </form>
            )}

            {step === 'success' && (
              <div className="py-12 text-center space-y-6">
                <div className="mx-auto h-20 w-20 rounded-full border border-[#C9A84C] bg-[#C9A84C]/15 flex items-center justify-center text-[#E8C97A]">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif-luxury text-2xl text-[#F5F0E6]">
                    Inquiry Received with Distinction
                  </h4>
                  <p className="text-xs text-[#A39E94] max-w-sm mx-auto leading-relaxed">
                    Thank you, {clientName}. Your inquiry dossier has been dispatched to our senior gemmologist at the {preferredSalon}.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#161616] border border-[#C9A84C]/30 text-left space-y-2 text-xs">
                  <span className="font-mono-luxury text-[#C9A84C] uppercase text-[10px] tracking-widest block">
                    Dossier Summary
                  </span>
                  <p className="text-[#F5F0E6]">{inquiryItems.length} Pieces Selected</p>
                  <p className="text-[#A39E94]">Contact Method: {contactMethod}</p>
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setIsInquiryOpen(false);
                      openAppointmentModal(inquiryItems[0]?.piece.slug);
                    }}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] text-[#0A0A0A] text-xs font-semibold uppercase tracking-widest hover:opacity-90 transition-all cursor-pointer"
                  >
                    Schedule In-Person Viewing Now
                  </button>

                  <button
                    onClick={handleReset}
                    className="w-full py-2.5 text-xs text-[#A39E94] hover:text-[#F5F0E6] transition-colors"
                  >
                    Close Inquiry Drawer
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer Buttons */}
          {step !== 'success' && inquiryItems.length > 0 && (
            <div className="p-6 border-t border-[#C9A84C]/20 bg-[#070707] space-y-3">
              {step === 'items' && (
                <button
                  onClick={() => setStep('form')}
                  className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] text-[#0A0A0A] text-xs font-semibold uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(201,168,76,0.3)]"
                >
                  <span>Proceed to Private Consultation Request</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}

              {step === 'form' && (
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep('items')}
                    className="flex-1 py-3 rounded-lg border border-[#C9A84C]/30 text-xs text-[#A39E94] hover:text-[#F5F0E6] uppercase tracking-wider cursor-pointer"
                  >
                    Back to Items
                  </button>
                  <button
                    type="submit"
                    form="inquiry-form"
                    className="flex-[2] py-3 rounded-lg bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] text-[#0A0A0A] text-xs font-semibold uppercase tracking-widest hover:opacity-90 transition-all cursor-pointer"
                  >
                    Submit Confidential Dossier
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
