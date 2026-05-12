'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const letterVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.06,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <div
          className="w-full h-[120%] bg-cover bg-top"
          style={{
            backgroundImage: `url('/images/hero/hero-main.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-[var(--color-bg)]/50" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full px-6"
        style={{ y: textY, opacity }}
      >
        {/* VELOUR Logo Text */}
        <div className="flex overflow-hidden">
          {'VELOUR'.split('').map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="font-heading text-[clamp(3rem,12vw,10rem)] font-light tracking-[0.15em] text-[var(--color-cream)]"
              style={{
                textShadow: '0 0 80px rgba(201, 169, 110, 0.3)',
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          className="font-label text-xs md:text-sm tracking-[0.4em] text-[var(--color-gold)] mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          WEAR THE SILENCE
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <span className="font-label text-[9px] tracking-[0.3em] text-[var(--color-cream)]/40">
            SCROLL
          </span>
          <motion.div
            className="w-[1px] h-8 bg-[var(--color-gold)]/40"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
