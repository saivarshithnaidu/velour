'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/store';
import { useEffect, useState } from 'react';

export default function CartDrawer() {
  const { isOpen, closeCart, items, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[110]"
            style={{ backgroundColor: 'rgba(10, 10, 10, 0.6)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-[120] flex flex-col w-full md:max-w-md"
            style={{
              backgroundColor: 'var(--color-bg)',
              borderLeft: '1px solid var(--color-border-subtle)',
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 md:px-8"
              style={{
                height: '72px',
                borderBottom: '1px solid var(--color-border-subtle)',
              }}
            >
              <h2 className="font-heading text-2xl" style={{ color: 'var(--color-cream)', fontWeight: 300 }}>
                BAG <span style={{ color: 'var(--color-gold)', fontSize: '18px' }}>({totalItems})</span>
              </h2>
              <button
                onClick={closeCart}
                className="flex items-center justify-center transition-transform hover:rotate-90"
                style={{
                  width: '44px',
                  height: '44px',
                  color: 'var(--color-text-secondary)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
                aria-label="Close cart"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6 flex flex-col gap-8 custom-scrollbar">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="font-body text-lg mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                    Your bag is empty.
                  </p>
                  <button
                    onClick={closeCart}
                    className="font-label transition-colors"
                    style={{
                      fontSize: '11px',
                      letterSpacing: '0.15em',
                      color: 'var(--color-gold)',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid var(--color-gold)',
                      paddingBottom: '4px',
                      cursor: 'pointer',
                      minHeight: '44px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
                    {/* Image */}
                    <div className="relative w-24 aspect-[3/4] flex-shrink-0 bg-white/5">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        style={{ objectPosition: 'center top' }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <Link
                            href={`/products/${item.slug}`}
                            onClick={closeCart}
                            className="font-heading text-lg leading-tight transition-colors hover:text-[var(--color-gold)]"
                            style={{ color: 'var(--color-cream)', fontWeight: 300 }}
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id, item.size, item.color)}
                            className="text-xs transition-colors hover:text-[var(--color-error)] flex items-center justify-center"
                            style={{
                              color: 'var(--color-text-muted)',
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              width: '44px',
                              height: '44px',
                              marginRight: '-12px',
                              marginTop: '-12px',
                            }}
                            aria-label="Remove item"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            </svg>
                          </button>
                        </div>
                        <p className="font-body text-sm mt-1 mb-2" style={{ color: 'var(--color-gold)' }}>
                          {item.currency}{item.price}
                        </p>
                        <p className="font-label mb-1" style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'var(--color-text-secondary)' }}>
                          SIZE: {item.size}
                        </p>
                        <p className="font-label" style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'var(--color-text-secondary)' }}>
                          COLOR: {item.color.toUpperCase()}
                        </p>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center gap-4 mt-4">
                        <div
                          className="flex items-center"
                          style={{
                            border: '1px solid var(--color-border-subtle)',
                            height: '44px',
                          }}
                        >
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                            className="flex items-center justify-center transition-colors hover:text-[var(--color-cream)]"
                            style={{
                              width: '44px',
                              height: '100%',
                              color: 'var(--color-text-secondary)',
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                            }}
                          >
                            -
                          </button>
                          <span
                            className="font-body flex items-center justify-center"
                            style={{
                              width: '24px',
                              fontSize: '14px',
                              color: 'var(--color-cream)',
                            }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                            className="flex items-center justify-center transition-colors hover:text-[var(--color-cream)]"
                            style={{
                              width: '44px',
                              height: '100%',
                              color: 'var(--color-text-secondary)',
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                style={{
                  borderTop: '1px solid var(--color-border-subtle)',
                  padding: '24px 32px 32px',
                  backgroundColor: 'var(--color-bg)',
                }}
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="font-label" style={{ fontSize: '11px', letterSpacing: '0.15em', color: 'var(--color-text-secondary)' }}>
                    SUBTOTAL
                  </span>
                  <span className="font-body text-xl" style={{ color: 'var(--color-cream)' }}>
                    £{subtotal.toFixed(2)}
                  </span>
                </div>
                <p className="font-body text-xs mb-6 text-center" style={{ color: 'var(--color-text-muted)' }}>
                  Shipping & taxes calculated at checkout.
                </p>
                <button
                  className="w-full transition-all flex items-center justify-center"
                  style={{
                    height: '56px',
                    backgroundColor: 'var(--color-cream)',
                    color: 'var(--color-dark)',
                    fontFamily: 'var(--font-label)',
                    fontSize: '12px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-gold)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-cream)';
                  }}
                >
                  CHECKOUT
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
