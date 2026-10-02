import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface HorizontalFlowStripProps {
  reducedMotion: boolean;
  backgroundImage?: string;
  className?: string;
}

const FLOW_ITEMS = [
  'LEAKS',
  'DRAINS',
  'WATER HEATERS',
  'SEWER',
  'WATER LINES',
  'HYDRONICS',
  'PRESSURE',
  'BACKFLOW',
];

export const HorizontalFlowStrip: React.FC<HorizontalFlowStripProps> = ({
  reducedMotion,
  backgroundImage,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Text 100% movement, background image 80% movement
  const textX = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? ['0vw', '0vw'] : ['0vw', '-18vw']
  );

  const bgX = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? ['0vw', '0vw'] : ['0vw', '-14.4vw']
  );

  return (
    <section
      ref={containerRef}
      className={`relative py-20 md:py-28 overflow-hidden ${backgroundImage ? 'bg-transparent' : 'bg-[#EFECE4]'} text-stone-900 select-none border-y border-stone-300/80 ${className}`}
    >
      {/* Optional Background image */}
      {backgroundImage && (
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={backgroundImage}
            alt="Flow backdrop"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Background Subtle Technical Grid / Flow Texture (80% movement) */}
      <motion.div
        style={{ x: bgX }}
        className="hidden md:block absolute inset-0 opacity-10 pointer-events-none whitespace-nowrap text-[180px] font-black uppercase text-stone-500 leading-none select-none tracking-tighter"
      >
        <span>FLOW SYSTEM PRESSURE BALANCE VALVES FLOW VELOCITY</span>
      </motion.div>

      <div className="relative z-10 max-w-full">
        {/* Horizontal Moving Editorial Strip (100% movement) */}
        <motion.div
          style={{ x: textX }}
          className="hidden md:flex items-center gap-12 whitespace-nowrap pl-12"
        >
          {FLOW_ITEMS.concat(FLOW_ITEMS).map((item, index) => (
            <div key={`${item}-${index}`} className="flex items-center gap-12 shrink-0">
              <span className="text-5xl lg:text-7xl font-black uppercase tracking-tight text-stone-900/90 hover:text-stone-950 transition-colors">
                {item}
              </span>
              <span className="text-2xl font-light text-stone-400">/</span>
            </div>
          ))}
        </motion.div>

        {/* Mobile View: Clean Editorial Stack / Horizontal Scroll List */}
        <div className="flex md:hidden flex-wrap items-center justify-center gap-3 px-6">
          {FLOW_ITEMS.slice(0, 6).map((item) => (
            <span
              key={item}
              className="text-lg font-bold uppercase tracking-tight text-stone-800 px-3 py-1 bg-[#FAF8F5] border border-stone-300/80 rounded"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
