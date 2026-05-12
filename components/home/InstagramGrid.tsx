'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const images = Array.from({ length: 9 }, (_, i) => `/images/instagram/insta-${i + 1}.jpg`);

export default function InstagramGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding bg-[var(--color-bg)]" ref={ref}>
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="section-label block">— AS SEEN ON —</span>
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
        <p className="font-heading text-xl mb-2" style={{ color: 'var(--color-gold)', maxWidth: 'none', margin: '0 auto 8px' }}>
          @velour.official
        </p>
        <p className="font-label" style={{ fontSize: '10px', letterSpacing: '0.3em', color: 'var(--color-text-muted)', maxWidth: 'none', margin: 0 }}>
          FOLLOW FOR DAILY INSPIRATION
        </p>
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
      <motion.div className="absolute inset-0" animate={{ scale: hovered ? 1.04 : 1 }} transition={{ duration: 0.7 }}>
        <Image
          src={src}
          alt={`Instagram ${index + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 33vw"
          loading="lazy"
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ backgroundColor: 'rgba(201, 169, 110, 0.4)' }}
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
