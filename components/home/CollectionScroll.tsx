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
    <section ref={sectionRef} className="relative bg-[var(--color-bg)]">
      {/* Heading */}
      <div ref={headingRef} className="px-6 md:px-10 pt-20 pb-12">
        <motion.h2
          className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] text-[var(--color-cream)] text-center font-light"
          initial={{ opacity: 0, y: 60 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          THE 2026 COLLECTION
        </motion.h2>
        <motion.div
          className="w-16 h-[1px] bg-[var(--color-gold)] mx-auto mt-6"
          initial={{ scaleX: 0 }}
          animate={isHeadingInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Horizontal Track */}
      <div
        ref={trackRef}
        className={`flex gap-6 px-6 md:px-10 pb-20 ${
          isMobile ? 'overflow-x-auto no-scrollbar flex-nowrap' : ''
        }`}
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
      className="flex-shrink-0 w-[80vw] md:w-[400px] h-[70vh] md:h-[80vh] relative overflow-hidden group"
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
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent opacity-80" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.span
            className="font-label text-[10px] tracking-[0.3em] text-[var(--color-gold)] block mb-2"
            animate={{ opacity: isHovered ? 1 : 0.6 }}
          >
            {product.category}
          </motion.span>
          <h3 className="font-heading text-2xl text-[var(--color-cream)] font-light mb-1">
            {product.name}
          </h3>
          <p className="font-body text-sm text-[var(--color-gold)]">
            {product.currency}{product.price}
          </p>

          {/* Quick View */}
          <motion.div
            className="mt-4 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-label text-[10px] tracking-[0.3em] text-[var(--color-cream)]/70">
              QUICK VIEW →
            </span>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
