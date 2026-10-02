import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface LayeredTransitionsProps {
  reducedMotion: boolean;
  onOpenBooking: (serviceName?: string) => void;
  className?: string;
}

export const LayeredTransitionsAndStatements: React.FC<LayeredTransitionsProps> = ({
  reducedMotion,
  onOpenBooking,
  className = '',
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-15% 0px -15% 0px' });

  return (
    <section
      id="approach"
      ref={sectionRef}
      className={`relative w-full py-28 md:py-48 bg-[#F7F6F1] overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12 md:space-y-16">
        {/* Small Label */}
        <div className="overflow-hidden">
          <motion.div
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            animate={isInView || reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#4F9DA6] uppercase font-semibold"
          >
            THE APPROACH
          </motion.div>
        </div>

        {/* Editorial Oversized Headline */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[100px] font-semibold tracking-[-0.04em] text-[#10232D] uppercase leading-[0.94] max-w-5xl">
          <div className="overflow-hidden">
            <motion.div
              initial={reducedMotion ? { y: 0 } : { y: 50 }}
              animate={isInView || reducedMotion ? { y: 0 } : { y: 50 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Fast response.
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div
              initial={reducedMotion ? { y: 0 } : { y: 50 }}
              animate={isInView || reducedMotion ? { y: 0 } : { y: 50 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Clear answers.
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div
              initial={reducedMotion ? { y: 0 } : { y: 50 }}
              animate={isInView || reducedMotion ? { y: 0 } : { y: 50 }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[#69767D]"
            >
              Clean work.
            </motion.div>
          </div>
        </h2>

        {/* Supporting Text */}
        <motion.p
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={isInView || reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.55,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-lg sm:text-xl md:text-2xl text-[#69767D] max-w-3xl font-normal leading-relaxed pt-4"
        >
          Professional plumbing service from the first call to the finished repair.
        </motion.p>
      </div>
    </section>
  );
};
