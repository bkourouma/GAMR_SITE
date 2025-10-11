import { Testimonial } from '@/types/content';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote:
      "GAMR a réduit notre temps de préparation d'audit de 3 semaines à 3 jours. L'IA identifie les vulnérabilités que nous aurions manquées manuellement.",
    authorName: 'M. Dubois',
    authorRole: 'RSSI',
    authorCompany: 'Industry Extractive',
    rating: 5,
    featured: true,
  },
  {
    id: '2',
    quote:
      'Les recommandations IA de GAMR correspondaient exactement aux conseils de notre consultant externe à 150k€. Nous économisons désormais cette somme chaque année.',
    authorName: 'Kouamé Martine',
    authorRole: 'Directrice Conformité',
    authorCompany: 'Banque Africaine',
    rating: 5,
    featured: true,
  },
  {
    id: '3',
    quote:
      "Notre équipe a adopté GAMR immédiatement. Aucune formation nécessaire, l'interface est intuitive. En 2 semaines, nous avions cartographié tous nos risques.",
    authorName: 'J. Ouattara',
    authorRole: 'Directeur Sécurité',
    authorCompany: 'Centre Hospitalier Universitaire',
    rating: 5,
    featured: true,
  },
];
