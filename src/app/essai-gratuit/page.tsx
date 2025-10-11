import { Metadata } from 'next';
import { DemoHeroSection } from '@/components/demo/DemoHeroSection';
import { DemoValueProposition } from '@/components/demo/DemoValueProposition';
import { DemoRequestForm } from '@/components/demo/DemoRequestForm';

export const metadata: Metadata = {
  title: 'Essai Gratuit GAMR - Démarrez en 2 Minutes',
  description:
    'Configurez votre essai gratuit GAMR en 10 questions. Sans CB, résiliable, support inclus. Gestion des risques et conformité.',
  robots: 'index, follow',
  openGraph: {
    title: 'Essai Gratuit GAMR - Démarrez en 2 Minutes',
    description:
      'Configurez votre essai gratuit GAMR en 10 questions. Sans CB, résiliable, support inclus. Gestion des risques et conformité.',
    url: 'https://gamr.com/essai-gratuit',
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
