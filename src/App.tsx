/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SignatureImageHolder } from './components/SignatureImageHolder';
import { ServicesBento } from './components/ServicesBento';
import { LayeredTransitionsAndStatements } from './components/LayeredTransitionsAndStatements';
import { StickyServiceStory } from './components/StickyServiceStory';
import { DiagnosticsMatrixSection } from './components/DiagnosticsMatrixSection';
import { WaterHeaterThermalSection } from './components/WaterHeaterThermalSection';
import { ProjectGallerySection } from './components/ProjectGallerySection';
import { ReviewsCarouselSection } from './components/ReviewsCarouselSection';
import { EmergencyCTASection } from './components/EmergencyCTASection';
import { FooterSection } from './components/FooterSection';
import { InteractiveBookingModal } from './components/InteractiveBookingModal';

export default function App() {
  const [preloaderFinished, setPreloaderFinished] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string | undefined>(
    undefined
  );

  // Prefers-reduced-motion detection & toggle
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const handleOpenBooking = (serviceName?: string) => {
    setSelectedServiceForBooking(serviceName || 'General Plumbing Repair');
    setBookingModalOpen(true);
  };

  const handleToggleReducedMotion = () => {
    setReducedMotion((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#F7F6F1] text-[#10232D] selection:bg-[#10232D] selection:text-[#F7F6F1] relative overflow-x-hidden">
      {/* 01 — Cinematic Pre-Loader */}
      <Preloader
        onComplete={() => setPreloaderFinished(true)}
        reducedMotion={reducedMotion}
      />

      {/* Navigation */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={handleToggleReducedMotion}
      />

      <main className="w-full">
        {/* 02 — Hero: "Plumbing. Done right." */}
        <HeroSection
          onOpenBooking={handleOpenBooking}
          reducedMotion={reducedMotion}
          preloaderFinished={preloaderFinished}
        />

        {/* 03 — Long Curved Image Holder */}
        <SignatureImageHolder
          reducedMotion={reducedMotion}
        />

        {/* 04 — Services: "Plumbing. Water heaters. Drains." */}
        <ServicesBento
          reducedMotion={reducedMotion}
          onOpenBooking={handleOpenBooking}
        />

        {/* 05 — Editorial Whitespace: "Fast response. Clear answers. Clean work." */}
        <LayeredTransitionsAndStatements
          reducedMotion={reducedMotion}
          onOpenBooking={handleOpenBooking}
        />

        {/* 06 — Pinned How-We-Work: 01 CALL, 02 FIND, 03 FIX */}
        <StickyServiceStory
          reducedMotion={reducedMotion}
          onOpenBooking={handleOpenBooking}
        />

        {/* 07 — Background Image Section: "Find it. Fix it." */}
        <DiagnosticsMatrixSection
          reducedMotion={reducedMotion}
          onOpenBooking={handleOpenBooking}
        />

        {/* 08 — Water Heaters: "Hot water. Handled." */}
        <WaterHeaterThermalSection
          reducedMotion={reducedMotion}
          onOpenBooking={handleOpenBooking}
        />

        {/* 09 — Editorial Image Carousel: Plumbing, Water Heaters, Drains, Leaks */}
        <ProjectGallerySection
          reducedMotion={reducedMotion}
          onOpenBooking={handleOpenBooking}
        />

        {/* 10 — Reviews Carousel: Verified Santa Ana Client Feedback */}
        <ReviewsCarouselSection
          reducedMotion={reducedMotion}
          onOpenBooking={handleOpenBooking}
        />

        {/* 11 & 12 — Emergency ("When it can't wait.") & Final CTA ("Need a plumber?") */}
        <EmergencyCTASection
          reducedMotion={reducedMotion}
          onOpenBooking={handleOpenBooking}
        />
      </main>

      {/* 13 — Refined Dark Footer */}
      <FooterSection
        reducedMotion={reducedMotion}
        onOpenBooking={handleOpenBooking}
      />

      {/* Interactive Booking & Dispatch Modal */}
      <InteractiveBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        defaultService={selectedServiceForBooking}
      />
    </div>
  );
}
