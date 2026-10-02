import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ShieldCheck, Quote, Star, Pause, Play } from 'lucide-react';

interface ReviewsCarouselSectionProps {
  reducedMotion: boolean;
  onOpenBooking: (serviceName?: string) => void;
  className?: string;
}

interface Review {
  id: string;
  author: string;
  role: string;
  location: string;
  headline: string;
  content: string;
  service: string;
  date: string;
  rating: number;
}

const REVIEWS_LIST: Review[] = [
  {
    id: 'rev-1',
    author: 'Marcus Vance, AIA',
    role: 'Principal Architect',
    location: 'Santa Ana, CA',
    headline: 'Fast diagnostic isolation with zero invasive demolition.',
    content: 'Avie Plumbing diagnosed a concealed slab pipe leak under finished stone flooring using acoustic frequency correlators. The repair was completed cleanly in 3 hours with minimal incision and spotless cleanup.',
    service: 'Leak Isolation',
    date: 'February 2026',
    rating: 5,
  },
  {
    id: 'rev-2',
    author: 'Elena Rostova',
    role: 'Property Manager',
    location: 'Floral Park, Santa Ana',
    headline: 'Continuous endless hot water across multiple fixtures.',
    content: 'They replaced our aging water heater with a high-efficiency tankless system and balanced recirculation loop. The copper manifold soldering is pristine and hot water deliverability is instantaneous.',
    service: 'Tankless Installation',
    date: 'January 2026',
    rating: 5,
  },
  {
    id: 'rev-3',
    author: 'David K. Sterling',
    role: 'Commercial Facility Director',
    location: 'Metro Santa Ana, CA',
    headline: '4,000 PSI hydro-jetting cleared our main line completely.',
    content: 'Camera diagnostics followed by pulsation hydro-scouring cleared chronic buildup in our commercial building drainage. Transparent itemized pricing and punctual, professional conduct throughout.',
    service: 'Drain Clearing',
    date: 'March 2026',
    rating: 5,
  },
  {
    id: 'rev-4',
    author: 'Sarah Lin-Morrison',
    role: 'Homeowner',
    location: 'Historic French Park, CA',
    headline: 'Repaired our emergency burst pipe on a Sunday evening.',
    content: 'Arrived within 35 minutes of our emergency call. The technician immediately isolated the riser rupture, pressure-tested the manifold, and restored domestic water pressure without damaging original cabinetry.',
    service: 'Emergency Response',
    date: 'March 2026',
    rating: 5,
  },
  {
    id: 'rev-5',
    author: 'Robert Hensley',
    role: 'Estate General Contractor',
    location: 'Orange County, CA',
    headline: 'Flawless copper rough-in and fixture trim installation.',
    content: 'We exclusively sub-contract Avie Plumbing for our custom residential builds. Their hydronic pipe geometry, valving layout, and pressure regulation testing consistently exceed county inspection standards.',
    service: 'Whole-Home Piping',
    date: 'April 2026',
    rating: 5,
  },
];

const AUTO_ROTATE_INTERVAL_MS = 5500; // 5.5 seconds

