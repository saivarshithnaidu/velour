'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/products';

export default function CollectionScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: '-100px' });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let scrollTriggerInstance: typeof import('gsap/ScrollTrigger') | null = null;

    const initGSAP = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      scrollTriggerInstance = { ScrollTrigger } as unknown as typeof import('gsap/ScrollTrigger');

      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 100),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          end: () => '+=' + track.scrollWidth,
          invalidateOnRefresh: true,
        },
      });
    };

    initGSAP();

    return () => {
      if (scrollTriggerInstance) {
        (scrollTriggerInstance as unknown as { ScrollTrigger: { getAll: () => { kill: () => void }[] } }).ScrollTrigger.getAll().forEach((t: { kill: () => void }) => t.kill());
      }
    };
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="relative bg-[var(--color-bg)] section-padding">
      {/* Heading */}
      <div ref={headingRef} className="px-6 md:px-10 pb-12">
        <motion.span
          className="section-label block"
          initial={{ opacity: 0, y: 10 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          — COLLECTION —
        </motion.span>
        <motion.h2
          className="section-title font-heading"
          initial={{ opacity: 0, y: 60 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          THE 2026 COLLECTION
        </motion.h2>
        <motion.div
          style={{ width: '60px', height: '1px', backgroundColor: 'var(--color-gold)', margin: '24px auto 0' }}
          initial={{ scaleX: 0 }}
          animate={isHeadingInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Horizontal Track */}
      <div
        ref={trackRef}
        className={`flex gap-6 px-6 md:px-10 ${
          isMobile ? 'overflow-x-auto no-scrollbar flex-nowrap' : ''
        }`}
        style={{ paddingBottom: isMobile ? '40px' : '0' }}
      >
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={cardRef}
      className="flex-shrink-0 w-[80vw] md:w-[400px] relative overflow-hidden group"
      style={{ aspectRatio: '3/4' }}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.slug}`} className="block w-full h-full">
        {/* Image */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isHovered ? 1.04 : 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            style={{ objectPosition: 'center top' }}
            sizes="(max-width: 768px) 80vw, 400px"
            loading={index < 2 ? 'eager' : 'lazy'}
          />
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent opacity-80" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.span
            className="font-label block mb-2"
            style={{ fontSize: '10px', letterSpacing: '0.3em', color: 'var(--color-gold)' }}
            animate={{ opacity: isHovered ? 1 : 0.6 }}
          >
            {product.category}
          </motion.span>
          <h3 className="font-heading text-[18px] text-[var(--color-cream)] font-light mb-1">
            {product.name}
          </h3>
          <p className="font-body text-sm" style={{ color: 'var(--color-gold)', margin: 0, maxWidth: 'none' }}>
            {product.currency}{product.price}
          </p>

          {/* Quick View */}
          <motion.div
            className="mt-4 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-label" style={{ fontSize: '10px', letterSpacing: '0.3em', color: 'rgba(245,240,232,0.7)' }}>
              QUICK VIEW →
            </span>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
