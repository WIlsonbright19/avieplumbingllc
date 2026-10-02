import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { ArrowRight, Phone } from 'lucide-react';

interface DiagnosticsMatrixSectionProps {
  reducedMotion: boolean;
  onOpenBooking: (serviceName?: string) => void;
  className?: string;
}

export const DiagnosticsMatrixSection: React.FC<DiagnosticsMatrixSectionProps> = ({
  reducedMotion,
  onOpenBooking,
  className = '',
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-15% 0px -15% 0px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgTranslateY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? ['0%', '0%'] : ['-6%', '6%']
  );

  const imageSrc = new URL('../assets/images/sanctuary_copper_manifold_1790942562421.jpg', import.meta.url).href;

  return (
    <section
      id="diagnostic-parallax"
      ref={sectionRef}
      className={`relative w-full min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#10232D] text-[#FFFFFF] ${className}`}
    >
      {/* Dark Plumbing Background Image with Deep Navy Overlay */}
      <motion.div
        style={{ y: bgTranslateY }}
        className="absolute inset-0 w-full h-[115%] -top-[7%] pointer-events-none"
      >
        <img
          src={imageSrc}
          alt="Technical pipework inspection and repair"
          className="w-full h-full object-cover object-center filter brightness-90"
        />
        {/* Deep Navy Overlay */}
        <div className="absolute inset-0 bg-[#183642]/70" />
      </motion.div>

      {/* Foreground Typographic Reveal */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36 w-full text-center flex flex-col items-center">
        <div className="max-w-4xl space-y-8">
          {/* Small Label: PLUMBING */}
          <motion.div
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            animate={isInView || reducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#DCECEE] uppercase font-semibold"
          >
            PLUMBING
          </motion.div>

          {/* Headline: "Find it. Fix it." */}
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-semibold tracking-[-0.04em] text-[#FFFFFF] uppercase leading-[0.92] relative inline-block">
            <span className="block">Find it.</span>
            <span className="block text-[#DCECEE]/90">Fix it.</span>

            {/* Accent Underline #4F9DA6 */}
            <motion.div
              initial={reducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
              animate={isInView || reducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
              style={{ transformOrigin: 'center center' }}
              transition={{
                duration: 0.8,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full h-[3px] bg-[#4F9DA6] mt-4 mx-auto"
            />
          </h2>

          <p className="text-base sm:text-xl text-[#DCECEE] max-w-xl mx-auto font-normal leading-relaxed pt-2">
            Non-invasive leak isolation and clean mechanical pipe restoration for Santa Ana homes.
          </p>

          <div className="pt-6">
            <button
              onClick={() => onOpenBooking('Inspection & Leak Repair')}
              className="px-8 py-4 bg-[#F7F6F1] text-[#10232D] hover:bg-[#4F9DA6] hover:text-[#FFFFFF] text-xs sm:text-sm font-semibold uppercase tracking-wider rounded transition-all duration-300 active:translate-y-0 hover:-translate-y-0.5 cursor-pointer"
            >
              Book Diagnostic Inspection
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
