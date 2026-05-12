'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

export default function EditorialSplit() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-200px' });
  const words = ['NOT', 'JUST', 'CLOTHES.'];

  return (
    <section ref={ref} className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-1/2 bg-[var(--color-bg)] flex items-center justify-center px-6 md:px-16 py-20 md:py-0 min-h-[50vh] md:min-h-screen">
        <div className="flex flex-col gap-2 md:gap-4">
          {words.map((word, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h2
                className="font-heading text-[clamp(3rem,8vw,6rem)] text-[var(--color-cream)] font-light leading-none"
                initial={{ y: '110%' }}
                animate={inView ? { y: '0%' } : {}}
                transition={{ duration: 1, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.h2>
            </div>
          ))}
          <motion.div
            style={{ width: '48px', height: '1px', backgroundColor: 'var(--color-gold)', marginTop: '24px', transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>
      <div className="md:w-1/2 bg-[var(--color-cream)] flex flex-col items-center justify-center px-6 md:px-16 py-20 md:py-0 min-h-[50vh] md:min-h-screen">
        <motion.div
          className="relative w-full max-w-sm overflow-hidden"
          style={{ aspectRatio: '3/4', marginBottom: '40px' }}
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={inView ? { clipPath: 'inset(0% 0 0 0)' } : {}}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/images/editorial/editorial-1.jpg"
            alt="Editorial fashion"
            fill
            className="object-cover grayscale"
            style={{ objectPosition: 'center top' }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
        <motion.p
          className="font-body text-base text-center md:text-left"
          style={{
            color: 'rgba(10, 10, 10, 0.7)',
            maxWidth: '65ch',
            lineHeight: 1.8,
            letterSpacing: '0.01em',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Every piece is designed for the person who moves through the world with intention. Minimal. Considered. Yours.
        </motion.p>
        <motion.a
          href="/collections"
          className="font-label inline-flex items-center gap-2 hover:text-[var(--color-gold)] transition-colors group"
          style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'var(--color-dark)', marginTop: '32px' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          EXPLORE THE STORY
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </motion.a>
      </div>
    </section>
  );
}
