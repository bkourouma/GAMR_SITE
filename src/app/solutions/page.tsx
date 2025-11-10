import { Metadata } from 'next';
import { HeroSection } from '@/components/solutions/HeroSection';
import { IntroSection } from '@/components/solutions/IntroSection';
import { SectorsGrid } from '@/components/solutions/SectorsGrid';
import { ComparisonTable } from '@/components/solutions/ComparisonTable';
import { ConversionCTA } from '@/components/solutions/ConversionCTA';
import { industries } from '@/lib/solutions-data';

/**
 * SEO Metadata for Solutions page
 */
export const metadata: Metadata = {
  title: 'Solutions GAMRdigitale par Secteur - Conformité & Gestion des Risques',
  description:
    "Découvrez comment GAMRdigitale s'adapte aux normes de votre secteur : industrie, aéroport, banque, santé, gouvernement. Conformité automatisée et reporting simplifié.",
  openGraph: {
    title: 'Solutions GAMRdigitale par Secteur',
    description: "GAMRdigitale s'adapte aux normes de votre secteur",
    url: '/solutions',
    images: [{ url: '/images/og/solutions.jpg' }],
  },
};

/**
 * Solutions Page - Demonstrates how GAMRdigitale adapts to 5 key industry sectors
 * with their specific regulatory frameworks
 */
export default function SolutionsPage() {
  return (
    <main>
      <HeroSection
        title="Des solutions adaptées à chaque secteur"
        subtitle="GAMRdigitale s'aligne sur vos normes industrielles et réglementaires pour renforcer votre gouvernance et votre performance."
        primaryCTA={{
          label: 'Découvrir les fonctionnalités',
          href: '/fonctionnalites',
          variant: 'primary',
        }}
        secondaryCTA={{
          label: 'Demander une démo',
          href: '/demo',
          variant: 'secondary',
        }}
      />

      <IntroSection content="Chaque secteur fait face à des risques spécifiques, encadrés par des normes strictes. GAMRdigitale s'adapte à vos cadres réglementaires pour simplifier la conformité et accélérer la prise de décision." />

      <SectorsGrid industries={industries} />

      <ComparisonTable industries={industries} />

      <ConversionCTA
        headline="Découvrez comment GAMRdigitale s'intègre à vos processus et à vos normes sectorielles."
        ctas={[
          { label: 'Demander une démo', href: '/demo', variant: 'primary' },
          { label: 'Essayer gratuitement', href: '/signup', variant: 'secondary' },
        ]}
      />
    </main>
  );
}
