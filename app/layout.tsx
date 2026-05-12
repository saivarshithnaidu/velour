import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost, Barlow_Condensed } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/store';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import CustomCursor from '@/components/layout/CustomCursor';
import LoadingScreen from '@/components/layout/LoadingScreen';
import PortfolioBadge from '@/components/layout/PortfolioBadge';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
});

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-barlow',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VELOUR — Wear the Silence | Luxury Fashion',
  description:
    'VELOUR is a luxury fashion brand offering minimal, considered clothing handcrafted in Italy. Explore the 2026 collection of dresses, outerwear, tops, and bottoms.',
  keywords: ['luxury fashion', 'minimal clothing', 'Italian fashion', 'designer wear', 'VELOUR'],
  openGraph: {
    title: 'VELOUR — Wear the Silence',
    description: 'Minimal luxury. Dark. Editorial. Handcrafted in Italy.',
    url: 'https://fashion.growxlabs.tech',
    siteName: 'VELOUR',
    type: 'website',
  },
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} ${barlow.variable}`}>
      <body className="cursor-none">
        <CartProvider>
          <SmoothScrollProvider>
            <LoadingScreen />
            <CustomCursor />
            <Navbar />
            <CartDrawer />
            {children}
            <Footer />
            <PortfolioBadge />
          </SmoothScrollProvider>
        </CartProvider>
      </body>
    </html>
  );
}
