'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/lib/store';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();

  useEffect(() => {
    // Fade in after 1.5s on homepage
    const timer = setTimeout(() => setIsVisible(true), 1500);

    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : -20,
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="transition-all duration-500"
          style={{
            backgroundColor: hasScrolled ? 'rgba(10, 10, 10, 0.9)' : 'transparent',
            backdropFilter: hasScrolled ? 'blur(20px)' : 'none',
            borderBottom: hasScrolled ? '1px solid rgba(201, 169, 110, 0.1)' : '1px solid transparent',
          }}
        >
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <span className="font-heading text-2xl md:text-3xl tracking-[0.15em] text-[var(--color-cream)] font-light">
                VELOUR
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              <NavLink href="/collections">COLLECTION</NavLink>
              <NavLink href="/collections?category=DRESSES">DRESSES</NavLink>
              <NavLink href="/collections?category=OUTERWEAR">OUTERWEAR</NavLink>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-6">
              {/* Search */}
              <button className="text-[var(--color-cream)] hover:text-[var(--color-gold)] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="relative text-[var(--color-cream)] hover:text-[var(--color-gold)] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[var(--color-gold)] text-[var(--color-dark)] text-[10px] font-body font-medium flex items-center justify-center"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden text-[var(--color-cream)]"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <div className="flex flex-col gap-1.5 w-6">
                  <motion.span
                    className="block h-[1px] bg-current"
                    animate={{
                      rotate: isMobileMenuOpen ? 45 : 0,
                      y: isMobileMenuOpen ? 3.5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="block h-[1px] bg-current"
                    animate={{
                      opacity: isMobileMenuOpen ? 0 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="block h-[1px] bg-current"
                    animate={{
                      rotate: isMobileMenuOpen ? -45 : 0,
                      y: isMobileMenuOpen ? -3.5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[90] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0"
              style={{ backgroundColor: 'rgba(10, 10, 10, 0.95)', backdropFilter: 'blur(20px)' }}
            />
            <motion.div
              className="relative flex flex-col items-center justify-center h-full gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <MobileNavLink href="/collections" onClick={() => setIsMobileMenuOpen(false)}>
                COLLECTION
              </MobileNavLink>
              <MobileNavLink href="/collections?category=DRESSES" onClick={() => setIsMobileMenuOpen(false)}>
                DRESSES
              </MobileNavLink>
              <MobileNavLink href="/collections?category=OUTERWEAR" onClick={() => setIsMobileMenuOpen(false)}>
                OUTERWEAR
              </MobileNavLink>
              <MobileNavLink href="/collections?category=TOPS" onClick={() => setIsMobileMenuOpen(false)}>
                TOPS
              </MobileNavLink>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="font-label text-[11px] text-[var(--color-cream)]/70 hover:text-[var(--color-gold)] transition-colors duration-300 relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--color-gold)] group-hover:w-full transition-all duration-300" />
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="font-heading text-4xl text-[var(--color-cream)] hover:text-[var(--color-gold)] transition-colors duration-300"
    >
      {children}
    </Link>
  );
}
