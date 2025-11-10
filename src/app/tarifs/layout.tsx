/**
 * Tarifs Layout - SEO Metadata
 * Feature: 005-g-n-re - Page Tarifs
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  // Basic SEO
  title: 'Tarifs GAMRdigitale - Abonnement Cloud et Licence On-Premise',
  description:
    'Découvrez les tarifs GAMRdigitale : plans Cloud dès 100.000 FCFA/mois (Starter, Pro, Business) avec essai gratuit 30 jours, ou licence On-Premise perpétuelle. Transparence totale, sans engagement.',

  // Keywords (for reference)
  keywords: [
    'tarifs GAMRdigitale',
    'prix cloud',
    'licence on-premise',
    'analyse des risques',
    'conformité',
    'abonnement FCFA',
    'essai gratuit',
    'gestion des menaces',
  ],

  // OpenGraph
  openGraph: {
    title: 'Tarifs GAMRdigitale - Abonnement Cloud et Licence On-Premise',
    description:
      'Plans Cloud dès 100.000 FCFA/mois avec essai gratuit 30 jours. Licence On-Premise disponible. Choisissez le modèle adapté à votre gouvernance.',
    url: 'https://engage-360.net/tarifs', // TODO: Update to actual GAMRdigitale domain when available
    siteName: 'GAMRdigitale',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://engage-360.net/images/tarifs/og-image.png', // TODO: Update to actual GAMRdigitale domain
        width: 1200,
        height: 630,
        alt: 'Grille tarifaire GAMRdigitale - Cloud et On-Premise',
        type: 'image/png',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Tarifs GAMRdigitale - Abonnement Cloud et Licence On-Premise',
    description:
      'Plans Cloud dès 100.000 FCFA/mois avec essai gratuit 30 jours. Licence On-Premise disponible.',
    images: ['https://engage-360.net/images/tarifs/og-image.png'], // TODO: Update to actual GAMRdigitale domain
  },

  // Canonical URL
  alternates: {
    canonical: 'https://engage-360.net/tarifs', // TODO: Update to actual GAMRdigitale domain
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Other metadata
  category: 'Business Software',
};

export default function TarifsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
