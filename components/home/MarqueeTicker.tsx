'use client';

export default function MarqueeTicker() {
  const content = 'NEW COLLECTION 2026  ·  FREE SHIPPING ABOVE £200  ·  VELOUR — WEAR THE SILENCE  ·  HANDCRAFTED IN ITALY  ·  ';

  return (
    <section
      className="overflow-hidden"
      style={{
        padding: '20px 0',
        borderTop: '1px solid var(--color-border-accent)',
        borderBottom: '1px solid var(--color-border-accent)',
      }}
    >
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Duplicate content for seamless loop */}
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="font-label mx-4"
            style={{
              fontSize: 'clamp(11px, 1.2vw, 14px)',
              letterSpacing: '0.3em',
              color: 'var(--color-gold)',
            }}
          >
            {content}
          </span>
        ))}
      </div>
    </section>
  );
}
