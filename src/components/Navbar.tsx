import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (serviceName?: string) => void;
  reducedMotion?: boolean;
  onToggleReducedMotion?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Plumbing', href: '#services' },
    { label: 'Water Heaters', href: '#water-heaters' },
    { label: 'Emergency', href: '#emergency' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#F7F6F1]/98 backdrop-blur-[12px] border-b border-[#D7DEE1] shadow-[0_4px_24px_rgba(16,35,45,0.08)] py-3.5 sm:py-4'
            : 'bg-[#F7F6F1]/92 backdrop-blur-[10px] border-b border-[#D7DEE1]/80 shadow-[0_2px_14px_rgba(16,35,45,0.05)] py-4 sm:py-5'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div className="w-full px-3.5 sm:px-5 md:px-6 lg:px-8 flex items-center justify-between relative">
          {/* Left Zone: Brand Logo */}
          <div className="flex items-center">
            <a
              href="#"
              className="flex items-center gap-2 text-lg md:text-xl font-bold tracking-tight text-[#10232D] uppercase select-none transition-colors hover:text-[#4F9DA6]"
            >
              <span className="w-2 h-2 rounded-full bg-[#4F9DA6] inline-block" />
              <span>Avie Plumbing</span>
            </a>
          </div>

          {/* Middle Zone: Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10 text-sm font-semibold tracking-wide uppercase text-[#10232D] absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover-underline-cinematic hover:text-[#4F9DA6] transition-colors py-1 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Zone: Actions (Desktop & Tablet/Mobile) */}
          <div className="flex items-center gap-3">
            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3.5">
              <a
                href="tel:6572723124"
                aria-label="Call (657) 272-3124"
                className="flex items-center gap-2 text-sm font-semibold text-[#10232D] hover:text-[#4F9DA6] bg-[#FFFFFF] hover:bg-[#F7F6F1] border border-[#D7DEE1] rounded-md px-3.5 py-2 transition-all shadow-sm"
                title="Call (657) 272-3124"
              >
                <Phone className="w-3.5 h-3.5 text-[#4F9DA6]" />
                <span className="text-xs font-mono font-medium tabular-numbers">(657) 272-3124</span>
              </a>

              <button
                onClick={() => onOpenBooking('Priority Consultation')}
                className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#FFFFFF] bg-[#10232D] hover:bg-[#4F9DA6] rounded-md transition-all duration-300 active:translate-y-0 hover:-translate-y-0.5 shadow-sm cursor-pointer whitespace-nowrap"
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                Call Now
              </button>
            </div>

            {/* Tablet & Mobile Quick Call + Hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href="tel:6572723124"
                aria-label="Call (657) 272-3124"
                className="flex items-center justify-center w-10 h-10 bg-[#FFFFFF] hover:bg-[#F7F6F1] border border-[#D7DEE1] rounded-md shadow-sm text-[#10232D] hover:text-[#4F9DA6] transition-colors"
                title="Call (657) 272-3124"
              >
                <Phone className="w-4 h-4 text-[#4F9DA6]" />
              </a>

              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label="Toggle Navigation Menu"
                className="flex flex-col justify-center items-center w-10 h-10 gap-1.5 cursor-pointer z-50 p-2 bg-[#FFFFFF] hover:bg-[#F7F6F1] border border-[#D7DEE1] rounded-md shadow-sm transition-colors"
              >
                <span
                  className={`w-5 h-[2px] bg-[#10232D] transition-transform duration-300 ${
                    mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
                  }`}
                  style={{
                    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />
                <span
                  className={`w-5 h-[2px] bg-[#10232D] transition-opacity duration-300 ${
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`w-5 h-[2px] bg-[#10232D] transition-transform duration-300 ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                  }`}
                  style={{
                    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile/Tablet Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-30 bg-[#F7F6F1] pt-28 pb-12 px-8 sm:px-12 flex flex-col justify-between lg:hidden overflow-y-auto"
          >
            <div className="space-y-6 pt-6">
              <span className="text-xs font-mono tracking-widest text-[#69767D] uppercase block">
                NAVIGATION
              </span>
              <nav className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-[#10232D] hover:text-[#4F9DA6] transition-colors flex items-center justify-between group py-1"
                  >
                    <span>{link.label}</span>
                    <span className="w-8 h-[2px] bg-transparent group-hover:bg-[#4F9DA6] transition-colors" />
                  </a>
                ))}
              </nav>
            </div>

            <div className="space-y-4 pt-8 border-t border-[#D7DEE1] max-w-md w-full">
              <a
                href="tel:6572723124"
                className="w-full py-4 bg-[#10232D] hover:bg-[#183642] text-[#FFFFFF] text-center rounded-lg text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#4F9DA6]" />
                <span>Call (657) 272-3124</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking('Mobile & Tablet Request');
                }}
                className="w-full py-3.5 bg-transparent border border-[#10232D] hover:border-[#4F9DA6] text-[#10232D] hover:bg-[#10232D] hover:text-[#FFFFFF] text-center rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Get Service
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
