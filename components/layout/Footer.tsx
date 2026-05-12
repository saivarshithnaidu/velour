import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-bg)] border-t border-[var(--color-cream)]/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/">
              <span className="font-heading text-3xl tracking-[0.15em] text-[var(--color-cream)] font-light">
                VELOUR
              </span>
            </Link>
            <p className="font-body text-sm text-[var(--color-cream)]/70 mt-4 leading-relaxed">
              Wear the Silence.
              <br />
              Minimal luxury, handcrafted in Italy.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-label text-xs text-[var(--color-gold)] mb-6">SHOP</h4>
            <div className="flex flex-col gap-4">
              <FooterLink href="/collections?category=TOPS">Tops</FooterLink>
              <FooterLink href="/collections?category=DRESSES">Dresses</FooterLink>
              <FooterLink href="/collections?category=OUTERWEAR">Outerwear</FooterLink>
              <FooterLink href="/collections?category=BOTTOMS">Bottoms</FooterLink>
              <FooterLink href="/collections">View All</FooterLink>
            </div>
          </div>

          {/* Brand */}
          <div>
            <h4 className="font-label text-xs text-[var(--color-gold)] mb-6">BRAND</h4>
            <div className="flex flex-col gap-4">
              <FooterLink href="#">Our Story</FooterLink>
              <FooterLink href="#">Sustainability</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Press</FooterLink>
            </div>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-label text-xs text-[var(--color-gold)] mb-6">HELP</h4>
            <div className="flex flex-col gap-4">
              <FooterLink href="#">Shipping</FooterLink>
              <FooterLink href="#">Returns</FooterLink>
              <FooterLink href="#">Contact</FooterLink>
              <FooterLink href="#">FAQ</FooterLink>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[var(--color-cream)]/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-[var(--color-cream)]/60">
            © 2026 VELOUR. All rights reserved.
          </p>
          <p className="font-body text-xs text-[var(--color-cream)]/60">
            Built by{' '}
            <a
              href="https://growxlabs.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-gold)]/60 hover:text-[var(--color-gold)] transition-colors"
            >
              GrowXLabsTech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="font-body text-sm text-[var(--color-cream)]/80 hover:text-[var(--color-gold)] transition-colors duration-300"
    >
      {children}
    </Link>
  );
}
