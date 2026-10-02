import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';

interface SignatureImageHolderProps {
  reducedMotion: boolean;
  className?: string;
}

export const SignatureImageHolder: React.FC<SignatureImageHolderProps> = ({
  reducedMotion,
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

  const imageSrc = new URL('../assets/images/curved_technical_plumbing_1790941386699.jpg', import.meta.url).href;

  return (
    <section
      ref={containerRef}
      className={`relative w-full py-16 md:py-24 bg-[#F7F6F1] overflow-hidden flex flex-col items-center ${className}`}
    >
      {/* Signature Long Curved Image Frame (82–88vw width, 40–48vh desktop) */}
      <div className="w-[92vw] sm:w-[86vw] max-w-7xl h-[40vh] sm:h-[48vh] rounded-[16px] border border-[#D7DEE1] overflow-hidden bg-[#FFFFFF] relative ml-auto mr-auto md:mr-12 shadow-none select-none">
        <motion.div
          style={{ y: parallaxY }}
          className="w-full h-[115%] -top-[7%] relative"
        >
          {/* Signature Reveal: inset(0 50% 0 50%) to inset(0) */}
          <motion.img
            src={imageSrc}
            alt="Precision architectural plumbing pipework"
            initial={
              reducedMotion
                ? { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }
                : { clipPath: 'inset(0 50% 0 50%)', scale: 1.07 }
            }
            animate={
              isInView || reducedMotion
                ? { clipPath: 'inset(0 0 0 0)', scale: 1 }
                : { clipPath: 'inset(0 50% 0 50%)', scale: 1.07 }
            }
            transition={{
              duration: 1.0,
              delay: 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* Minimal Editorial Badge */}
        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-[#FFFFFF]/95 backdrop-blur-md px-4 py-2 rounded border border-[#D7DEE1] text-[11px] font-mono text-[#10232D] tracking-wider uppercase">
          SANTA ANA // MECHANICAL PRECISION
        </div>
      </div>
    </section>
  );
};