export const ReviewsCarouselSection: React.FC<ReviewsCarouselSectionProps> = ({
  reducedMotion,
  onOpenBooking,
  className = '',
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const review = REVIEWS_LIST[currentIdx];

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIdx((prev) => (prev === 0 ? REVIEWS_LIST.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIdx((prev) => (prev + 1) % REVIEWS_LIST.length);
  };

  const handleSelect = (idx: number) => {
    if (idx === currentIdx) return;
    setDirection(idx > currentIdx ? 1 : -1);
    setCurrentIdx(idx);
  };

  // Auto-advance interval
  useEffect(() => {
    if (isPaused || reducedMotion) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIdx((prev) => (prev + 1) % REVIEWS_LIST.length);
    }, AUTO_ROTATE_INTERVAL_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIdx, isPaused, reducedMotion]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: reducedMotion ? 0 : dir > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: reducedMotion ? 0 : dir > 0 ? -30 : 30,
      opacity: 0,
    }),
  };

  return (
    <section
      id="reviews"
      className={`relative w-full py-28 md:py-36 bg-[#F7F6F1] overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#4F9DA6] uppercase font-semibold block mb-3">
              CLIENT REVIEWS & DOSSIERS
            </span>
            <h2 className="text-4xl sm:text-6xl font-semibold tracking-[-0.03em] text-[#10232D] uppercase leading-[0.96]">
              Trusted in Santa Ana.
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              aria-label={isPaused ? 'Resume auto-rotation' : 'Pause auto-rotation'}
              className="p-3 bg-[#FFFFFF] hover:bg-[#F7F6F1] text-[#69767D] hover:text-[#10232D] border border-[#D7DEE1] rounded transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-mono"
              title={isPaused ? 'Resume auto-slide' : 'Pause auto-slide'}
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span className="hidden sm:inline">PLAY</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span className="hidden sm:inline">AUTO</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrev}
              aria-label="Previous review"
              className="p-3 bg-[#FFFFFF] hover:bg-[#10232D] text-[#10232D] hover:text-[#FFFFFF] border border-[#D7DEE1] rounded transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-[#69767D] tabular-numbers px-2">
              0{currentIdx + 1} / 0{REVIEWS_LIST.length}
            </span>
            <button
              onClick={handleNext}
              aria-label="Next review"
              className="p-3 bg-[#10232D] hover:bg-[#4F9DA6] text-[#FFFFFF] rounded transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Review Card */}
        <div className="relative bg-[#FFFFFF] border border-[#D7DEE1] rounded-[14px] p-8 sm:p-12 md:p-16 overflow-hidden shadow-sm">
          {/* Subtle Accent Progress Line for Auto-Rotate */}
          {!isPaused && !reducedMotion && (
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#D7DEE1]/40 overflow-hidden">
              <motion.div
                key={currentIdx}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: AUTO_ROTATE_INTERVAL_MS / 1000, ease: 'linear' }}
                className="h-full bg-[#4F9DA6]"
              />
            </div>
          )}

          <Quote className="absolute top-8 right-8 w-16 h-16 text-[#D7DEE1]/30 pointer-events-none" />

          <div className="min-h-[260px] flex flex-col justify-between">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={review.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6 relative z-10"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-[#F7F6F1] border border-[#D7DEE1] text-[11px] font-mono text-[#10232D] uppercase rounded font-medium">
                      {review.service}
                    </span>
                    <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-mono font-medium">
                      <ShieldCheck className="w-4 h-4" />
                      <span>VERIFIED CUSTOMER</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[#4F9DA6]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold uppercase text-[#10232D] tracking-tight leading-tight">
                  "{review.headline}"
                </h3>

                <p className="text-base sm:text-lg text-[#69767D] leading-relaxed font-normal max-w-4xl">
                  {review.content}
                </p>

                <div className="pt-6 border-t border-[#D7DEE1] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-base font-semibold text-[#10232D] uppercase">
                      {review.author}
                    </div>
                    <div className="text-xs text-[#69767D] mt-0.5">
                      {review.role} · {review.location}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-[#69767D]">
                      {review.date}
                    </span>
                    <button
                      onClick={() => onOpenBooking(review.service)}
                      className="text-xs font-mono text-[#4F9DA6] hover:text-[#10232D] uppercase font-semibold underline underline-offset-4 transition-colors cursor-pointer"
                    >
                      Book Similar Service →
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Pagination Dots / Progress Bars */}
          <div className="mt-8 pt-6 border-t border-[#D7DEE1]/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {REVIEWS_LIST.map((item, idx) => {
                const isActive = idx === currentIdx;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(idx)}
                    aria-label={`Go to review ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'w-8 bg-[#4F9DA6]'
                        : 'w-2 bg-[#D7DEE1] hover:bg-[#69767D]'
                    }`}
                  />
                );
              })}
            </div>

            <div className="text-xs font-mono text-[#69767D]">
              {isPaused ? 'Auto-slide paused (hovering)' : 'Rotating every 5.5s'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
