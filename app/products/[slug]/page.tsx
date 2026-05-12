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
          <Link href="/collections" className="font-label text-xs text-[var(--color-gold)] mt-4 inline-block">
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
    <main className="min-h-screen bg-[var(--color-bg)] pt-24 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Breadcrumb */}
        <motion.div
          className="mb-8 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/collections" className="font-body text-xs text-[var(--color-cream)]/40 hover:text-[var(--color-cream)] transition-colors">
            Collection
          </Link>
          <span className="text-[var(--color-cream)]/20 text-xs">/</span>
          <span className="font-body text-xs text-[var(--color-cream)]/60">{product.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
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
                  <Image src={product.images[selectedImage]} alt={product.name} fill className="object-cover" priority />
                </motion.div>
              </AnimatePresence>
            </motion.div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-24 overflow-hidden border transition-all ${
                    selectedImage === i ? 'border-[var(--color-gold)]' : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
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
            <span className="font-label text-[10px] tracking-[0.4em] text-[var(--color-gold)] block mb-3">VELOUR</span>
            <h1 className="font-heading text-4xl md:text-5xl text-[var(--color-cream)] font-light mb-3">{product.name}</h1>
            <p className="font-body text-xl text-[var(--color-gold)] mb-6">{product.currency}{product.price}</p>
            <p className="font-body text-sm text-[var(--color-cream)]/60 leading-relaxed mb-8">{product.description}</p>

            {/* Size Selector */}
            <div className="mb-6">
              <label className="font-label text-[10px] tracking-[0.2em] text-[var(--color-cream)]/60 block mb-3">SIZE</label>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center font-body text-sm border transition-all ${
                      selectedSize === size
                        ? 'bg-[var(--color-cream)] text-[var(--color-dark)] border-[var(--color-cream)]'
                        : 'border-[var(--color-cream)]/20 text-[var(--color-cream)] hover:border-[var(--color-gold)]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div className="mb-8">
              <label className="font-label text-[10px] tracking-[0.2em] text-[var(--color-cream)]/60 block mb-3">
                COLOR — {product.colors[selectedColor].name}
              </label>
              <div className="flex gap-3">
                {product.colors.map((color, i) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(i)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === i ? 'border-[var(--color-gold)] scale-110' : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`flex-1 py-4 font-label text-xs tracking-widest transition-all btn-fill ${
                  isAdded
                    ? 'bg-[var(--color-gold)] text-[var(--color-dark)] border border-[var(--color-gold)]'
                    : selectedSize
                    ? 'bg-[var(--color-dark)] text-[var(--color-cream)] border border-[var(--color-cream)]/20 hover:text-[var(--color-dark)]'
                    : 'bg-[var(--color-dark)] text-[var(--color-cream)]/30 border border-[var(--color-cream)]/10 cursor-not-allowed'
                }`}
              >
                {isAdded ? '✓ ADDED' : !selectedSize ? 'SELECT SIZE' : 'ADD TO CART'}
              </button>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`w-14 h-14 flex items-center justify-center border transition-all ${
                  isSaved ? 'border-[var(--color-gold)] text-[var(--color-gold)]' : 'border-[var(--color-cream)]/20 text-[var(--color-cream)]/40 hover:text-[var(--color-cream)]'
                }`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            {/* Accordions */}
            {[
              { id: 'details', title: 'DETAILS', content: product.details.join('\n') },
              { id: 'size-guide', title: 'SIZE GUIDE', content: 'Please refer to our sizing chart. We recommend ordering your usual size.' },
              { id: 'shipping', title: 'SHIPPING & RETURNS', content: 'Free shipping on orders above £200. Returns accepted within 14 days.' },
            ].map((item) => (
              <div key={item.id} className="border-t border-[var(--color-cream)]/10">
                <button
                  onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between py-5"
                >
                  <span className="font-label text-xs tracking-[0.2em] text-[var(--color-cream)]/70">{item.title}</span>
                  <motion.span animate={{ rotate: openAccordion === item.id ? 45 : 0 }} transition={{ duration: 0.3 }} className="text-[var(--color-cream)]/40">
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
                      className="overflow-hidden"
                    >
                      <p className="font-body text-sm text-[var(--color-cream)]/50 pb-5 leading-relaxed whitespace-pre-line">
                        {item.content}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Related Products */}
        <div className="mt-24">
          <h2 className="font-heading text-3xl text-[var(--color-cream)] font-light text-center mb-12">YOU MAY ALSO LIKE</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => (
              <Link key={p.id} href={`/products/${p.slug}`} className="group">
                <div className="relative aspect-[3/4] overflow-hidden mb-3">
                  <Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="font-body text-sm text-[var(--color-cream)] group-hover:text-[var(--color-gold)] transition-colors">{p.name}</h3>
                <p className="font-body text-sm text-[var(--color-gold)]">{p.currency}{p.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
