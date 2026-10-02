import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Phone, MapPin, ArrowUpRight } from 'lucide-react';

interface EmergencyCTASectionProps {
  reducedMotion: boolean;
  onOpenBooking: (serviceName?: string) => void;
  className?: string;
}

export const EmergencyCTASection: React.FC<EmergencyCTASectionProps> = ({
  reducedMotion,
  onOpenBooking,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-15% 0px -15% 0px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], reducedMotion ? [1, 1] : [1.07, 1]);
  const bgTranslateY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? ['0%', '0%'] : ['-4%', '4%']
  );

  const emergencyImage = new URL('../assets/images/final_cta_atmosphere_1790941419421.jpg', import.meta.url).href;
  const waterFlowImage = new URL('../assets/images/cinematic_water_flow_1790942460334.jpg', import.meta.url).href;

  return (
    <div className="space-y-0">
      {/* 01: EMERGENCY SECTION — When it can't wait. */}
      <section
        id="emergency"
        className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#10232D] text-[#FFFFFF]"
      >
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <img
            src={emergencyImage}
            alt="Emergency plumbing services Santa Ana"
            className="w-full h-full object-cover filter brightness-75"
          />
          <div className="absolute inset-0 bg-[#10232D]/75" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-20 text-center flex flex-col items-center space-y-6">
          <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#DCECEE] uppercase font-semibold">
            EMERGENCY PLUMBING
          </span>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-semibold uppercase tracking-tight text-[#FFFFFF]">
            When it can't wait.
          </h2>

          <p className="text-base sm:text-xl text-[#DCECEE] max-w-xl font-normal leading-relaxed">
            Call when a plumbing problem needs attention.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:6572723124"
              className="px-8 py-4 bg-[#F7F6F1] text-[#10232D] hover:bg-[#4F9DA6] hover:text-[#FFFFFF] rounded text-xs sm:text-sm font-semibold uppercase tracking-wider flex items-center gap-3 transition-all duration-300 active:translate-y-0 hover:-translate-y-0.5 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#10232D]" />
              <span className="tabular-numbers">Call (657) 272-3124</span>
            </a>

            <button
              onClick={() => onOpenBooking('Urgent Emergency Request')}
              className="px-8 py-4 bg-transparent border border-[#DCECEE]/50 hover:border-[#FFFFFF] text-[#FFFFFF] hover:bg-[#FFFFFF]/10 rounded text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Request Dispatch
            </button>
          </div>
        </div>
      </section>

      {/* 02: FINAL CTA SECTION — Need a plumber? */}
      <section
        id="contact"
        ref={containerRef}
        className="relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#10232D] text-[#FFFFFF]"
      >
        <motion.div
          style={{
            scale: bgScale,
            y: bgTranslateY,
          }}
          className="absolute inset-0 w-full h-[115%] -top-[7%] pointer-events-none"
        >
          <img
            src={waterFlowImage}
            alt="Avie Plumbing LLC Santa Ana"
            className="w-full h-full object-cover object-center"
          />
          {/* Overlay: rgba(16,35,45,0.68) */}
          <div className="absolute inset-0 bg-[#10232D]/70" />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-24 md:py-36 text-center flex flex-col items-center space-y-8">
          {/* Small Label */}
          <motion.div
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            animate={isInView || reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#DCECEE] uppercase font-semibold"
          >
            SANTA ANA
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            animate={isInView || reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{
              duration: 0.8,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold uppercase tracking-[-0.03em] text-[#FFFFFF] leading-[0.94]"
          >
            Need a plumber?
          </motion.h2>

          {/* Supporting & Phone */}
          <motion.div
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={isInView || reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.5,
              delay: 0.24,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="space-y-2"
          >
            <p className="text-xl sm:text-2xl text-[#DCECEE] font-normal">
              Avie Plumbing LLC
            </p>
            <p className="text-2xl sm:text-3xl font-mono font-bold text-[#FFFFFF] tracking-tight tabular-numbers">
              (657) 272-3124
            </p>
          </motion.div>

          {/* Actions: CALL NOW / GET DIRECTIONS */}
          <motion.div
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={isInView || reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{
              duration: 0.45,
              delay: 0.32,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <a
              href="tel:6572723124"
              className="px-8 py-4 bg-[#F7F6F1] text-[#10232D] hover:bg-[#4F9DA6] hover:text-[#FFFFFF] rounded text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 active:translate-y-0 hover:-translate-y-0.5 cursor-pointer shadow-none flex items-center gap-2"
              style={{
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <Phone className="w-4 h-4 text-[#10232D]" />
              <span>CALL NOW</span>
            </a>

            <a
              href="https://maps.google.com/?q=1464+Maple+St,+Santa+Ana,+CA+92707"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-transparent border border-[#DCECEE]/50 hover:border-[#FFFFFF] text-[#FFFFFF] hover:bg-[#FFFFFF]/10 rounded text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-[#4F9DA6]" />
              <span>GET DIRECTIONS</span>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
