'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const shopLinks = [
  { label: 'New Arrivals', href: '/collections' },
  { label: 'Dresses', href: '/collections?category=DRESSES' },
  { label: 'Tops', href: '/collections?category=TOPS' },
  { label: 'Outerwear', href: '/collections?category=OUTERWEAR' },
  { label: 'Bottoms', href: '/collections?category=BOTTOMS' },
  { label: 'Sale', href: '/collections' },
];

const brandLinks = [
  { label: 'Our Story', href: '#' },
  { label: 'Sustainability', href: '#' },
  { label: 'Craftsmanship', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Press', href: '#' },
];

const helpLinks = [
  { label: 'Shipping Info', href: '#' },
  { label: 'Returns', href: '#' },
  { label: 'Size Guide', href: '#' },
  { label: 'Contact Us', href: '#' },
  { label: 'FAQ', href: '#' },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#0A0A0A',
        borderTop: '1px solid rgba(201, 169, 110, 0.2)',
      }}
    >
      {/* Ghost Text */}
      <div style={{ paddingTop: '80px', paddingBottom: '0', textAlign: 'center' }}>
        <div
          className="font-heading"
          style={{
            fontSize: 'clamp(80px, 12vw, 180px)',
            fontWeight: 300,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(245, 240, 232, 0.15)',
            letterSpacing: '0.3em',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          VELOUR
        </div>
        {/* Gold Divider */}
        <div
          style={{
            width: '60px',
            height: '1px',
            backgroundColor: 'var(--color-gold)',
            margin: '40px auto',
            opacity: 0.5,
          }}
        />
      </div>

      {/* Four Column Grid — Desktop */}
      <div className="hidden md:block" style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }}>
          {/* Column 1 — Brand */}
          <div>
            <Link href="/">
              <span
                className="font-heading"
                style={{ fontSize: '24px', color: 'var(--color-cream)', fontWeight: 300 }}
              >
                VELOUR
              </span>
            </Link>
            <p
              className="font-body"
              style={{
                fontSize: '13px',
                fontWeight: 300,
                color: 'rgba(245, 240, 232, 0.5)',
                marginTop: '12px',
                lineHeight: 1.6,
                maxWidth: 'none',
              }}
            >
              Wear the Silence
            </p>
            {/* Social Icons */}
            <div style={{ marginTop: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
              <SocialIcon href="https://instagram.com" label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://pinterest.com" label="Pinterest">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.25 2.67 7.9 6.44 9.34-.09-.78-.17-1.99.04-2.85.18-.78 1.17-4.97 1.17-4.97s-.3-.6-.3-1.48c0-1.39.81-2.43 1.81-2.43.85 0 1.27.64 1.27 1.41 0 .86-.55 2.14-.83 3.33-.24 1 .5 1.81 1.48 1.81 1.78 0 3.14-1.87 3.14-4.58 0-2.39-1.72-4.07-4.18-4.07-2.85 0-4.52 2.14-4.52 4.35 0 .86.33 1.78.75 2.28.08.1.09.19.07.29-.08.31-.25 1-.28 1.14-.05.19-.15.23-.35.14-1.3-.6-2.11-2.5-2.11-4.02 0-3.28 2.38-6.29 6.87-6.29 3.61 0 6.41 2.57 6.41 6.01 0 3.59-2.26 6.47-5.41 6.47-1.06 0-2.05-.55-2.39-1.2l-.65 2.48c-.24.91-.88 2.05-1.31 2.75.99.31 2.03.47 3.12.47 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://tiktok.com" label="TikTok">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Column 2 — SHOP */}
          <FooterColumn title="SHOP" links={shopLinks} />

          {/* Column 3 — BRAND */}
          <FooterColumn title="BRAND" links={brandLinks} />

          {/* Column 4 — HELP */}
          <FooterColumn title="HELP" links={helpLinks} />
        </div>
      </div>

      {/* Mobile — Accordion Columns */}
      <div className="md:hidden" style={{ padding: '40px 24px' }}>
        {/* Brand section — always visible on mobile */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link href="/">
            <span
              className="font-heading"
              style={{ fontSize: '24px', color: 'var(--color-cream)', fontWeight: 300 }}
            >
              VELOUR
            </span>
          </Link>
          <p
            className="font-body"
            style={{
              fontSize: '13px',
              fontWeight: 300,
              color: 'rgba(245, 240, 232, 0.5)',
              marginTop: '8px',
              maxWidth: 'none',
            }}
          >
            Wear the Silence
          </p>
          <div style={{ marginTop: '20px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <SocialIcon href="https://instagram.com" label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </SocialIcon>
            <SocialIcon href="https://pinterest.com" label="Pinterest">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.25 2.67 7.9 6.44 9.34-.09-.78-.17-1.99.04-2.85.18-.78 1.17-4.97 1.17-4.97s-.3-.6-.3-1.48c0-1.39.81-2.43 1.81-2.43.85 0 1.27.64 1.27 1.41 0 .86-.55 2.14-.83 3.33-.24 1 .5 1.81 1.48 1.81 1.78 0 3.14-1.87 3.14-4.58 0-2.39-1.72-4.07-4.18-4.07-2.85 0-4.52 2.14-4.52 4.35 0 .86.33 1.78.75 2.28.08.1.09.19.07.29-.08.31-.25 1-.28 1.14-.05.19-.15.23-.35.14-1.3-.6-2.11-2.5-2.11-4.02 0-3.28 2.38-6.29 6.87-6.29 3.61 0 6.41 2.57 6.41 6.01 0 3.59-2.26 6.47-5.41 6.47-1.06 0-2.05-.55-2.39-1.2l-.65 2.48c-.24.91-.88 2.05-1.31 2.75.99.31 2.03.47 3.12.47 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
              </svg>
            </SocialIcon>
            <SocialIcon href="https://tiktok.com" label="TikTok">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </SocialIcon>
          </div>
        </div>

        <AccordionColumn title="SHOP" links={shopLinks} />
        <AccordionColumn title="BRAND" links={brandLinks} />
        <AccordionColumn title="HELP" links={helpLinks} />
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          padding: '24px 40px',
        }}
      >
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ maxWidth: '1200px', margin: '0 auto' }}
        >
          <p
            className="font-body"
            style={{
              fontSize: '12px',
              fontWeight: 300,
              color: 'rgba(245, 240, 232, 0.3)',
              margin: 0,
              maxWidth: 'none',
            }}
          >
            © 2026 VELOUR. All rights reserved.
          </p>
          <a
            href="https://growxlabs.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body"
            style={{
              fontSize: '12px',
              fontWeight: 300,
              color: 'rgba(201, 169, 110, 0.5)',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
              margin: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(201, 169, 110, 0.5)')}
          >
            Built by GrowXLabsTech
          </a>
          <p
            className="font-body"
            style={{
              fontSize: '12px',
              fontWeight: 300,
              color: 'rgba(245, 240, 232, 0.3)',
              margin: 0,
              maxWidth: 'none',
            }}
          >
            Privacy Policy &nbsp;·&nbsp; Terms &nbsp;·&nbsp; Cookies
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ── Sub-Components ── */

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4
        className="font-label"
        style={{
          fontSize: '11px',
          letterSpacing: '0.2em',
          color: 'var(--color-gold)',
          marginBottom: '24px',
        }}
      >
        {title}
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="font-body"
            style={{
              fontSize: '14px',
              fontWeight: 300,
              color: 'rgba(245, 240, 232, 0.55)',
              textDecoration: 'none',
              lineHeight: 2.2,
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-cream)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245, 240, 232, 0.55)')}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function AccordionColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 0',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          minHeight: '52px',
        }}
      >
        <span
          className="font-label"
          style={{
            fontSize: '11px',
            letterSpacing: '0.2em',
            color: 'var(--color-gold)',
          }}
        >
          {title}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ color: 'rgba(245, 240, 232, 0.4)', fontSize: '18px' }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingBottom: '16px', display: 'flex', flexDirection: 'column' }}>
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-body"
                  style={{
                    fontSize: '14px',
                    fontWeight: 300,
                    color: 'rgba(245, 240, 232, 0.55)',
                    textDecoration: 'none',
                    lineHeight: 2.2,
                    minHeight: '44px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        color: 'rgba(245, 240, 232, 0.4)',
        transition: 'color 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '44px',
        height: '44px',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245, 240, 232, 0.4)')}
    >
      {children}
    </a>
  );
}
