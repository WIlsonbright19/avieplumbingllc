import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
  reducedMotion?: boolean;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete, reducedMotion = false }) => {
  const [phase, setPhase] = useState<'enter' | 'pipe' | 'pulse' | 'label' | 'exit' | 'done'>('enter');

  useEffect(() => {
    if (reducedMotion) {
      onComplete();
      setPhase('done');
      return;
    }

    // Sequence timing as per exact motion spec
    const t1 = setTimeout(() => setPhase('pipe'), 80);
    const t2 = setTimeout(() => setPhase('pulse'), 200);
    const t3 = setTimeout(() => setPhase('label'), 350);
    const t4 = setTimeout(() => setPhase('exit'), 1200);
    const t5 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 1650);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete, reducedMotion]);

  if (phase === 'done') return null;

  const isExiting = phase === 'exit';

  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        initial={{ opacity: 1, y: 0 }}
        animate={{
          opacity: isExiting ? 0 : 1,
          y: isExiting ? -25 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed inset-0 z-50 flex flex-col justify-between p-8 md:p-14 bg-[#F7F6F1] select-none pointer-events-none"
        role="status"
        aria-live="polite"
        aria-label="Loading AVIE PLUMBING"
      >
        {/* Top-Left: Brand Name in Primary Dark #10232D */}
        <div className="overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-xs md:text-sm font-bold tracking-widest text-[#10232D] uppercase font-mono"
          >
            AVIE PLUMBING
          </motion.div>
        </div>

        {/* Center: Thin Pipe Line with Fluid Pulse */}
        <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
          {/* Pipe Track Line */}
          <div className="relative w-full h-[1.5px] bg-[#10232D]/15 overflow-hidden">
            {/* Pipe Draw from left */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{
                scaleX: isExiting ? 0 : 1,
              }}
              style={{
                transformOrigin: isExiting ? 'right center' : 'left center',
              }}
              transition={{
                duration: isExiting ? 0.45 : 0.65,
                delay: isExiting ? 0 : 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0 bg-[#10232D]"
            >
              {/* Fluid Pulse traveling through the pipe */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{
                  x: phase === 'pulse' || phase === 'label' || phase === 'exit' ? '100%' : '-100%',
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute top-0 bottom-0 w-24 bg-[#4F9DA6]"
              />
            </motion.div>
          </div>

          {/* Underneath: LOADING in Muted Text #69767D */}
          <div className="overflow-hidden mt-4">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: phase === 'label' || phase === 'exit' ? 1 : 0,
                y: phase === 'label' || phase === 'exit' ? 0 : 8,
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[11px] font-mono tracking-[0.25em] text-[#69767D] uppercase"
            >
              LOADING
            </motion.div>
          </div>
        </div>

        {/* Bottom subtle status */}
        <div className="text-[11px] font-mono text-[#69767D]/60 tracking-wider">
          SANTA ANA, CA // 01
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
