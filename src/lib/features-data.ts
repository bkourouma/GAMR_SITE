/**
 * Features Data for GAMR Platform
 * Feature: Page Fonctionnalités
 *
 * Contains 7 main features per FR-004 specification
 */

import type { FeaturesCollection } from '@/types/features';

export const FEATURES_DATA = {
  main: [
    {
      key: 'cartographie-menaces',
      title: 'Cartographie des menaces',
      description: 'Visualisez tous vos risques par processus, projet ou entité organisationnelle.',
      benefitsText:
        "Identifiez en un coup d'œil les zones critiques nécessitant une attention immédiate et priorisez vos ressources efficacement.",
      icon: 'Map',
      order: 1,
      category: 'main' as const,
    },
    {
      key: 'evaluation-automatisee',
      title: 'Évaluation automatisée des risques',
      description:
        'Calculs dynamiques selon critères personnalisables (probabilité, vulnérabilité, impact).',
      benefitsText:
        'Éliminez les biais subjectifs et obtenez des évaluations cohérentes basées sur une méthodologie éprouvée.',
      icon: 'BarChart',
      order: 2,
      category: 'main' as const,
    },
    {
      key: 'priorites-action',
      title: "Priorités d'action & suivi des mesures",
      description:
        "Suivi des plans d'atténuation avec assignations, échéances et notifications automatiques.",
      benefitsText:
        'Ne manquez jamais une tâche critique et maintenez une responsabilité claire sur tous les risques identifiés.',
      icon: 'CheckCircle',
      order: 3,
      category: 'main' as const,
    },
    {
      key: 'indicateurs-performance',
      title: 'Indicateurs de performance',
      description:
        'Tableaux de bord interactifs, heatmaps, scoring global et par domaine sécurité.',
      benefitsText:
        'Visualisez votre posture de sécurité en temps réel et prenez des décisions éclairées basées sur des métriques concrètes.',
      icon: 'TrendingUp',
      order: 4,
      category: 'main' as const,
    },
    {
      key: 'collaboration-validation',
      title: 'Collaboration & validation',
      description:
        'Workflow multi-utilisateurs avec approbations, commentaires et notifications en temps réel.',
      benefitsText:
        'Facilitez la coordination entre équipes et accélérez les processus de validation avec des workflows structurés.',
      icon: 'Users',
      order: 5,
      category: 'main' as const,
    },
    {
      key: 'rapports-audits',
      title: 'Rapports & audits intelligents',
      description:
        'Génération automatique de rapports Word/PDF exportables, prêts pour audits de conformité.',
      benefitsText:
        'Préparez vos audits en quelques clics et démontrez votre conformité avec des rapports professionnels instantanés.',
      icon: 'FileText',
      order: 6,
      category: 'main' as const,
    },
    {
      key: 'securite-tracabilite',
      title: 'Sécurité & traçabilité',
      description: "Gestion des rôles granulaire, journal d'audit complet, conformité ISO/ANSSI.",
      benefitsText:
        'Protégez vos données sensibles et maintenez une traçabilité complète pour répondre aux exigences réglementaires.',
      icon: 'Lock',
      order: 7,
      category: 'main' as const,
    },
  ],
  secondary: [] as const,
} as const satisfies FeaturesCollection;

/**
 * Type-safe access to features
 */
export type Feature = (typeof FEATURES_DATA.main)[number];

/**
 * Export features as JSON (FR-015 requirement)
 */
export function exportFeaturesJSON(pretty: boolean = true): string {
  return JSON.stringify(FEATURES_DATA, null, pretty ? 2 : 0);
}
