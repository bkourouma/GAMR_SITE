/**
 * About Page - Page À Propos
 * Feature: 006-redige-la-page
 */

import type { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { CompanyStory } from '@/components/about/CompanyStory';
import { TeamSection } from '@/components/about/TeamSection';
import { ValuesSection } from '@/components/about/ValuesSection';
import { AchievementsSection } from '@/components/about/AchievementsSection';
import { AboutCTA } from '@/components/about/AboutCTA';

export const metadata: Metadata = {
  title: 'À Propos de GAMRdigitale - Notre Mission et Notre Équipe',
  description:
    'Découvrez l&apos;équipe passionnée derrière GAMRdigitale, notre mission de simplifier la gestion des associations sportives, et nos valeurs d&apos;innovation et d&apos;excellence.',
  openGraph: {
    title: 'À Propos de GAMRdigitale - Notre Mission et Notre Équipe',
    description:
      'Rencontrez l&apos;équipe GAMRdigitale et découvrez notre mission d&apos;innovation dans la gestion des associations sportives.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'GAMRdigitale',
  },
  alternates: { canonical: '/a-propos' },
  robots: { index: true, follow: true },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <CompanyStory />
      <TeamSection />
      <ValuesSection />
      <AchievementsSection />
      <AboutCTA />
    </>
  );
}
