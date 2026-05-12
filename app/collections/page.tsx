'use client';

import { useState, useRef, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { products, categories, type Product } from '@/lib/products';

function CollectionsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'ALL';
  const [active, setActive] = useState(initialCategory);

  const filtered = active === 'ALL' ? products : products.filter((p) => p.category === active);

  return (
    <main className="min-h-screen bg-[var(--color-bg)] pt-28 pb-20">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-12">
        <motion.h1
          className="font-heading text-[clamp(2.5rem,5vw,4rem)] text-[var(--color-cream)] font-light text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          COLLECTION
        </motion.h1>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-20 z-50 bg-[var(--color-bg)]/90 backdrop-blur-md border-b border-[var(--color-cream)]/5 mb-12">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-4 flex gap-6 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`font-label text-xs tracking-[0.2em] whitespace-nowrap transition-colors relative pb-1 ${
                active === cat ? 'text-[var(--color-gold)]' : 'text-[var(--color-cream)]/40 hover:text-[var(--color-cream)]'
              }`}
            >
              {cat}
              {active === cat && (
                <motion.div
                  layoutId="filter-underline"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--color-gold)]"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {filtered.map((product, i) => {
            const isLarge = i % 3 === 0;
            return (
              <div key={product.id} className={isLarge ? 'md:col-span-2 md:row-span-2' : ''}>
                <ProductCard product={product} index={i} isLarge={isLarge} />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--color-bg)]" />}>
      <CollectionsContent />
    </Suspense>
  );
}

function ProductCard({ product, index, isLarge }: { product: Product; index: number; isLarge: boolean }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/products/${product.slug}`}>
        <div
          className={`relative overflow-hidden group ${isLarge ? 'aspect-[3/4]' : 'aspect-[3/4]'}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <motion.div className="absolute inset-0" animate={{ scale: hovered ? 1.05 : 1 }} transition={{ duration: 0.6 }}>
            <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
          </motion.div>
          {product.images[1] && (
            <motion.div className="absolute inset-0" animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.4 }}>
              <Image src={product.images[1]} alt={`${product.name} alt`} fill className="object-cover" />
            </motion.div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/60 to-transparent" />
          <motion.div className="absolute bottom-0 left-0 right-0 p-5" animate={{ y: hovered ? 0 : 10, opacity: hovered ? 1 : 0.8 }}>
            <span className="font-label text-[10px] tracking-[0.3em] text-[var(--color-gold)]">{product.category}</span>
            <h3 className="font-heading text-xl text-[var(--color-cream)] font-light mt-1">{product.name}</h3>
            <motion.p className="font-body text-sm text-[var(--color-gold)] mt-1" animate={{ opacity: hovered ? 1 : 0 }}>
              {product.currency}{product.price}
            </motion.p>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
