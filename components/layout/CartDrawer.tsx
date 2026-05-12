'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useCart } from '@/lib/store';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, subtotal } = useCart();

  const shippingFree = subtotal >= 200;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-[200]"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md z-[201] flex flex-col"
            style={{ backgroundColor: 'var(--color-cream)' }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-dark)]/10">
              <h2 className="font-label text-sm text-[var(--color-dark)]">
                YOUR CART ({items.length})
              </h2>
              <button
                onClick={closeCart}
                className="text-[var(--color-dark)] hover:text-[var(--color-gold)] transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <h3 className="font-heading text-3xl text-[var(--color-dark)]">YOUR CART IS QUIET</h3>
                  <p className="font-body text-sm text-[var(--color-dark)]/60">Let us fix that.</p>
                  <button
                    onClick={closeCart}
                    className="mt-4 px-8 py-3 bg-[var(--color-dark)] text-[var(--color-cream)] font-label text-xs btn-fill"
                  >
                    SHOP NOW
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {items.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.size}-${item.color}`}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex gap-4"
                    >
                      {/* Image */}
                      <div className="w-20 h-20 bg-[var(--color-dark)]/5 flex-shrink-0 relative overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-body text-sm font-medium text-[var(--color-dark)]">
                            {item.name}
                          </h4>
                          <p className="font-body text-xs text-[var(--color-dark)]/60 mt-0.5">
                            {item.size} · {item.color}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center border border-[var(--color-dark)]/20 text-[var(--color-dark)] hover:border-[var(--color-gold)] transition-colors text-sm"
                            >
                              −
                            </button>
                            <span className="font-body text-sm text-[var(--color-dark)] w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center border border-[var(--color-dark)]/20 text-[var(--color-dark)] hover:border-[var(--color-gold)] transition-colors text-sm"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-body text-sm text-[var(--color-dark)] font-medium">
                            {item.currency}{item.price * item.quantity}
                          </span>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                        className="self-start text-[var(--color-dark)]/40 hover:text-[var(--color-dark)] transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-[var(--color-dark)]/10">
                <div className="flex justify-between mb-2">
                  <span className="font-body text-sm text-[var(--color-dark)]/60">Subtotal</span>
                  <span className="font-body text-sm text-[var(--color-dark)]">£{subtotal}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="font-body text-sm text-[var(--color-dark)]/60">Shipping</span>
                  <span className="font-body text-sm text-[var(--color-dark)]">
                    {shippingFree ? 'Complimentary' : '£15'}
                  </span>
                </div>
                <div className="flex justify-between mb-6 pt-4 border-t border-[var(--color-dark)]/10">
                  <span className="font-label text-sm text-[var(--color-dark)]">TOTAL</span>
                  <span className="font-body text-lg font-medium text-[var(--color-dark)]">
                    £{shippingFree ? subtotal : subtotal + 15}
                  </span>
                </div>

                <button className="w-full py-4 bg-[var(--color-dark)] text-[var(--color-cream)] font-label text-xs tracking-widest btn-fill hover:text-[var(--color-dark)] transition-colors">
                  CHECKOUT
                </button>
                <button
                  onClick={closeCart}
                  className="w-full py-3 text-center font-body text-sm text-[var(--color-dark)]/60 hover:text-[var(--color-dark)] transition-colors mt-2"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
