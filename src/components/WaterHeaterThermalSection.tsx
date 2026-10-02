import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Phone, ArrowUpRight } from 'lucide-react';

interface WaterHeaterThermalSectionProps {
  reducedMotion: boolean;
  onOpenBooking: (serviceName?: string) => void;
  className?: string;
}

export const WaterHeaterThermalSection: React.FC<WaterHeaterThermalSectionProps> = ({
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

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? ['0%', '0%'] : ['-4%', '4%']
  );

  const imageSrc = new URL('../assets/images/cinematic_tankless_system_1790942483580.jpg', import.meta.url).href;

  return (
    <section
      id="water-heaters"
      ref={containerRef}
      className={`relative w-full min-h-[75vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#10232D] text-[#FFFFFF] ${className}`}
    >
      {/* Full-Width Background Cinematic Image with Deep Navy #10232D Overlay (0.60) */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 w-full h-[115%] -top-[7%] pointer-events-none"
      >
        <img
          src={imageSrc}
          alt="Water heater replacement and service"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#10232D]/65" />
      </motion.div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36 w-full">
        <div className="max-w-3xl space-y-6 md:space-y-8">
          {/* Small Label */}
          <div className="overflow-hidden">
            <motion.div
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              animate={isInView || reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#DCECEE] uppercase font-semibold"
            >
              WATER HEATERS
            </motion.div>
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.04em] text-[#FFFFFF] uppercase leading-[0.94]">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reducedMotion ? { y: 0 } : { y: 50 }}
                animate={isInView || reducedMotion ? { y: 0 } : { y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Hot water.
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block text-[#DCECEE]/90"
                initial={reducedMotion ? { y: 0 } : { y: 50 }}
                animate={isInView || reducedMotion ? { y: 0 } : { y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Handled.
              </motion.span>
            </span>
          </h2>

          {/* Supporting Text */}
          <motion.p
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={isInView || reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.55,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-lg sm:text-xl md:text-2xl text-[#DCECEE] max-w-2xl font-normal leading-relaxed"
          >
            Service, maintenance and replacement.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={isInView || reducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <a
              href="tel:6572723124"
              className="px-8 py-4 bg-[#F7F6F1] text-[#10232D] hover:bg-[#4F9DA6] hover:text-[#FFFFFF] text-xs sm:text-sm font-semibold uppercase tracking-wider rounded transition-all duration-300 active:translate-y-0 hover:-translate-y-0.5 cursor-pointer flex items-center gap-3"
              style={{
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <Phone className="w-4 h-4 text-[#10232D]" />
              <span>Call Now</span>
            </a>

            <button
              onClick={() => onOpenBooking('Water Heater Service Request')}
              className="px-8 py-4 bg-transparent border border-[#DCECEE]/50 hover:border-[#FFFFFF] text-[#FFFFFF] hover:bg-[#FFFFFF]/10 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded transition-all duration-300 active:translate-y-0 hover:-translate-y-0.5 cursor-pointer"
            >
              Request Estimate
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
