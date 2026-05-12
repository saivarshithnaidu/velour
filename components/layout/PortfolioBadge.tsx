'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function PortfolioBadge() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[100]"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <motion.div
        className="relative overflow-hidden rounded-full border border-[var(--color-gold)]/30 backdrop-blur-md"
        style={{ backgroundColor: 'rgba(10, 10, 10, 0.85)' }}
        layout
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="expanded"
              className="px-6 py-4 flex flex-col gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="font-label text-[10px] text-[var(--color-gold)]">
                BUILT BY
              </span>
              <Link
                href="https://growxlabs.tech"
                target="_blank"
                className="text-[var(--color-cream)] text-sm font-body hover:text-[var(--color-gold)] transition-colors"
              >
                GrowXLabsTech
              </Link>
              <span className="text-[var(--color-grey)] text-xs font-body mt-1">
                Want this for your brand?
              </span>
              <a
                href="mailto:hello@growxlabs.tech"
                className="text-[var(--color-gold)] text-xs font-body hover:underline"
              >
                hello@growxlabs.tech
              </a>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              className="px-4 py-2.5 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
              <span className="font-label text-[10px] text-[var(--color-cream)]/70 whitespace-nowrap">
                BUILT BY GROWXLABSTECH
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
