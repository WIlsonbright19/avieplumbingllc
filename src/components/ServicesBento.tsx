import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface ServicesBentoProps {
  reducedMotion: boolean;
  onOpenBooking: (serviceName?: string) => void;
  className?: string;
}

interface ServiceCard {
  step: string;
  title: string;
  description: string;
  image: string;
  action: string;
}

const SERVICES_LIST: ServiceCard[] = [
  {
    step: '01',
    title: 'PLUMBING',
    description: 'Leaks, fixtures and repairs.',
    image: new URL('../assets/images/hero_cinematic_pipework_1790941373113.jpg', import.meta.url).href,
    action: 'Plumbing Repair',
  },
  {
    step: '02',
    title: 'WATER HEATERS',
    description: 'Service and replacement.',
    image: new URL('../assets/images/water_heater_precision_1790941399196.jpg', import.meta.url).href,
    action: 'Water Heater Service',
  },
  {
    step: '03',
    title: 'DRAINS',
    description: 'Clogs and line problems.',
    image: new URL('../assets/images/service_drain_sewer_1790941410348.jpg', import.meta.url).href,
    action: 'Drain Cleaning',
  },
];

export const ServicesBento: React.FC<ServicesBentoProps> = ({
  reducedMotion,
  onOpenBooking,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10% 0px -10% 0px' });

  return (
    <section
      id="services"
      ref={containerRef}
      className={`relative w-full py-24 md:py-36 bg-[#F7F6F1] overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Block */}
        <div className="mb-16 md:mb-24 max-w-4xl">
          <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#4F9DA6] uppercase font-semibold block mb-4">
            SERVICES
          </span>

          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-semibold tracking-[-0.03em] text-[#10232D] uppercase leading-[0.96]">
            Plumbing.
            <br />
            Water heaters.
            <br />
            Drains.
          </h2>
        </div>

        {/* 3-Card Editorial Grid: White Panels on Warm Ivory */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES_LIST.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              animate={isInView || reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.6,
                delay: idx * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => onOpenBooking(item.action)}
              className="group bg-[#FFFFFF] border border-[#D7DEE1] rounded-[8px] p-4 flex flex-col justify-between cursor-pointer transition-transform duration-350 hover:-translate-y-1 shadow-none"
              style={{
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              {/* Card Image */}
              <div className="relative aspect-[4/3] w-full rounded-[6px] overflow-hidden bg-[#F7F6F1] mb-6">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{
                    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />
              </div>

              {/* Card Content */}
              <div className="p-2 space-y-3">
                <div className="text-xs font-mono text-[#69767D] uppercase">
                  {item.step}
                </div>

                <div className="relative overflow-hidden">
                  <h3 className="text-2xl font-semibold uppercase text-[#10232D] tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                    {item.title}
                  </h3>
                  {/* Subtle Accent Line */}
                  <div className="h-[2px] w-full bg-[#4F9DA6] scale-x-0 origin-left transition-transform duration-350 group-hover:scale-x-100 mt-1" />
                </div>

                <p className="text-sm text-[#69767D] font-normal leading-relaxed pt-1">
                  {item.description}
                </p>

                <div className="pt-4 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#10232D] group-hover:text-[#4F9DA6] transition-colors">
                  <span>Schedule Service</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
