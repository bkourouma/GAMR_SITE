/**
 * About Page Static Data
 * Content for the About page (À Propos)
 */

import type { CompanyInfo, TeamMember, CompanyValue, AboutStat } from '@/types/about';

export const COMPANY_INFO: CompanyInfo = {
  name: 'GAMRdigitale',
  mission:
    'Révolutionner la gestion des risques grâce à une expertise avérée en ingénierie de sécurité et à la maîtrise de l&apos;intelligence artificielle en analyse de données avancée',
  story:
    'Développée en 2020, GAMRdigitale est née de la conviction que la gestion des risques devait être simplifiée, automatisée et accessible à tous. Notre équipe d&apos;experts en ingénierie de sécurité et en intelligence artificielle a développé une plate-forme innovante qui transforme la façon dont les organisations identifient, évaluent et gèrent leurs risques.',
  milestones: [
    {
      year: '2020',
      achievement: 'Développement de la GAMR digitale et lancement de la 1ere version',
    },
    { year: '2021', achievement: "Intégration de l'IA pour l'apport de l'analyse prédictive" },
    { year: '2022', achievement: "1ers clients en Côte d'Ivoire" },
    { year: '2023', achievement: "Expansion en Afrique de l'Ouest" },
    { year: '2024', achievement: 'Lancements certificats ISO 27001 et partenariats stratégiques' },
  ],
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Dr. Kouassi Yao',
    role: 'CEO & Co-fondateur',
    bio: '15 ans d&apos;expérience en cybersécurité et gestion des risques',
    photo:
      'https://ui-avatars.com/api/?name=Kouassi+Yao&size=400&background=4F46E5&color=fff&font-size=0.4&bold=true',
  },
  {
    id: 'tm-2',
    name: 'Marie Traoré',
    role: 'CTO & Co-fondatrice',
    bio: 'Experte en IA et architecte logiciel',
    photo:
      'https://ui-avatars.com/api/?name=Marie+Traore&size=400&background=EC4899&color=fff&font-size=0.4&bold=true',
  },
  {
    id: 'tm-3',
    name: 'Jean-Baptiste Koné',
    role: 'Directeur Technique',
    bio: 'Spécialiste en sécurité des systèmes d&apos;information',
    photo:
      'https://ui-avatars.com/api/?name=Jean+Kone&size=400&background=10B981&color=fff&font-size=0.4&bold=true',
  },
];

export const COMPANY_VALUES: CompanyValue[] = [
  {
    id: 'val-1',
    title: 'Innovation',
    description:
      'Nous repoussons constamment les limites de la technologie pour offrir des solutions de pointe.',
    icon: '🚀',
  },
  {
    id: 'val-2',
    title: 'Excellence',
    description: 'Nous nous engageons à fournir des produits et services de la plus haute qualité.',
    icon: '⭐',
  },
  {
    id: 'val-3',
    title: 'Intégrité',
    description: 'La transparence et l&apos;honnêteté guident toutes nos actions et décisions.',
    icon: '🤝',
  },
  {
    id: 'val-4',
    title: 'Impact',
    description: 'Nous visons à créer un impact positif durable pour nos clients et la société.',
    icon: '🎯',
  },
];

export const ABOUT_STATS: AboutStat[] = [
  { id: 'stat-1', label: 'Clients Actifs', value: '150+' },
  { id: 'stat-2', label: 'Évaluations Réalisées', value: '5000+' },
  { id: 'stat-3', label: 'Taux de Satisfaction', value: '98%' },
  { id: 'stat-4', label: 'Années d&apos;Expérience', value: '4+' },
];
