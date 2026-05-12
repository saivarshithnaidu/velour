'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { mannequinData } from '@/lib/products';

const categories = Object.keys(mannequinData);

export default function MannequinSection() {
  const [selected, setSelected] = useState('DRESSES');
  const data = mannequinData[selected];

  return (
    <section className="relative flex items-center bg-[var(--color-bg)] overflow-hidden section-padding min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 w-full">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-0">
          {/* Left: Category Pills */}
          <div className="md:w-1/4 flex md:flex-col gap-3 overflow-x-auto md:overflow-visible no-scrollbar pb-4 md:pb-0 w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelected(cat)}
                className={`relative font-label px-5 py-3 border transition-all duration-400 whitespace-nowrap
                  ${
                    selected === cat
                      ? 'border-[var(--color-gold)] text-[var(--color-gold)] bg-[var(--color-gold)]/5'
                      : 'border-[var(--color-cream)]/10 text-[var(--color-cream)]/50 hover:border-[var(--color-cream)]/30 hover:text-[var(--color-cream)]'
                  }`}
                style={{ fontSize: '11px', letterSpacing: '0.2em', minHeight: '44px' }}
              >
                {selected === cat && (
                  <motion.div
                    layoutId="mannequin-active"
                    className="absolute inset-0 border border-[var(--color-gold)]"
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                {cat}
              </button>
            ))}
          </div>

          {/* Center: Mannequin Image */}
          <div className="md:w-1/2 flex items-center justify-center">
            <div className="relative w-[300px] h-[500px] md:w-[400px] md:h-[600px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={data.image}
                    alt={`${selected} outfit`}
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'center top' }}
                    priority
                    sizes="(max-width: 768px) 300px, 400px"
                  />
                  {/* Vignette overlay */}
                  <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(10,10,10,0.5)]" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="md:w-1/4 flex flex-col items-center md:items-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-center md:text-left"
              >
                <span className="font-label block mb-3" style={{ fontSize: '10px', letterSpacing: '0.3em', color: 'var(--color-gold)' }}>
                  {selected}
                </span>
                <h3 className="font-heading text-3xl md:text-4xl text-[var(--color-cream)] font-light mb-2">
                  {data.product}
                </h3>
                <p className="font-body text-lg mb-6" style={{ color: 'var(--color-gold)', margin: '0 0 24px 0', maxWidth: 'none' }}>
                  {data.price}
                </p>
                <Link
                  href="/collections"
                  className="inline-flex items-center gap-2 font-label hover:text-[var(--color-gold)] transition-colors group"
                  style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(245,240,232,0.7)' }}
                >
                  VIEW COLLECTION
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
