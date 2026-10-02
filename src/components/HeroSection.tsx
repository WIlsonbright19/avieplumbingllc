import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Phone, ArrowUpRight } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: (service?: string) => void;
  reducedMotion: boolean;
  preloaderFinished: boolean;
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  reducedMotion,
  preloaderFinished,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax linkage
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? ['0%', '0%'] : ['0%', '8%']
  );

  const heroImageSrc = new URL('../assets/images/hero_cinematic_pipework_1790941373113.jpg', import.meta.url).href;
  const shouldAnimate = preloaderFinished && !reducedMotion;

  return (
    <section
      ref={containerRef}
      className={`relative w-full min-h-[92vh] md:min-h-screen pt-32 pb-20 md:pt-44 md:pb-28 flex flex-col justify-between overflow-hidden bg-[#10232D] ${className}`}
    >
      {/* Full-Bleed Cinematic Photography with Deep Navy Overlay */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 w-full h-[115%] -top-[7%] pointer-events-none"
      >
        <motion.img
          src={heroImageSrc}
          alt="Cinematic architectural plumbing work"
          initial={reducedMotion ? { scale: 1, opacity: 1 } : { scale: 1.08, opacity: 0.75 }}
          animate={shouldAnimate ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
          transition={{
            duration: 1.0,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full h-full object-cover object-center"
        />
        {/* Deep Navy Overlay (rgba(16, 35, 45, 0.55)) */}
        <div className="absolute inset-0 bg-[#10232D]/60" />
      </motion.div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex-1 flex flex-col justify-center">
        <div className="max-w-4xl space-y-6 md:space-y-8">
          {/* Small Label: SANTA ANA PLUMBING */}
          <div className="overflow-hidden">
            <motion.div
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#DCECEE] uppercase font-semibold flex items-center gap-3"
            >
              <span className="w-2 h-2 rounded-full bg-[#4F9DA6]" />
              <span>SANTA ANA PLUMBING</span>
            </motion.div>
          </div>

          {/* Headline: "Plumbing. Done right." (Masked Vertical Reveal) */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[130px] font-semibold tracking-[-0.04em] text-[#FFFFFF] leading-[0.92] uppercase">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reducedMotion ? { y: 0 } : { y: 60 }}
                animate={shouldAnimate ? { y: 0 } : { y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Plumbing.
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block text-[#DCECEE]/90"
                initial={reducedMotion ? { y: 0 } : { y: 60 }}
                animate={shouldAnimate ? { y: 0 } : { y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.28,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Done right.
              </motion.span>
            </span>
          </h1>

          {/* Supporting Text */}
          <div className="overflow-hidden">
            <motion.p
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-base sm:text-xl md:text-2xl text-[#DCECEE] max-w-2xl font-normal leading-relaxed"
            >
              Fast, reliable plumbing service for homes and businesses.
            </motion.p>
          </div>

          {/* CTA Group */}
          <motion.div
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <a
              href="tel:6572723124"
              className="px-8 py-4 bg-[#F7F6F1] text-[#10232D] hover:bg-[#4F9DA6] hover:text-[#FFFFFF] text-xs md:text-sm font-semibold uppercase tracking-wider rounded transition-all duration-300 active:translate-y-0 hover:-translate-y-0.5 cursor-pointer shadow-none flex items-center gap-3"
              style={{
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <Phone className="w-4 h-4 text-[#10232D] group-hover:text-[#FFFFFF]" />
              <span>Call Now</span>
            </a>

            <button
              onClick={() => onOpenBooking('Hero Get Service')}
              className="px-8 py-4 bg-transparent border border-[#DCECEE]/50 hover:border-[#FFFFFF] text-[#FFFFFF] hover:bg-[#FFFFFF]/10 text-xs md:text-sm font-semibold uppercase tracking-wider rounded transition-all duration-300 active:translate-y-0 hover:-translate-y-0.5 cursor-pointer"
              style={{
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              Get Service
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom Subtle Location HUD */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-8 flex items-center justify-between text-xs font-mono text-[#DCECEE]/70 border-t border-[#D7DEE1]/15">
        <div>ORANGE COUNTY & SANTA ANA SERVICE DISPATCH</div>
        <div className="tabular-numbers">DIRECT: (657) 272-3124</div>
      </div>
    </section>
  );
};
