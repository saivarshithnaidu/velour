import HeroSection from '@/components/home/HeroSection';
import MarqueeTicker from '@/components/home/MarqueeTicker';
import MannequinSection from '@/components/home/MannequinSection';
import CollectionScroll from '@/components/home/CollectionScroll';
import EditorialSplit from '@/components/home/EditorialSplit';
import InstagramGrid from '@/components/home/InstagramGrid';
import NewsletterSection from '@/components/home/NewsletterSection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <MarqueeTicker />
      <MannequinSection />
      <CollectionScroll />
      <EditorialSplit />
      <InstagramGrid />
      <NewsletterSection />
    </main>
  );
}
