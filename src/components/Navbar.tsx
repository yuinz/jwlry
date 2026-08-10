import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp, ActivePage } from '../context/AppContext';
import {
  Search,
  Heart,
  ShoppingBag,
  Volume2,
  VolumeX,
  Menu,
  X,
  Sparkles,
  Calendar,
  Compass
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    wishlist,
    inquiryItems,
    setIsInquiryOpen,
    openAppointmentModal,
    setIsCommandPaletteOpen,
    soundEnabled,
    setSoundEnabled,
    cursorEnabled,
    setCursorEnabled
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; page: ActivePage }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Collections', page: 'collections' },
    { label: 'Craft Atelier', page: 'craft' },
    { label: 'Private Salons', page: 'contact' },
    { label: 'Philosophy', page: 'about' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-[#C9A84C]/20 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'bg-gradient-to-b from-[#0A0A0A]/90 via-[#0A0A0A]/40 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => setActivePage('home')}
            className="group text-left flex flex-col items-start focus:outline-none cursor-pointer"
            data-cursor="Home"
          >
            <span className="font-serif-luxury text-2xl sm:text-3xl font-normal tracking-[0.2em] text-[#F5F0E6] group-hover:text-[#E8C97A] transition-colors duration-300">
              AURELIA
            </span>
            <span className="text-[9px] font-mono-luxury tracking-[0.35em] text-[#C9A84C] uppercase opacity-90 -mt-1">
              Haute Joaillerie • Genève
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = activePage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => setActivePage(item.page)}
                  data-cursor="Navigate"
                  className={`relative text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-300 cursor-pointer ${
                    isActive ? 'text-[#E8C97A]' : 'text-[#A39E94] hover:text-[#F5F0E6]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Command Palette Trigger */}
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              data-cursor="Search"
              className="p-2 rounded-full text-[#A39E94] hover:text-[#E8C97A] hover:bg-[#C9A84C]/10 transition-colors cursor-pointer flex items-center gap-1.5"
              title="Search Collections (Cmd + K)"
            >
              <Search className="h-4 w-4" />
              <span className="hidden xl:inline text-[10px] font-mono-luxury tracking-widest text-[#A39E94] bg-[#161616] px-1.5 py-0.5 rounded border border-[#C9A84C]/20">
                ⌘K
              </span>
            </button>

            {/* Private Viewing CTA Button */}
            <button
              onClick={() => openAppointmentModal()}
              data-cursor="Book"
              className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C9A84C]/40 bg-[#C9A84C]/10 text-[#E8C97A] hover:bg-[#C9A84C]/20 hover:border-[#E8C97A] transition-all text-xs font-medium tracking-widest uppercase cursor-pointer"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Private Viewing</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setActivePage('collections')}
              data-cursor="Wishlist"
              className="relative p-2 rounded-full text-[#A39E94] hover:text-[#E8C97A] hover:bg-[#C9A84C]/10 transition-colors cursor-pointer"
              title="Wishlist"
            >
              <Heart className="h-4 w-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#C9A84C] text-[#0A0A0A] font-mono-luxury text-[9px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Inquiry Bag Button */}
            <button
              onClick={() => setIsInquiryOpen(true)}
              data-cursor="Inquiry"
              className="relative p-2 rounded-full text-[#A39E94] hover:text-[#E8C97A] hover:bg-[#C9A84C]/10 transition-colors cursor-pointer"
              title="Inquiry Bag"
            >
              <ShoppingBag className="h-4 w-4" />
              {inquiryItems.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gradient-to-r from-[#E8C97A] to-[#C9A84C] text-[#0A0A0A] font-mono-luxury text-[9px] font-bold flex items-center justify-center animate-pulse">
                  {inquiryItems.length}
                </span>
              )}
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              data-cursor="Audio"
              className={`p-2 rounded-full transition-colors cursor-pointer hidden sm:block ${
                soundEnabled ? 'text-[#C9A84C] bg-[#C9A84C]/10' : 'text-[#A39E94]/60 hover:text-[#A39E94]'
              }`}
              title={soundEnabled ? 'Mute Audio Cues' : 'Enable Audio Cues'}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>

            {/* Custom Cursor Toggle */}
            <button
              onClick={() => setCursorEnabled(!cursorEnabled)}
              data-cursor="Cursor"
              className={`p-2 rounded-full transition-colors cursor-pointer hidden lg:block ${
                cursorEnabled ? 'text-[#E8C97A] bg-[#C9A84C]/10' : 'text-[#A39E94]/60'
              }`}
              title={cursorEnabled ? 'Disable Custom Cursor' : 'Enable Luxury Ring Cursor'}
            >
              <Sparkles className="h-4 w-4" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-[#F5F0E6] hover:text-[#E8C97A] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[60px] z-30 bg-[#0A0A0A]/98 backdrop-blur-2xl border-b border-[#C9A84C]/30 md:hidden overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col space-y-6">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.page}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => {
                    setActivePage(item.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left text-lg font-serif-luxury tracking-wider transition-colors ${
                    activePage === item.page ? 'text-[#E8C97A]' : 'text-[#F5F0E6]/80'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}

              <div className="pt-4 border-t border-[#C9A84C]/20 flex flex-col gap-3">
                <button
                  onClick={() => {
                    openAppointmentModal();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 rounded-full border border-[#C9A84C] bg-[#C9A84C]/15 text-[#E8C97A] text-xs font-medium tracking-widest uppercase flex items-center justify-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Book Private Viewing</span>
                </button>

                <div className="flex items-center justify-between text-xs text-[#A39E94] pt-2">
                  <span>Audio Effects</span>
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="text-[#E8C97A] font-mono-luxury"
                  >
                    {soundEnabled ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
