import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, MapPin, ShieldCheck, Gem, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, openAppointmentModal, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Invalid Email', 'Please provide a valid email address.');
      return;
    }
    setSubscribed(true);
    showToast('Privileged Access Granted', 'You are now subscribed to Aurelia’s seasonal Private Vault releases.');
    setEmail('');
  };

  return (
    <footer className="relative bg-[#070707] border-t border-[#C9A84C]/20 pt-20 pb-12 overflow-hidden text-[#A39E94]">
      {/* Background Gold Ambient Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-radial from-[#C9A84C]/5 via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-[#C9A84C]/15">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col">
              <span className="font-serif-luxury text-3xl tracking-[0.2em] text-[#F5F0E6]">
                AURELIA
              </span>
              <span className="text-[10px] font-mono-luxury tracking-[0.35em] text-[#C9A84C] uppercase mt-1">
                Maison de Haute Joaillerie • Genève
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#A39E94] max-w-sm">
              Crafting bespoke heirloom jewelry and high horology from 100% Fairmined gold and conflict-free gemstones since 1894.
            </p>

            {/* Newsletter Subscription */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono-luxury tracking-widest text-[#E8C97A] uppercase flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5" />
                Join The Private Gazette
              </span>
              {subscribed ? (
                <div className="p-3 rounded bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-xs text-[#E8C97A]">
                  Thank you. Your invitations to private vault previews will arrive directly in your inbox.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-sm">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your private email address"
                    className="flex-1 bg-[#161616] border border-[#C9A84C]/30 rounded-l-md px-3.5 py-2.5 text-xs text-[#F5F0E6] placeholder-[#A39E94]/60 focus:outline-none focus:border-[#E8C97A]"
                  />
                  <button
                    type="submit"
                    data-cursor="Subscribe"
                    className="bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] hover:from-[#E8C97A] hover:to-[#C9A84C] text-[#0A0A0A] font-medium text-xs px-4 py-2.5 rounded-r-md transition-all cursor-pointer flex items-center justify-center"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Collections */}
          <div className="space-y-4">
            <h4 className="font-serif-luxury text-sm font-semibold tracking-widest text-[#F5F0E6] uppercase">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setActivePage('collections')}
                  className="hover:text-[#E8C97A] transition-colors cursor-pointer"
                >
                  Heritage Solitaire
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('collections')}
                  className="hover:text-[#E8C97A] transition-colors cursor-pointer"
                >
                  Imperial Emeralds
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('collections')}
                  className="hover:text-[#E8C97A] transition-colors cursor-pointer"
                >
                  Cosmic Gold Cuff
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('collections')}
                  className="hover:text-[#E8C97A] transition-colors cursor-pointer"
                >
                  Celestial Horology
                </button>
              </li>
            </ul>
          </div>

          {/* Atelier & Maison */}
          <div className="space-y-4">
            <h4 className="font-serif-luxury text-sm font-semibold tracking-widest text-[#F5F0E6] uppercase">
              The Maison
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setActivePage('craft')}
                  className="hover:text-[#E8C97A] transition-colors cursor-pointer"
                >
                  The Geneva Craft Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('about')}
                  className="hover:text-[#E8C97A] transition-colors cursor-pointer"
                >
                  Ethical Gemstone Provenance
                </button>
              </li>
              <li>
                <button
                  onClick={() => openAppointmentModal()}
                  className="hover:text-[#E8C97A] transition-colors cursor-pointer"
                >
                  Book Private Salon
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('contact')}
                  className="hover:text-[#E8C97A] transition-colors cursor-pointer"
                >
                  Global Salons (Geneva, Paris, NYC)
                </button>
              </li>
            </ul>
          </div>

          {/* Certifications & Guarantees */}
          <div className="space-y-4">
            <h4 className="font-serif-luxury text-sm font-semibold tracking-widest text-[#F5F0E6] uppercase">
              Guarantees
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-[#C9A84C] shrink-0 mt-0.5" />
                <span>GIA & SSEF Swiss Certified Gemstones</span>
              </div>
              <div className="flex items-start gap-2">
                <Gem className="h-4 w-4 text-[#C9A84C] shrink-0 mt-0.5" />
                <span>100% Recycled & Fairmined 18k Gold</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#C9A84C] shrink-0 mt-0.5" />
                <span>Fully Insured Global Armored Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#A39E94]/60 gap-4">
          <p>© {new Date().getFullYear()} AURELIA Joaillerie S.A. All rights reserved. Registered in Geneva, Switzerland.</p>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-[#E8C97A] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#E8C97A] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#E8C97A] transition-colors">Cookie Vault</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
