import { SecurityIndexPage } from '@/components/indice-securite/SecurityIndexPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Indice de Sécurité - GAMR | Méthodologie d\'Évaluation',
  description: 'Découvrez la méthodologie GAMR pour évaluer l\'indice de sécurité de votre entreprise. Analyse des menaces et risques avec indicateurs visuels.',
  keywords: 'indice sécurité, GAMR, évaluation risques, gestion menaces',
};

export default function IndiceSecuritePage() {
  return <SecurityIndexPage />;
}
