import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowUp, Phone, MapPin } from 'lucide-react';

interface FooterSectionProps {
  reducedMotion: boolean;
  onOpenBooking: (serviceName?: string) => void;
  className?: string;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  reducedMotion,
  onOpenBooking,
  className = '',
}) => {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: '-10% 0px -10% 0px' });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const footerLinks = [
    { label: 'PLUMBING', href: '#services' },
    { label: 'WATER HEATERS', href: '#water-heaters' },
    { label: 'DRAINS', href: '#services' },
    { label: 'EMERGENCY', href: '#emergency' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <footer
      ref={footerRef}
      className={`relative bg-[#10232D] text-[#FFFFFF] pt-20 pb-16 overflow-hidden border-t border-[#183642] ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Animated Thin Divider in #4B626B */}
        <motion.div
          initial={reducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
          animate={isInView || reducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
          style={{ transformOrigin: 'left center' }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full h-[1px] bg-[#4B626B] mb-16"
        />

        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 items-start">
          {/* Business Info Column */}
          <motion.div
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            animate={isInView || reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="md:col-span-5 space-y-4"
          >
            <div className="text-xl font-bold tracking-tight text-[#FFFFFF] uppercase">
              AVIE PLUMBING LLC
            </div>
            <p className="text-sm text-[#B7C2C7] leading-relaxed max-w-sm font-normal">
              Reliable plumbing repair, high-efficiency water heaters, and drain services for Santa Ana residences and businesses.
            </p>
            <div className="pt-2 space-y-1.5 text-xs font-mono text-[#B7C2C7]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#4F9DA6]" />
                <span>1464 Maple St, Santa Ana, CA 92707</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#4F9DA6]" />
                <span className="tabular-numbers">(657) 272-3124</span>
              </div>
            </div>
          </motion.div>

          {/* Navigation Links Column */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono tracking-widest text-[#B7C2C7]/70 uppercase mb-4">
              SERVICES & NAVIGATION
            </div>
            <ul className="space-y-3">
              {footerLinks.map((link, idx) => (
                <motion.li
                  key={link.label}
                  initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  animate={isInView || reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <a
                    href={link.href}
                    className="text-sm font-medium tracking-wide uppercase text-[#B7C2C7] hover:text-[#FFFFFF] hover-underline-cinematic transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Santa Ana Service Area Callout */}
          <motion.div
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            animate={isInView || reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{
              duration: 0.55,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="md:col-span-3 space-y-4 bg-[#183642] p-6 rounded-[8px] border border-[#4B626B]"
          >
            <div className="text-xs font-mono tracking-widest text-[#DCECEE] uppercase">
              SANTA ANA DISPATCH
            </div>
            <p className="text-xs text-[#B7C2C7] leading-relaxed">
              Fast local response throughout Santa Ana and surrounding Orange County communities.
            </p>
            <a
              href="tel:6572723124"
              className="inline-block text-xs font-bold font-mono text-[#FFFFFF] hover:text-[#4F9DA6] transition-colors"
            >
              CALL (657) 272-3124 →
            </a>
          </motion.div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 border-t border-[#4B626B]/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#B7C2C7]/70">
          <div>
            © {new Date().getFullYear()} AVIE PLUMBING LLC. ALL RIGHTS RESERVED.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[#B7C2C7] hover:text-[#FFFFFF] transition-colors cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#4F9DA6]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
