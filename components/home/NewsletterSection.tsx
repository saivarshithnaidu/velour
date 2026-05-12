'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function NewsletterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section ref={ref} className="section-padding bg-[var(--color-cream)]">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.span
          className="section-label block"
          style={{ color: 'var(--color-gold)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          — NEWSLETTER —
        </motion.span>
        <motion.h2
          className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-tight"
          style={{ color: 'var(--color-dark)' }}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          JOIN THE SILENCE
        </motion.h2>
        <motion.p
          className="font-body text-base mt-4 mb-12"
          style={{ color: 'rgba(10, 10, 10, 0.5)', maxWidth: 'none', margin: '16px auto 48px' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          New arrivals. Exclusive access. Nothing more.
        </motion.p>

        {!submitted ? (
          <motion.form
            onSubmit={handleSubmit}
            className="flex items-center gap-4 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="flex-1 font-body"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: '1px solid rgba(10, 10, 10, 0.2)',
                padding: '12px 0',
                fontSize: '16px',
                fontWeight: 300,
                color: 'var(--color-dark)',
                outline: 'none',
                borderRadius: 0,
                WebkitAppearance: 'none',
                transition: 'border-color 0.3s ease',
              }}
              onFocus={(e) => (e.currentTarget.style.borderBottomColor = 'var(--color-gold)')}
              onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(10, 10, 10, 0.2)')}
            />
            <button
              type="submit"
              className="flex items-center justify-center hover:text-[var(--color-gold)] transition-colors"
              style={{
                color: 'var(--color-dark)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                minWidth: '44px',
                minHeight: '44px',
              }}
              aria-label="Subscribe"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </motion.form>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <motion.div
              className="w-12 h-12 rounded-full border-2 mx-auto flex items-center justify-center mb-4"
              style={{ borderColor: 'var(--color-gold)' }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <p className="font-heading text-2xl" style={{ color: 'var(--color-dark)', maxWidth: 'none', margin: 0 }}>
              You are in.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
