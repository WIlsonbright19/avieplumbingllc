import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Phone } from 'lucide-react';

interface StickyServiceStoryProps {
  reducedMotion: boolean;
  onOpenBooking: (serviceName?: string) => void;
  className?: string;
}

const PINNED_STEPS = [
  {
    step: '01',
    title: 'CALL',
    heading: 'Direct Santa Ana Dispatch',
    description: 'Speak directly with our team. We evaluate your plumbing issue and schedule immediate dispatch or convenient appointment times.',
    image: new URL('../assets/images/cinematic_plumber_work_1790942471629.jpg', import.meta.url).href,
    clipReveal: 'from-bottom',
  },
  {
    step: '02',
    title: 'FIND',
    heading: 'Diagnostic Pinpoint Accuracy',
    description: 'Our experienced technicians isolate the root cause using acoustic listeners, fiber cameras, and pressure telemetry before touching pipework.',
    image: new URL('../assets/images/hero_cinematic_pipework_1790941373113.jpg', import.meta.url).href,
    clipReveal: 'from-left',
  },
  {
    step: '03',
    title: 'FIX',
    heading: 'Clean, Code-Compliant Resolution',
    description: 'We complete every repair with premium copper and brass components, clean work areas, and verify total hydraulic system stability.',
    image: new URL('../assets/images/curved_technical_plumbing_1790941386699.jpg', import.meta.url).href,
    clipReveal: 'from-right',
  },
];

export const StickyServiceStory: React.FC<StickyServiceStoryProps> = ({
  reducedMotion,
  onOpenBooking,
  className = '',
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const current = PINNED_STEPS[activeStep];

  const getClipInitial = (type: string) => {
    if (reducedMotion) return 'inset(0 0 0 0)';
    if (type === 'from-bottom') return 'inset(100% 0 0 0)';
    if (type === 'from-left') return 'inset(0 100% 0 0)';
    return 'inset(0 0 0 100%)';
  };

  return (
    <section
      id="how-we-work"
      className={`relative w-full py-28 md:py-40 bg-[#FFFFFF] border-y border-[#D7DEE1] overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Large Navy Typography & Step Selector */}
          <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-36">
            <div>
              <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#4F9DA6] uppercase font-semibold block mb-3">
                HOW WE WORK
              </span>
              <h2 className="text-4xl sm:text-6xl font-semibold tracking-[-0.03em] text-[#10232D] uppercase leading-[0.96]">
                Structured.
                <br />
                Dependable.
              </h2>
            </div>

            {/* Step Selection Buttons */}
            <div className="space-y-4">
              {PINNED_STEPS.map((stepItem, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={stepItem.step}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-5 rounded-[8px] border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-[#F7F6F1] border-[#10232D] shadow-none'
                        : 'bg-[#FFFFFF] border-[#D7DEE1] hover:border-[#10232D]/40'
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <span
                        className={`text-sm font-mono font-bold ${
                          isActive ? 'text-[#4F9DA6]' : 'text-[#69767D]'
                        }`}
                      >
                        {stepItem.step}
                      </span>
                      <span
                        className={`text-xl font-semibold uppercase tracking-tight ${
                          isActive ? 'text-[#10232D]' : 'text-[#69767D]'
                        }`}
                      >
                        {stepItem.title}
                      </span>
                    </div>

                    <div
                      className={`w-3 h-3 rounded-full transition-colors ${
                        isActive ? 'bg-[#4F9DA6]' : 'bg-[#D7DEE1]'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Step Detail Copy */}
            <div className="pt-4 space-y-3">
              <h3 className="text-xl font-semibold uppercase text-[#10232D]">
                {current.heading}
              </h3>
              <p className="text-sm sm:text-base text-[#69767D] leading-relaxed font-normal">
                {current.description}
              </p>

              <button
                onClick={() => onOpenBooking(`Process Step: ${current.title}`)}
                className="mt-4 px-6 py-3 bg-[#10232D] hover:bg-[#4F9DA6] text-[#FFFFFF] rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Schedule Service
              </button>
            </div>
          </div>

          {/* Right Column: Large Image with Asymmetric Clip-Path Reveals */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-[12px] overflow-hidden border border-[#D7DEE1] bg-[#F7F6F1]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.step}
                  src={current.image}
                  alt={current.heading}
                  initial={{
                    clipPath: getClipInitial(current.clipReveal),
                    opacity: 0.8,
                  }}
                  animate={{
                    clipPath: 'inset(0 0 0 0)',
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.2 },
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Step HUD Overlay */}
              <div className="absolute bottom-6 left-6 bg-[#FFFFFF]/90 backdrop-blur-md px-4 py-2 rounded border border-[#D7DEE1] text-xs font-mono text-[#10232D]">
                STEP {current.step} // {current.title}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
