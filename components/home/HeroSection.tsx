'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', isMobile ? '10%' : '30%']);
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
          className="w-full h-[120%]"
          style={{
            backgroundImage: `url('/images/hero/hero-main.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(10, 10, 10, 0.5)' }} />
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
              className="font-heading"
              style={{
                fontSize: 'clamp(56px, 8vw, 120px)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                lineHeight: 0.95,
                color: 'var(--color-cream)',
                textShadow: '0 0 80px rgba(201, 169, 110, 0.3)',
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          className="font-label"
          style={{
            fontSize: 'clamp(10px, 1.2vw, 14px)',
            letterSpacing: '0.4em',
            color: 'var(--color-gold)',
            marginTop: '24px',
            maxWidth: 'none',
          }}
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
          <span className="font-label" style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'var(--color-text-muted)' }}>
            SCROLL
          </span>
          <motion.div
            style={{ width: '1px', height: '32px', backgroundColor: 'rgba(201, 169, 110, 0.4)' }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="origin-top"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
