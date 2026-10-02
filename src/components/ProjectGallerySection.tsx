import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface ProjectGallerySectionProps {
  reducedMotion: boolean;
  onOpenBooking: (serviceName?: string) => void;
  className?: string;
}

interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  meta: string;
}

const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: 'slide-plumbing',
    title: 'Plumbing',
    subtitle: 'Residential & Commercial Fixture Overhauls',
    description: 'Precision pipe repair, pressure balancing valves, and sanitary system installations built to last.',
    image: new URL('../assets/images/hero_cinematic_pipework_1790941373113.jpg', import.meta.url).href,
    meta: 'SANTA ANA // COPPER & PEX-A',
  },
  {
    id: 'slide-water-heaters',
    title: 'Water Heaters',
    subtitle: 'Tankless & High-Efficiency Heating Systems',
    description: 'Instant continuous hot water delivery, descaling maintenance, and seamless code-compliant gas transitions.',
    image: new URL('../assets/images/cinematic_tankless_system_1790942483580.jpg', import.meta.url).href,
    meta: '199K BTU // CONDENSING UEF 0.98',
  },
  {
    id: 'slide-drains',
    title: 'Drains',
    subtitle: 'High-Pressure Hydro-Scouring & Optical Scans',
    description: 'Pulsating 4,000 PSI hydro-scrubbing that restores aged main lines back to 100% factory internal bore.',
    image: new URL('../assets/images/service_drain_sewer_1790941410348.jpg', import.meta.url).href,
    meta: '4K OPTICAL CAMERA PROFILE',
  },
  {
    id: 'slide-leaks',
    title: 'Leaks',
    subtitle: 'Sub-Surface Acoustic & Thermal Isolation',
    description: 'Locating pressurized slab leaks beneath floors and concrete without invasive destruction of your living space.',
    image: new URL('../assets/images/luxury_residential_manifold_1790943511516.jpg', import.meta.url).href,
    meta: 'NON-INVASIVE TELEMETRY',
  },
];

export const ProjectGallerySection: React.FC<ProjectGallerySectionProps> = ({
  reducedMotion,
  onOpenBooking,
  className = '',
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const slide = CAROUSEL_SLIDES[currentIdx];

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? CAROUSEL_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  return (
    <section
      id="editorial-carousel"
      className={`relative w-full py-28 md:py-40 bg-[#F7F6F1] overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8">
          <div>
            <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#4F9DA6] uppercase font-semibold block mb-3">
              SYSTEM DOSSIER
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.03em] text-[#10232D] uppercase leading-[0.96]">
              Work in focus.
            </h2>
          </div>

          {/* Stepper Navigation Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              aria-label="Previous slide"
              className="p-3 bg-[#FFFFFF] hover:bg-[#10232D] text-[#10232D] hover:text-[#FFFFFF] border border-[#D7DEE1] rounded transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Linear Step Indicators (Active Aqua #4F9DA6, Inactive Steel #D7DEE1) */}
            <div className="flex items-center gap-2">
              {CAROUSEL_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                    currentIdx === idx ? 'w-8 bg-[#4F9DA6]' : 'w-4 bg-[#D7DEE1]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next slide"
              className="p-3 bg-[#10232D] hover:bg-[#4F9DA6] text-[#FFFFFF] rounded transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Editorial Carousel Card Container (White Panels & Steel Borders) */}
        <div className="relative bg-[#FFFFFF] border border-[#D7DEE1] rounded-[12px] p-6 sm:p-10 md:p-14 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Animated Large Image */}
            <div className="lg:col-span-7 relative aspect-[16/10] w-full rounded-[8px] overflow-hidden border border-[#D7DEE1] bg-[#F7F6F1]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={slide.id}
                  src={slide.image}
                  alt={slide.title}
                  initial={
                    reducedMotion
                      ? { opacity: 1 }
                      : { opacity: 0, x: 25 }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  exit={
                    reducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, x: -25 }
                  }
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Technical HUD */}
              <div className="absolute top-4 left-4 bg-[#FFFFFF]/90 backdrop-blur-md px-3 py-1.5 rounded border border-[#D7DEE1] text-[11px] font-mono text-[#10232D]">
                {slide.meta}
              </div>
            </div>

            {/* Right Column: Slide Text Details */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono text-[#69767D] uppercase">
                0{currentIdx + 1} // 0{CAROUSEL_SLIDES.length}
              </span>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold uppercase text-[#10232D] tracking-tight">
                {slide.title}
              </h3>

              <h4 className="text-base font-semibold text-[#183642]">
                {slide.subtitle}
              </h4>

              <p className="text-sm sm:text-base text-[#69767D] font-normal leading-relaxed">
                {slide.description}
              </p>

              <div className="pt-4">
                <button
                  onClick={() => onOpenBooking(`Consultation: ${slide.title}`)}
                  className="px-6 py-3.5 bg-[#10232D] hover:bg-[#4F9DA6] text-[#FFFFFF] rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 group"
                >
                  <span>Request {slide.title} Service</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
