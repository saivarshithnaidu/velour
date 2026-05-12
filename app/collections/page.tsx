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
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 mb-12">
        <motion.span
          className="section-label block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          — SHOP —
        </motion.span>
        <motion.h1
          className="font-heading text-[clamp(2.5rem,5vw,4rem)] text-[var(--color-cream)] font-light text-center"
          style={{ letterSpacing: '-0.01em' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          COLLECTION
        </motion.h1>
      </div>

      {/* Filter Bar */}
      <div
        className="sticky top-[60px] md:top-[72px] z-50 mb-12"
        style={{
          backgroundColor: 'rgba(10, 10, 10, 0.9)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--color-border-subtle)',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 py-4 flex gap-6 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="font-label whitespace-nowrap transition-colors relative pb-1"
              style={{
                fontSize: '11px',
                letterSpacing: '0.2em',
                color: active === cat ? 'var(--color-gold)' : 'rgba(245,240,232,0.4)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {cat}
              {active === cat && (
                <motion.div
                  layoutId="filter-underline"
                  className="absolute bottom-0 left-0 right-0 h-[1px]"
                  style={{ backgroundColor: 'var(--color-gold)' }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid — 4 columns desktop, 2 columns tablet/mobile */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={<CollectionsSkeleton />}>
      <CollectionsContent />
    </Suspense>
  );
}

function CollectionsSkeleton() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] pt-28 pb-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10">
        <div className="skeleton w-48 h-10 mx-auto mb-12" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i}>
              <div className="skeleton w-full mb-3" style={{ aspectRatio: '3/4' }} />
              <div className="skeleton w-3/4 h-4 mb-2" />
              <div className="skeleton w-1/3 h-3 mb-1" />
              <div className="skeleton w-1/4 h-4" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/products/${product.slug}`}>
        <div
          className="relative overflow-hidden group"
          style={{
            aspectRatio: '3/4',
            border: hovered ? '1px solid rgba(201, 169, 110, 0.15)' : '1px solid transparent',
            backgroundColor: hovered ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
            transition: 'all 0.4s ease',
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ scale: hovered ? 1.04 : 1 }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              style={{ objectPosition: 'center top' }}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 25vw"
              loading={index < 4 ? 'eager' : 'lazy'}
            />
          </motion.div>
          {product.images[1] && (
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={product.images[1]}
                alt={`${product.name} alt`}
                fill
                className="object-cover"
                style={{ objectPosition: 'center top' }}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 25vw"
                loading="lazy"
              />
            </motion.div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/60 to-transparent" />

          {/* Quick Add — slides up on hover */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 flex items-center justify-center font-label"
            style={{
              height: '44px',
              backgroundColor: 'var(--color-cream)',
              color: 'var(--color-dark)',
              fontSize: '11px',
              letterSpacing: '0.15em',
            }}
            initial={{ y: '100%' }}
            animate={{ y: hovered ? 0 : '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            QUICK ADD
          </motion.div>
        </div>

        {/* Product Info */}
        <div style={{ padding: '16px 0 0' }}>
          <span className="font-label block mb-1" style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(201, 169, 110, 0.6)' }}>
            {product.category}
          </span>
          <h3 className="font-heading text-[18px] text-[var(--color-cream)] font-light mb-1">
            {product.name}
          </h3>
          <p className="font-body text-sm" style={{ color: 'var(--color-gold)', margin: 0, maxWidth: 'none' }}>
            {product.currency}{product.price}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
