import { Metadata } from 'next';
import { DemoHeroSection } from '@/components/demo/DemoHeroSection';
import { DemoValueProposition } from '@/components/demo/DemoValueProposition';
import { DemoRequestForm } from '@/components/demo/DemoRequestForm';

export const metadata: Metadata = {
  title: 'Demander une Démo GAMR - Démonstration Personnalisée',
  description:
    'Planifiez votre démonstration personnalisée de GAMR. Découvrez comment notre plateforme peut transformer votre gestion des risques. Démo gratuite, sans engagement, adaptée à votre secteur.',
  openGraph: {
    title: 'Demander une Démo GAMR - Démonstration Personnalisée',
    description:
      'Planifiez votre démonstration personnalisée de GAMR. Découvrez comment notre plateforme peut transformer votre gestion des risques.',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function DemanderDemoPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <DemoHeroSection />
      <DemoValueProposition />
      <DemoRequestForm />
    </main>
  );
}
