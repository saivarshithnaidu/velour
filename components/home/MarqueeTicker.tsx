'use client';

export default function MarqueeTicker() {
  const content = 'NEW COLLECTION 2026  ·  FREE SHIPPING ABOVE £200  ·  VELOUR — WEAR THE SILENCE  ·  HANDCRAFTED IN ITALY  ·  ';

  return (
    <section className="py-6 border-y border-[var(--color-gold)]/10 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Duplicate content for seamless loop */}
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="font-label text-sm md:text-base tracking-[0.3em] text-[var(--color-gold)] mx-4"
          >
            {content}
          </span>
        ))}
      </div>
    </section>
  );
}
