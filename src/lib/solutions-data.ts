import { Industry } from '@/types/solutions';

/**
 * Industry sector data for the Solutions page
 * Contains 6 key sectors with their regulatory frameworks and GAMR solutions
 */
export const industries: Industry[] = [
  {
    id: 'industrie-extractive',
    nom: 'Industrie extractive (mines, pétrole, gaz)',
    normes: ['ISO 14001', 'ISO 45001', 'IFC Performance Standards'],
    defis: [
      'Gestion des risques environnementaux',
      'Conformité ESG',
      'Suivi des incidents terrain',
    ],
    solutions: [
      'Cartographie des risques environnementaux et sociaux',
      "Suivi automatique des plans d'action HSE",
      'Reporting ESG consolidé et exportable pour bailleurs et investisseurs',
    ],
    icone: '/images/solutions/extractive.svg',
    order: 1,
  },
  {
    id: 'aeroportuaire',
    nom: 'Aéroportuaire',
    normes: ['OACI (Annexe 19 - SMS)', 'ISO 31000', 'ACI Best Practices'],
    defis: ['Sécurité opérationnelle', 'Gestion des incidents', 'Traçabilité et conformité'],
    solutions: [
      'Registre digital des risques et incidents',
      'Tableau de bord temps réel pour la direction sécurité',
      'Audit automatique et reporting conforme OACI',
    ],
    icone: '/images/solutions/airport.svg',
    order: 2,
  },
  {
    id: 'gouvernement',
    nom: 'Gouvernement & institutions publiques',
    normes: ['ISO 31000', 'COSO ERM', 'ANSSI-CI / RGPD'],
    defis: [
      'Gestion des risques organisationnels',
      'Conformité légale',
      'Traçabilité et transparence',
    ],
    solutions: [
      'Module de gouvernance des risques stratégiques',
      "Suivi des plans d'action ministériels",
      'Rapports consolidés pour le reporting institutionnel',
    ],
    icone: '/images/solutions/government.svg',
    order: 3,
  },
  {
    id: 'secteur-bancaire',
    nom: 'Secteur bancaire et financier',
    normes: ['Bâle III', 'ISO 27001', 'AML/CFT (LBC/FT)'],
    defis: ['Risque opérationnel', 'Fraude', 'Cybersécurité', 'Conformité réglementaire'],
    solutions: [
      'Matrice de risques configurable (opérationnels, IT, conformité)',
      "Analyse d'impact automatisée",
      'Génération de rapports pour les audits internes et BCEAO',
    ],
    icone: '/images/solutions/banking.svg',
    order: 4,
  },
  {
    id: 'sante',
    nom: 'Santé & hôpitaux',
    normes: ['ISO 9001', 'ISO 27001', 'OMS Patient Safety'],
    defis: ['Sécurité des patients', 'Gestion des risques cliniques', 'Conformité qualité'],
    solutions: [
      'Registre des risques médicaux et incidents',
      'Suivi des actions correctives',
      'Tableaux de bord qualité/sécurité, rapports ANS & OMS',
    ],
    icone: '/images/solutions/healthcare.svg',
    order: 5,
  },
  {
    id: 'btp-construction',
    nom: 'BTP et Construction',
    normes: ['ISO 45001', 'ISO 14001', 'NF EN 1090'],
    defis: [
      'Sécurité des chantiers',
      'Gestion des risques environnementaux',
      'Conformité réglementaire',
    ],
    solutions: [
      'Registre digital des risques chantier et incidents',
      "Suivi automatique des plans d'action sécurité",
      'Reporting consolidé pour les audits et autorités',
    ],
    icone: '/images/solutions/construction.svg',
    order: 6,
  },
];

/**
 * Type guard to validate Industry objects
 */
export function isValidIndustry(obj: unknown): obj is Industry {
  if (typeof obj !== 'object' || obj === null) return false;

  const industry = obj as Industry;

  return (
    typeof industry.id === 'string' &&
    typeof industry.nom === 'string' &&
    Array.isArray(industry.normes) &&
    industry.normes.length >= 1 &&
    industry.normes.length <= 3 &&
    Array.isArray(industry.defis) &&
    Array.isArray(industry.solutions) &&
    typeof industry.icone === 'string'
  );
}

/**
 * Extract module names from solution descriptions for table display
 * @param solutions - Array of solution descriptions
 * @returns Array of shortened module names
 */
export function extractModules(solutions: string[]): string[] {
  return solutions.map((solution) => {
    // Take first 4 words and add ellipsis if longer
    const words = solution.split(' ').slice(0, 4);
    return words.join(' ') + (solution.split(' ').length > 4 ? '...' : '');
  });
}
