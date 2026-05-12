'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check if it's a touch device (mobile/tablet)
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    // Disable smooth scroll for accessibility or performance on mobile
    if (prefersReducedMotion || isTouchDevice) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
