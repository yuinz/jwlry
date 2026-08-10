import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LuxuryCursor } from './components/LuxuryCursor';
import { ToastContainer } from './components/ToastContainer';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { InquiryDrawer } from './components/InquiryDrawer';
import { AppointmentModal } from './components/AppointmentModal';

import { HomePage } from './pages/HomePage';
import { CollectionsPage } from './pages/CollectionsPage';
import { SingleCollectionPage } from './pages/SingleCollectionPage';
import { PieceDetailPage } from './pages/PieceDetailPage';
import { CraftPage } from './pages/CraftPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

const MainContent: React.FC = () => {
  const { activePage } = useApp();

  return (
    <main className="min-h-screen">
      {activePage === 'home' && <HomePage />}
      {activePage === 'collections' && <CollectionsPage />}
      {activePage === 'collection-detail' && <SingleCollectionPage />}
      {activePage === 'piece-detail' && <PieceDetailPage />}
      {activePage === 'craft' && <CraftPage />}
      {activePage === 'about' && <AboutPage />}
      {activePage === 'contact' && <ContactPage />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#0A0A0A] text-[#F5F0E6] flex flex-col font-sans selection:bg-[#C9A84C]/30 selection:text-[#FFF8E7]">
        <LuxuryCursor />
        <Navbar />
        <MainContent />
        <Footer />

        {/* Global Drawers & Modals */}
        <CommandPalette />
        <InquiryDrawer />
        <AppointmentModal />
        <ToastContainer />
      </div>
    </AppProvider>
  );
}
