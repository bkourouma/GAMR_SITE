import { HeroSection } from '@/components/home/HeroSection';
import { ProblemSolution } from '@/components/home/ProblemSolution';
import { FeaturesGrid } from '@/components/home/FeaturesGrid';
import { SocialProof } from '@/components/home/SocialProof';
import { DemoVideo } from '@/components/home/DemoVideo';
import { PartnersSection } from '@/components/shared/PartnersSection';
import { FinalCTA } from '@/components/home/FinalCTA';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSolution />
      <FeaturesGrid />
      <SocialProof />
      <DemoVideo />
      <PartnersSection />
      <FinalCTA />
    </>
  );
}
