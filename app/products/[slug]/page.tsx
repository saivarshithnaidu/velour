'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getProductBySlug, getRelatedProducts } from '@/lib/products';
import { useCart } from '@/lib/store';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const related = getRelatedProducts(slug);
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  if (!product) {
    return (
      <main className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="font-heading text-4xl text-[var(--color-cream)]">Product Not Found</h1>
          <Link href="/collections" className="font-label text-xs text-[var(--color-gold)] mt-4 inline-block hover:text-[var(--color-gold-hover)]">
            BACK TO COLLECTION →
          </Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      currency: product.currency,
      size: selectedSize,
      color: product.colors[selectedColor].name,
      image: product.images[0],
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg)] pt-[80px] md:pt-[100px] pb-32 md:pb-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10">
        {/* Breadcrumb */}
        <motion.div
          className="mb-8 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/collections" className="font-label text-[10px] tracking-[0.2em] text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors">
            COLLECTION
          </Link>
          <span className="text-[var(--color-border-subtle)] text-xs">/</span>
          <span className="font-label text-[10px] tracking-[0.2em] text-[var(--color-gold)] uppercase">{product.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Image Gallery */}
          <div>
            <motion.div
              className="relative aspect-[3/4] overflow-hidden mb-4"
              initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'center top' }}
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
            
            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className="relative flex-shrink-0 w-20 h-24 overflow-hidden border transition-all"
                  style={{
                    borderColor: selectedImage === i ? 'var(--color-gold)' : 'transparent',
                    opacity: selectedImage === i ? 1 : 0.5,
                  }}
                  onMouseEnter={(e) => { if (selectedImage !== i) e.currentTarget.style.opacity = '1'; }}
                  onMouseLeave={(e) => { if (selectedImage !== i) e.currentTarget.style.opacity = '0.5'; }}
                >
                  <Image src={img} alt={`${product.name} thumbnail ${i + 1}`} fill className="object-cover" style={{ objectPosition: 'center top' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <motion.div
            className="md:sticky md:top-28 md:self-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="font-label block mb-3" style={{ fontSize: '10px', letterSpacing: '0.4em', color: 'var(--color-gold)' }}>
              VELOUR
            </span>
            <h1 className="font-heading" style={{ fontSize: 'clamp(32px, 4vw, 48px)', color: 'var(--color-cream)', fontWeight: 300, marginBottom: '12px' }}>
              {product.name}
            </h1>
            <p className="font-body text-xl mb-6" style={{ color: 'var(--color-gold)', margin: 0, maxWidth: 'none' }}>
              {product.currency}{product.price}
            </p>
            <p className="font-body mb-8" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, fontSize: '15px' }}>
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="font-label" style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'var(--color-text-secondary)' }}>
                  SIZE
                </label>
                <button className="font-label" style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'var(--color-gold)', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                  SIZE GUIDE
                </button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="flex items-center justify-center font-body transition-all"
                    style={{
                      width: '44px',
                      height: '44px',
                      fontSize: '14px',
                      backgroundColor: selectedSize === size ? 'var(--color-cream)' : 'transparent',
                      color: selectedSize === size ? 'var(--color-dark)' : 'var(--color-cream)',
                      border: selectedSize === size ? '1px solid var(--color-cream)' : '1px solid var(--color-border-subtle)',
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div className="mb-8">
              <label className="font-label block mb-3" style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'var(--color-text-secondary)' }}>
                COLOR — {product.colors[selectedColor].name}
              </label>
              <div className="flex gap-4">
                {product.colors.map((color, i) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(i)}
                    className="rounded-full border-2 transition-all"
                    style={{
                      width: '36px',
                      height: '36px',
                      backgroundColor: color.hex,
                      borderColor: selectedColor === i ? 'var(--color-gold)' : 'transparent',
                      transform: selectedColor === i ? 'scale(1.1)' : 'scale(1)',
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Desktop Add to Cart */}
            <div className="hidden md:flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="flex-1 transition-all"
                style={{
                  height: '56px',
                  fontFamily: 'var(--font-label)',
                  fontSize: '12px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  backgroundColor: isAdded ? 'var(--color-gold)' : selectedSize ? 'var(--color-cream)' : 'transparent',
                  color: isAdded ? 'var(--color-dark)' : selectedSize ? 'var(--color-dark)' : 'var(--color-text-muted)',
                  border: isAdded ? '1px solid var(--color-gold)' : selectedSize ? '1px solid var(--color-cream)' : '1px solid var(--color-border-subtle)',
                  cursor: !selectedSize ? 'not-allowed' : 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {isAdded ? '✓ ADDED' : !selectedSize ? 'SELECT SIZE' : 'ADD TO CART'}
              </button>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className="flex items-center justify-center transition-all"
                style={{
                  width: '56px',
                  height: '56px',
                  backgroundColor: 'transparent',
                  border: isSaved ? '1px solid var(--color-gold)' : '1px solid var(--color-border-subtle)',
                  color: isSaved ? 'var(--color-gold)' : 'var(--color-text-secondary)',
                  cursor: 'pointer',
                }}
                aria-label="Save to Wishlist"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            {/* Accordions */}
            <div className="mt-8 md:mt-0">
              {[
                { id: 'details', title: 'DETAILS', content: product.details.join('\n') },
                { id: 'shipping', title: 'SHIPPING & RETURNS', content: 'Free shipping on orders above £200. Returns accepted within 14 days.' },
              ].map((item) => (
                <div key={item.id} style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                  <button
                    onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '20px 0',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <span className="font-label" style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'var(--color-text-secondary)' }}>{item.title}</span>
                    <motion.span animate={{ rotate: openAccordion === item.id ? 45 : 0 }} transition={{ duration: 0.3 }} style={{ color: 'var(--color-text-muted)' }}>
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openAccordion === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p className="font-body pb-5 whitespace-pre-line" style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
                          {item.content}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <div style={{ marginTop: '120px' }}>
          <motion.span
            className="section-label block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            — CURATED FOR YOU —
          </motion.span>
          <h2 className="section-title mb-12">YOU MAY ALSO LIKE</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {related.map((p) => (
              <Link key={p.id} href={`/products/${p.slug}`} className="group">
                <div className="relative aspect-[3/4] overflow-hidden mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
                  <Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-104 transition-transform duration-700 ease-out" style={{ objectPosition: 'center top' }} sizes="(max-width: 768px) 50vw, 25vw" />
                </div>
                <span className="font-label block mb-1" style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(201, 169, 110, 0.6)' }}>
                  {p.category}
                </span>
                <h3 className="font-heading" style={{ fontSize: '18px', color: 'var(--color-cream)', fontWeight: 300, marginBottom: '4px' }}>
                  {p.name}
                </h3>
                <p className="font-body" style={{ fontSize: '14px', color: 'var(--color-gold)', margin: 0 }}>
                  {p.currency}{p.price}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Add to Cart Bar */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-[90] flex items-center gap-3"
        style={{
          padding: '16px 24px',
          backgroundColor: 'rgba(10, 10, 10, 0.95)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid var(--color-border-subtle)',
          paddingBottom: 'env(safe-area-inset-bottom, 16px)', // iOS safe area
        }}
      >
        <button
          onClick={handleAddToCart}
          disabled={!selectedSize}
          className="flex-1 transition-all"
          style={{
            height: '48px',
            fontFamily: 'var(--font-label)',
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            backgroundColor: isAdded ? 'var(--color-gold)' : selectedSize ? 'var(--color-cream)' : 'transparent',
            color: isAdded ? 'var(--color-dark)' : selectedSize ? 'var(--color-dark)' : 'var(--color-text-muted)',
            border: isAdded ? '1px solid var(--color-gold)' : selectedSize ? '1px solid var(--color-cream)' : '1px solid var(--color-border-subtle)',
            cursor: !selectedSize ? 'not-allowed' : 'pointer',
          }}
        >
          {isAdded ? '✓ ADDED' : !selectedSize ? 'SELECT SIZE' : 'ADD TO CART'}
        </button>
      </div>
    </main>
  );
}
