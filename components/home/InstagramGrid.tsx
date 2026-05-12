'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const images = Array.from({ length: 9 }, (_, i) => `/images/instagram/insta-${i + 1}.jpg`);

export default function InstagramGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 md:py-28 bg-[var(--color-bg)]" ref={ref}>
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="font-label text-xs tracking-[0.4em] text-[var(--color-gold)]">AS SEEN ON</span>
      </motion.div>
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
        {images.map((src, i) => (
          <GridImage key={i} src={src} index={i} inView={inView} />
        ))}
      </div>
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <p className="font-heading text-xl text-[var(--color-gold)] mb-2">@velour.official</p>
        <p className="font-label text-[10px] tracking-[0.3em] text-[var(--color-cream)]/40">FOLLOW FOR DAILY INSPIRATION</p>
      </motion.div>
    </section>
  );
}

function GridImage({ src, index, inView }: { src: string; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className="aspect-square relative overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div className="absolute inset-0" animate={{ scale: hovered ? 1.08 : 1 }} transition={{ duration: 0.5 }}>
        <Image src={src} alt={`Instagram ${index + 1}`} fill className="object-cover" />
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-[var(--color-gold)]/40 flex items-center justify-center"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="17.5" cy="6.5" r="1.5" fill="white" stroke="none" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
