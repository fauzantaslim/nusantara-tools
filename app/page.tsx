import { HeroSection } from '@/components/home/HeroSection';
import { CategorySection } from '@/components/home/CategorySection';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <CategorySection />
    </div>
  );
}
