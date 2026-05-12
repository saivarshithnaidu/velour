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
    <section ref={ref} className="py-28 md:py-36 bg-[var(--color-cream)]">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.h2
          className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] text-[var(--color-dark)] font-light leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          JOIN THE SILENCE
        </motion.h2>
        <motion.p
          className="font-body text-base text-[var(--color-dark)]/50 mt-4 mb-12"
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
              className="flex-1 bg-transparent border-b border-[var(--color-dark)]/20 py-3 font-body text-sm text-[var(--color-dark)] placeholder:text-[var(--color-dark)]/30 outline-none focus:border-[var(--color-gold)] transition-colors"
            />
            <button type="submit" className="text-[var(--color-dark)] hover:text-[var(--color-gold)] transition-colors p-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </motion.form>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <motion.div
              className="w-12 h-12 rounded-full border-2 border-[var(--color-gold)] mx-auto flex items-center justify-center mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <p className="font-heading text-2xl text-[var(--color-dark)]">You are in.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
